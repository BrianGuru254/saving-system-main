
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "The login interface works. Secure sign-in will be enabled when we connect the backend."
    );
  }

  return (
    <main className="flex min-h-screen bg-[#faf9f6] text-[#183c30]">
      <section className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20">
        <Link href="/" className="mb-16 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d4939] text-xl text-white">
            S
          </span>
          <span className="text-xl font-bold">Savora</span>
        </Link>

        <div className="mx-auto w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#689b79]">
            Welcome back
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Log in to Savora
          </h1>
          <p className="mt-4 leading-7 text-[#69766e]">
            Continue working towards your savings goals.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-6">
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
                className="w-full rounded-xl border border-[#dce2da] bg-white px-4 py-3.5 outline-none transition focus:border-[#689b79] focus:ring-2 focus:ring-[#689b79]/20"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm font-medium text-[#527b61]"
                >
                  {showPassword ? "Hide password" : "Show password"}
                </button>
              </div>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-[#dce2da] bg-white px-4 py-3.5 outline-none transition focus:border-[#689b79] focus:ring-2 focus:ring-[#689b79]/20"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#69766e]">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 accent-[#1d4939]"
                />
                Remember me
              </label>
              <span className="text-[#858d85]">Forgot password?</span>
            </div>

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
              className="w-full rounded-xl bg-[#1d4939] px-5 py-4 font-semibold text-white transition hover:bg-[#28634b]"
            >
              Log in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#69766e]">
            New to Savora?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#28634b] hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-12 text-center text-xs text-[#858d85]">
            Demo interface only · Authentication is not yet connected.
          </p>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-[#1d4939] p-16 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full border border-white/10" />
        <p className="relative text-sm font-medium tracking-widest text-[#b4d9b8]">
          YOUR SAVINGS JOURNEY
        </p>

        <div className="relative max-w-lg">
          <p className="text-6xl leading-none text-[#b4d9b8]">“</p>
          <h2 className="mt-4 text-5xl font-semibold leading-tight tracking-tight">
            Your goals are worth showing up for.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Return to your plans, review your progress, and keep building
            towards the future you want.
          </p>
        </div>

        <p className="relative text-sm text-white/50">
          Savora · Saving Management System
        </p>
      </aside>
    </main>
  );
}
