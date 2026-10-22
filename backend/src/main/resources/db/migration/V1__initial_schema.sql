CREATE TABLE app_users (
 id UUID PRIMARY KEY, full_name VARCHAR(120) NOT NULL, email VARCHAR(254) NOT NULL UNIQUE,
 phone VARCHAR(32) NOT NULL UNIQUE, password_hash VARCHAR(100) NOT NULL,
 enabled BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE savings_goals (
 id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES app_users(id), name VARCHAR(80) NOT NULL,
 target_amount NUMERIC(19,2) NOT NULL CHECK(target_amount>0), monthly_contribution NUMERIC(19,2) NOT NULL CHECK(monthly_contribution>0),
 saved_amount NUMERIC(19,2) NOT NULL DEFAULT 0 CHECK(saved_amount>=0), duration_months INTEGER NOT NULL CHECK(duration_months>=3),
 start_date DATE NOT NULL, maturity_date DATE NOT NULL, status VARCHAR(16) NOT NULL DEFAULT 'ACTIVE', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_goals_owner ON savings_goals(user_id,created_at DESC);
CREATE TABLE contributions (
 id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES app_users(id), goal_id UUID NOT NULL REFERENCES savings_goals(id),
 amount NUMERIC(19,2) NOT NULL CHECK(amount>0), payment_method VARCHAR(16) NOT NULL,
 status VARCHAR(16) NOT NULL DEFAULT 'PENDING', provider_reference VARCHAR(120), created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_contributions_owner ON contributions(user_id,created_at DESC);
CREATE TABLE interest_rates (
 id UUID PRIMARY KEY, annual_rate NUMERIC(8,5) NOT NULL CHECK(annual_rate>=0 AND annual_rate<=100),
 effective_from DATE NOT NULL, effective_until DATE, created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 CHECK(effective_until IS NULL OR effective_until>=effective_from)
);
CREATE INDEX idx_rates_effective ON interest_rates(effective_from,effective_until);