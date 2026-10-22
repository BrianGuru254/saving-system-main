package ke.savora.api;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.UUID;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class PasswordResetService {
  private static final SecureRandom RANDOM = new SecureRandom();
  private final JdbcTemplate db;
  private final PasswordEncoder encoder;
  private final ObjectProvider<JavaMailSender> mailSenders;
  private final String resetUrl;
  private final String fromAddress;

  public PasswordResetService(JdbcTemplate db, PasswordEncoder encoder,
      ObjectProvider<JavaMailSender> mailSenders,
      @Value("${savora.password-reset.url}") String resetUrl,
      @Value("${savora.password-reset.from:no-reply@savora.local}") String fromAddress) {
    this.db = db;
    this.encoder = encoder;
    this.mailSenders = mailSenders;
    this.resetUrl = resetUrl;
    this.fromAddress = fromAddress;
  }

  public void request(String rawEmail) {
    JavaMailSender mail = mailSenders.getIfAvailable();
    if (mail == null) {
      throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Password reset email is not configured.");
    }
    String email = rawEmail.trim().toLowerCase(java.util.Locale.ROOT);
    var users = db.query("select id,email from app_users where lower(email)=lower(?)", (rs, n) ->
        new UserAddress(rs.getObject("id", UUID.class), rs.getString("email")), email);
    if (users.isEmpty()) return;

    UserAddress user = users.get(0);
    byte[] random = new byte[32];
    RANDOM.nextBytes(random);
    String token = Base64.getUrlEncoder().withoutPadding().encodeToString(random);
    String tokenHash = sha256(token);
    db.update("delete from password_reset_tokens where user_id=? and used_at is null", user.id());
    db.update("insert into password_reset_tokens(id,user_id,token_hash,expires_at) values(?,?,?,?)",
        UUID.randomUUID(), user.id(), tokenHash, Instant.now().plusSeconds(1800));

    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(fromAddress);
    message.setTo(user.email());
    message.setSubject("Reset your Savora password");
    message.setText("Use this link within 30 minutes to reset your password:\n\n" + resetUrl + token
        + "\n\nIf you did not request this, you can ignore this email.");
    try {
      mail.send(message);
    } catch (RuntimeException error) {
      db.update("delete from password_reset_tokens where token_hash=?", tokenHash);
      throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Password reset email could not be sent.");
    }
  }

  @Transactional
  public void confirm(String token, String newPassword) {
    String hash = sha256(token.trim());
    var users = db.query("select user_id from password_reset_tokens where token_hash=? and used_at is null and expires_at>now() for update",
        (rs, n) -> rs.getObject("user_id", UUID.class), hash);
    if (users.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This password reset link is invalid or expired.");
    UUID userId = users.get(0);
    db.update("update app_users set password_hash=? where id=?", encoder.encode(newPassword), userId);
    db.update("update password_reset_tokens set used_at=now() where token_hash=?", hash);
    db.update("delete from password_reset_tokens where user_id=? and used_at is null", userId);
  }

  private static String sha256(String token) {
    try {
      return java.util.HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8)));
    } catch (java.security.NoSuchAlgorithmException impossible) {
      throw new IllegalStateException(impossible);
    }
  }

  private record UserAddress(UUID id, String email) {}
}
