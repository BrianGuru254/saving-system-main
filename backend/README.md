# Savora API

Java 21, Spring Boot 3.5, Maven, Spring Security, PostgreSQL and Flyway.

## Run
1. Start PostgreSQL with `docker compose up -d postgres`.
2. Configure the database environment from `.env.example`.
3. Run `mvn spring-boot:run`; Flyway creates the schema.
4. Set the frontend server variable `BACKEND_API_URL=http://localhost:8080`.

Sessions use HttpOnly SameSite=Lax cookies and BCrypt password hashes. The Origin guard restricts browser mutations to `SAVORA_FRONTEND_ORIGIN`. Set `SAVORA_COOKIE_SECURE=true` behind HTTPS.

## API
- `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`
- `GET /account/me`, `GET /account/summary`, `GET /account/transactions`
- `GET|POST /savings/goals`, `POST /savings/goals/{goalId}/contributions`
- `GET /savings/maturity-schedule`, `GET /products/interest-rate`

Account data is scoped to the authenticated user. Three-month minimum duration is validated server-side. Contributions are recorded as PENDING and do not change balances; provider callback verification and idempotent reconciliation must be implemented before confirming payment. Rates come from the `interest_rates` table and none are seeded or promised; GET returns 503 until operations configures one. Password reset returns 501 until secure token and email delivery support is added. Health check: `/actuator/health`.

Do not commit credentials. Use managed secrets/configuration in production.
## Password recovery
Configure `SPRING_MAIL_HOST`, `SPRING_MAIL_PORT`, `SPRING_MAIL_USERNAME`, `SPRING_MAIL_PASSWORD`, `SAVORA_MAIL_FROM`, and `SAVORA_PASSWORD_RESET_URL`. Reset links expire after 30 minutes, only token hashes are stored, and tokens are single-use. The request endpoint returns a generic success response for unknown email addresses. Requests return 503 while mail is not configured.

## Interest-rate operations
`GET /products/interest-rate` is public and returns the active database rate. Configure `SAVORA_ADMIN_API_KEY` with a long random secret, then create a rate with `POST /admin/interest-rates`, header `X-Savora-Admin-Key`, and JSON such as `{"annualRate":5.5,"effectiveFrom":"2026-10-22","effectiveUntil":null}`. Overlapping effective periods are rejected. Keep the operations key server-side; do not put it in the frontend.

## M-Pesa
Contribution requests remain `PENDING` and are excluded from confirmed balances. They must not be manually marked paid until Daraja STK Push and provider verification are configured. This project does not yet have Safaricom credentials or a public callback URL, so no payment confirmation is enabled.
