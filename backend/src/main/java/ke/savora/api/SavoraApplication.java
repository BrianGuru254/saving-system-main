package ke.savora.api;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.context.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

@SpringBootApplication
@RestController
public class SavoraApplication {
  private final JdbcTemplate db;
  private final PasswordEncoder encoder;
  private final AuthenticationManager auth;
  private final SecurityContextRepository contexts;
  private final PasswordResetService passwordResets;
  private final String adminApiKey;
  public SavoraApplication(JdbcTemplate db,PasswordEncoder encoder,AuthenticationManager auth,SecurityContextRepository contexts,PasswordResetService passwordResets,@Value("${savora.admin-api-key:}") String adminApiKey){this.db=db;this.encoder=encoder;this.auth=auth;this.contexts=contexts;this.passwordResets=passwordResets;this.adminApiKey=adminApiKey;}
  public static void main(String[] args){SpringApplication.run(SavoraApplication.class,args);}

  public record Register(@NotBlank @Size(max=120) String fullName,@NotBlank @Email @Size(max=254) String email,@NotBlank @Size(max=32) String phone,@NotBlank @Size(min=8,max=72) String password){}
  public record Login(@NotBlank @Email String email,@NotBlank String password){}
  public record GoalRequest(@NotBlank @Size(max=80) String name,@NotNull @DecimalMin("1.00") @Digits(integer=17,fraction=2) BigDecimal targetAmount,@NotNull @DecimalMin("1.00") @Digits(integer=17,fraction=2) BigDecimal monthlyContribution,@Min(3) @Max(120) int durationMonths){}
  public record ContributionRequest(@NotNull @DecimalMin("1.00") @Digits(integer=17,fraction=2) BigDecimal amount,@NotBlank String paymentMethod){}
  public record UserView(UUID id,String fullName,String email,String phone){}
  public record GoalView(UUID id,String name,BigDecimal targetAmount,BigDecimal savedAmount,BigDecimal monthlyContribution,LocalDate startDate,LocalDate maturityDate,String status){}
  public record ContributionView(UUID id,UUID goalId,BigDecimal amount,String status,Instant createdAt,String type){}
  public record Summary(BigDecimal availableBalance,BigDecimal totalContributions,BigDecimal confirmedInterest,String currency){}
  public record Maturity(UUID goalId,String goalName,LocalDate maturityDate,BigDecimal amountAtMaturity){}
  public record Rate(BigDecimal annualRate,LocalDate effectiveFrom,LocalDate effectiveUntil){}
  public record RateRequest(@NotNull @DecimalMin("0.0") @DecimalMax("100.0") BigDecimal annualRate,@NotNull LocalDate effectiveFrom,LocalDate effectiveUntil){}
  public record ResetRequest(@NotBlank @Email @Size(max=254) String email){}
  public record ResetConfirmation(@NotBlank String token,@NotBlank @Size(min=8,max=72) String password){}
  public record ApiError(String message){}

