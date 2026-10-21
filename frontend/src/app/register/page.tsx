
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");
    const acceptedTerms = form.get("terms") === "on";

    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setMessage("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    setMessage(
      "The registration interface works. Account creation will be enabled when we connect the secure backend."
    );
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen bg-[#faf9f6] text-[#183c30]">
      <section className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20">
        <Link href="/" className="mb-12 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d4939] text-xl text-white">
            S
          </span>
          <span className="text-xl font-bold">Savora</span>
        </Link>

        <div className="mx-auto w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#689b79]">
            Start your journey
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-3 leading-7 text-[#69766e]">
            Set your goals, build good saving habits, and work towards your
            financial future.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                required
                minLength={2}
                className="w-full rounded-xl border border-[#dce2da] bg-white px-4 py-3.5 outline-none transition placeholder:text-[#a0a9a1] focus:border-[#689b79] focus:ring-2 focus:ring-[#689b79]/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-[#dce2da] bg-white px-4 py-3.5 outline-none transition placeholder:text-[#a0a9a1] focus:border-[#689b79] focus:ring-2 focus:ring-[#689b79]/20"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+254 7XX XXX XXX"
                required
                className="w-full rounded-xl border border-[#dce2da] bg-white px-4 py-3.5 outline-none transition placeholder:text-[#a0a9a1] focus:border-[#689b79] focus:ring-2 focus:ring-[#689b79]/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-[#dce2da] bg-white px-4 py-3.5 pr-20 outline-none transition placeholder:text-[#a0a9a1] focus:border-[#689b79] focus:ring-2 focus:ring-[#689b79]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#527b61]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password again"
                required
                minLength={8}
                className="w-full rounded-xl border border-[#dce2da] bg-white px-4 py-3.5 outline-none transition placeholder:text-[#a0a9a1] focus:border-[#689b79] focus:ring-2 focus:ring-[#689b79]/20"
              />
            </div>

            <label className="flex items-start gap-3 text-sm leading-6 text-[#69766e]">
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-1 h-4 w-4 accent-[#1d4939]"
              />
              <span>
                I agree to the terms of service and privacy policy.
                These documents will be provided before production launch.
              </span>
            </label>

            {message && (
              <p
                role="status"
                className="rounded-xl border border-[#dce8dc] bg-[#edf5eb] p-4 text-sm leading-6 text-[#28573c]"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1d4939] px-5 py-4 font-semibold text-white transition hover:bg-[#28634b] disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#69766e]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#28634b] hover:underline"
            >
              Log in
            </Link>
          </p>

          <p className="mt-10 text-center text-xs text-[#858d85]">
            Demo interface only · No account or financial transaction is created.
          </p>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-[#1d4939] p-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-16">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -left-20 h-[30rem] w-[30rem] rounded-full border border-white/10" />

        <p className="relative text-sm font-medium tracking-widest text-[#b4d9b8]">
          YOUR FUTURE, YOUR WAY
        </p>

        <div className="relative max-w-lg">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
            ↗
          </div>
          <h2 className="text-5xl font-semibold leading-tight tracking-tight">
            Every goal begins with a first step.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Create a plan that fits your goals. Track your progress.
            Keep moving forward, one contribution at a time.
          </p>

          <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-6">
            <p className="text-sm text-white/65">A simple principle</p>
            <p className="mt-2 text-xl font-medium">
              Save consistently. Plan intentionally.
            </p>
          </div>
        </div>

        <p className="relative text-sm text-white/50">
          Savora · Saving Management System
        </p>
      </aside>
    </main>
  );
}