  public record Customer(UUID id,String fullName,String email,String phone,String passwordHash,boolean enabled) implements UserDetails {
    @Override public boolean isEnabled(){return enabled;} @Override public String getUsername(){return email;} @Override public String getPassword(){return passwordHash;}
    @Override public Collection<? extends GrantedAuthority> getAuthorities(){return List.of(new SimpleGrantedAuthority("ROLE_CUSTOMER"));}
    @Override public boolean isAccountNonExpired(){return true;} @Override public boolean isAccountNonLocked(){return true;}
    @Override public boolean isCredentialsNonExpired(){return true;}
  }
  @Bean static PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder(12);}
  @Bean static UserDetailsService userDetailsService(JdbcTemplate jdbc){return email->jdbc.query("select id,full_name,email,phone,password_hash,enabled from app_users where lower(email)=lower(?)",(rs,n)->new Customer(rs.getObject("id",UUID.class),rs.getString("full_name"),rs.getString("email"),rs.getString("phone"),rs.getString("password_hash"),rs.getBoolean("enabled")),email).stream().findFirst().orElseThrow(()->new UsernameNotFoundException("Account not found"));}
  @Bean static AuthenticationManager authenticationManager(UserDetailsService users,PasswordEncoder encoder){var provider=new DaoAuthenticationProvider(users);provider.setPasswordEncoder(encoder);return new ProviderManager(provider);}
  @Bean static SecurityContextRepository securityContextRepository(){return new HttpSessionSecurityContextRepository();}
  @Bean static SecurityFilterChain security(HttpSecurity http,SecurityContextRepository contexts,@Value("${savora.frontend-origin}") String allowedOrigin)throws Exception{
    OncePerRequestFilter originGuard=new OncePerRequestFilter(){@Override protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)throws ServletException,IOException{
      String m=req.getMethod(),origin=req.getHeader("Origin");boolean write=Set.of("POST","PUT","PATCH","DELETE").contains(m);
      if(write&&origin!=null&&!allowedOrigin.equals(origin)){res.setStatus(403);res.setContentType("application/json");res.getWriter().write("{\"message\":\"Request origin is not allowed.\"}");return;}chain.doFilter(req,res);
    }};
    http.csrf(c->c.disable()).securityContext(c->c.securityContextRepository(contexts)).sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
      .authorizeHttpRequests(a->a.requestMatchers("/auth/register","/auth/login","/auth/logout","/auth/password-reset/**","/actuator/health","/products/interest-rate","/admin/interest-rates").permitAll().anyRequest().authenticated())
      .exceptionHandling(e->e.authenticationEntryPoint((q,r,x)->{r.setStatus(401);r.setContentType("application/json");r.getWriter().write("{\"message\":\"Authentication is required.\"}");}))
      .logout(l->l.logoutUrl("/auth/logout").deleteCookies("JSESSIONID").invalidateHttpSession(true)).httpBasic(b->b.disable()).formLogin(f->f.disable())
      .addFilterBefore(originGuard,UsernamePasswordAuthenticationFilter.class);return http.build();
  }

  @PostMapping("/auth/register") public ResponseEntity<UserView> register(@Valid @RequestBody Register b){
    UUID id=UUID.randomUUID();try{db.update("insert into app_users(id,full_name,email,phone,password_hash) values(?,?,?,?,?)",id,b.fullName().trim(),b.email().trim().toLowerCase(Locale.ROOT),b.phone().trim(),encoder.encode(b.password()));}
    catch(DataIntegrityViolationException e){throw new ResponseStatusException(HttpStatus.CONFLICT,"Email or phone is already registered.");}
    return ResponseEntity.status(201).body(new UserView(id,b.fullName().trim(),b.email().trim().toLowerCase(Locale.ROOT),b.phone().trim()));
  }
  @PostMapping("/auth/login") public UserView login(@Valid @RequestBody Login b,HttpServletRequest req,HttpServletResponse res){
    Authentication a=auth.authenticate(new UsernamePasswordAuthenticationToken(b.email(),b.password()));req.getSession(true);req.changeSessionId();SecurityContext c=SecurityContextHolder.createEmptyContext();c.setAuthentication(a);SecurityContextHolder.setContext(c);contexts.saveContext(c,req,res);Customer u=(Customer)a.getPrincipal();return view(u);
  }
  @PostMapping("/auth/password-reset/request") public ResponseEntity<ApiError> resetRequest(@Valid @RequestBody ResetRequest request){passwordResets.request(request.email());return ResponseEntity.accepted().body(new ApiError("If an account exists for that email, a password reset link will be sent."));}
  @PostMapping("/auth/password-reset/confirm") public ResponseEntity<ApiError> resetConfirm(@Valid @RequestBody ResetConfirmation request){passwordResets.confirm(request.token(),request.password());return ResponseEntity.ok(new ApiError("Your password has been reset. You can now sign in."));}
  @GetMapping("/account/me") public UserView me(@AuthenticationPrincipal Customer u){return view(u);}
  @GetMapping("/account/summary") public Summary summary(@AuthenticationPrincipal Customer u){BigDecimal principal=db.queryForObject("select coalesce(sum(amount),0) from contributions where user_id=? and status='CONFIRMED'",BigDecimal.class,u.id());return new Summary(principal,principal,BigDecimal.ZERO,"KES");}
  @GetMapping("/savings/goals") public List<GoalView> goals(@AuthenticationPrincipal Customer u){return db.query("select * from savings_goals where user_id=? order by created_at desc",(r,n)->goal(r),u.id());}
  @PostMapping("/savings/goals") public ResponseEntity<GoalView> createGoal(@AuthenticationPrincipal Customer u,@Valid @RequestBody GoalRequest b){
    if(b.durationMonths()<3)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Savings goals must be at least three months.");UUID id=UUID.randomUUID();LocalDate start=LocalDate.now(),maturity=start.plusMonths(b.durationMonths());
    db.update("insert into savings_goals(id,user_id,name,target_amount,monthly_contribution,duration_months,start_date,maturity_date) values(?,?,?,?,?,?,?,?)",id,u.id(),b.name().trim(),b.targetAmount(),b.monthlyContribution(),b.durationMonths(),start,maturity);
    return ResponseEntity.status(201).body(new GoalView(id,b.name().trim(),b.targetAmount(),BigDecimal.ZERO,b.monthlyContribution(),start,maturity,"ACTIVE"));
  }
  @PostMapping("/savings/goals/{goalId}/contributions") public ResponseEntity<ContributionView> contribute(@AuthenticationPrincipal Customer u,@PathVariable UUID goalId,@Valid @RequestBody ContributionRequest b){
    var owned=db.query("select status,maturity_date from savings_goals where id=? and user_id=?",(r,n)->Map.of("status",r.getString("status"),"maturity",r.getDate("maturity_date").toLocalDate()),goalId,u.id()).stream().findFirst().orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Savings goal not found."));
    if(!"ACTIVE".equals(owned.get("status"))||LocalDate.now().isAfter((LocalDate)owned.get("maturity")))throw new ResponseStatusException(HttpStatus.CONFLICT,"This goal is not accepting contributions.");
    if(!"MPESA".equalsIgnoreCase(b.paymentMethod()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Only M-Pesa contribution requests are supported.");
    UUID id=UUID.randomUUID();Instant now=Instant.now();db.update("insert into contributions(id,user_id,goal_id,amount,payment_method,status) values(?,?,?,?,?,'PENDING')",id,u.id(),goalId,b.amount(),"MPESA");
    return ResponseEntity.accepted().body(new ContributionView(id,goalId,b.amount(),"PENDING",now,"CONTRIBUTION"));
  }
  @GetMapping("/account/transactions") public List<ContributionView> transactions(@AuthenticationPrincipal Customer u){return db.query("select id,goal_id,amount,status,created_at from contributions where user_id=? order by created_at desc",(r,n)->new ContributionView(r.getObject("id",UUID.class),r.getObject("goal_id",UUID.class),r.getBigDecimal("amount"),r.getString("status"),r.getTimestamp("created_at").toInstant(),"CONTRIBUTION"),u.id());}
  @GetMapping("/savings/maturity-schedule") public List<Maturity> maturities(@AuthenticationPrincipal Customer u){return db.query("select id,name,maturity_date from savings_goals where user_id=? order by maturity_date",(r,n)->new Maturity(r.getObject("id",UUID.class),r.getString("name"),r.getDate("maturity_date").toLocalDate(),null),u.id());}
  @GetMapping("/products/interest-rate") public Rate rate(){return db.query("select annual_rate,effective_from,effective_until from interest_rates where effective_from<=current_date and (effective_until is null or effective_until>=current_date) order by effective_from desc limit 1",(r,n)->new Rate(r.getBigDecimal("annual_rate"),r.getDate("effective_from").toLocalDate(),r.getDate("effective_until")==null?null:r.getDate("effective_until").toLocalDate())).stream().findFirst().orElseThrow(()->new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,"No active savings rate has been configured."));}
  @PostMapping("/admin/interest-rates") public ResponseEntity<Rate> createRate(@RequestHeader(value="X-Savora-Admin-Key",required=false) String suppliedKey,@Valid @RequestBody RateRequest request){
    if(adminApiKey.isBlank())throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,"Rate administration is not configured.");
    if(suppliedKey==null||!java.security.MessageDigest.isEqual(adminApiKey.getBytes(java.nio.charset.StandardCharsets.UTF_8),suppliedKey.getBytes(java.nio.charset.StandardCharsets.UTF_8)))throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"A valid operations key is required.");
    if(request.effectiveUntil()!=null&&request.effectiveUntil().isBefore(request.effectiveFrom()))throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"The end date must be on or after the start date.");
    Integer overlaps=db.queryForObject("select count(*) from interest_rates where effective_from<=coalesce(cast(? as date),date '9999-12-31') and coalesce(effective_until,date '9999-12-31')>=?",Integer.class,request.effectiveUntil(),request.effectiveFrom());
    if(overlaps!=null&&overlaps>0)throw new ResponseStatusException(HttpStatus.CONFLICT,"This rate period overlaps an existing rate.");
    db.update("insert into interest_rates(id,annual_rate,effective_from,effective_until) values(?,?,?,?)",UUID.randomUUID(),request.annualRate(),request.effectiveFrom(),request.effectiveUntil());
    return ResponseEntity.status(HttpStatus.CREATED).body(new Rate(request.annualRate(),request.effectiveFrom(),request.effectiveUntil()));
  }
  private static GoalView goal(java.sql.ResultSet r)throws java.sql.SQLException{return new GoalView(r.getObject("id",UUID.class),r.getString("name"),r.getBigDecimal("target_amount"),r.getBigDecimal("saved_amount"),r.getBigDecimal("monthly_contribution"),r.getDate("start_date").toLocalDate(),r.getDate("maturity_date").toLocalDate(),r.getString("status"));}
  private static UserView view(Customer u){return new UserView(u.id(),u.fullName(),u.email(),u.phone());}

  @RestControllerAdvice public static class Errors {
    @ExceptionHandler(ResponseStatusException.class) ResponseEntity<ApiError> status(ResponseStatusException e){return ResponseEntity.status(e.getStatusCode()).body(new ApiError(e.getReason()==null?"Request failed.":e.getReason()));}
    @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<ApiError> validation(MethodArgumentNotValidException e){String m=e.getBindingResult().getFieldErrors().stream().findFirst().map(x->x.getField()+" "+x.getDefaultMessage()).orElse("Request validation failed.");return ResponseEntity.badRequest().body(new ApiError(m));}
    @ExceptionHandler(BadCredentialsException.class) ResponseEntity<ApiError> credentials(){return ResponseEntity.status(401).body(new ApiError("Email or password is incorrect."));}
    @ExceptionHandler(DataIntegrityViolationException.class) ResponseEntity<ApiError> conflict(){return ResponseEntity.status(409).body(new ApiError("This information is already in use."));}
  }
}