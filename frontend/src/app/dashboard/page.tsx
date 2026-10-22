
"use client";

import Link from "next/link";
import { useState } from "react";

const demoAccount = {
  balance: 30000,
  contributions: 27000,
  interest: 3000,
  activeGoals: 3,
};

const savingsGoals = [
  {
    id: 1,
    name: "Emergency fund",
    category: "Financial security",
    saved: 20400,
    target: 30000,
    progress: 68,
    maturity: "21 Nov 2026",
    color: "#719777",
  },
  {
    id: 2,
    name: "New laptop",
    category: "Personal goals",
    saved: 18900,
    target: 45000,
    progress: 42,
    maturity: "21 Jan 2027",
    color: "#C49A61",
  },
  {
    id: 3,
    name: "Education fund",
    category: "Future planning",
    saved: 18000,
    target: 60000,
    progress: 30,
    maturity: "21 Apr 2027",
    color: "#7D91B8",
  },
];

const transactions = [
  {
    id: "TX-DEMO-001",
    title: "Monthly contribution",
    detail: "Emergency fund",
    date: "15 Oct 2026",
    amount: 5000,
    type: "Deposit",
  },
  {
    id: "TX-DEMO-002",
    title: "Monthly contribution",
    detail: "New laptop",
    date: "10 Oct 2026",
    amount: 3000,
    type: "Deposit",
  },
  {
    id: "TX-DEMO-003",
    title: "Monthly contribution",
    detail: "Education fund",
    date: "05 Oct 2026",
    amount: 4000,
    type: "Deposit",
  },
  {
    id: "TX-DEMO-004",
    title: "Illustrative interest",
    detail: "Emergency fund",
    date: "01 Oct 2026",
    amount: 250,
    type: "Interest",
  },
];

const formatKsh = (amount: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
  }).format(amount);

const navigation = [
  { label: "Overview", href: "#overview", icon: "⌂" },
  { label: "My savings goals", href: "#goals", icon: "◎" },
  { label: "Transactions", href: "#transactions", icon: "↕" },
  { label: "Maturity schedule", href: "#maturity", icon: "▦" },
];

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#204a38]">
        S
      </span>
      <span className="text-xl font-semibold tracking-tight text-white">
        Savora
      </span>
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#829080]">
      {children}
    </p>
  );
}

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f7f1] text-[#203d30]">
      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#204a38] px-5 py-4 lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          className="rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white"
        >
          {mobileMenuOpen ? "Close ✕" : "Menu ☰"}
        </button>
      </header>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="sticky top-[73px] z-20 border-b border-[#e3e7dd] bg-white p-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-[#edf1e8]"
              >
                <span className="mr-2 text-[#719777]">{item.icon}</span>
                {item.label}
              </a>
            ))}
            <Link
              href="/"
              className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-[#edf1e8]"
            >
              ← Public website
            </Link>
          </div>
        </nav>
      )}

      <div className="lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden min-h-screen w-[260px] shrink-0 flex-col bg-[#204a38] px-5 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen">
          <Brand />

          <div className="mt-12">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Workspace
            </p>
            <nav className="mt-4 space-y-2">
              {navigation.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition ${
                    index === 0
                      ? "bg-white/12 font-semibold text-white"
                      : "text-white/65 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  <span className="w-5 text-center text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <span className="text-lg text-[#b8d3b6]">✳</span>
              <p className="mt-3 text-sm font-semibold text-white">
                Every step counts.
              </p>
              <p className="mt-2 text-xs leading-5 text-white/55">
                Keep your goals in view and build your saving habit one
                contribution at a time.
              </p>
            </div>

            <Link
              href="/"
              className="mt-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/65 transition hover:bg-white/[0.07] hover:text-white"
            >
              <span aria-hidden="true">↩</span>
              Back to website
            </Link>

            <p className="mt-4 px-4 text-[10px] text-white/35">
              SAVORA · DASHBOARD DEMO
            </p>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            {/* Top bar */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-[#829080]">
                  Wednesday, 21 October 2026
                </p>
                <h1
                  id="overview"
                  className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl"
                >
                  Your savings overview<span className="text-[#719777]">.</span>
                </h1>
                <p className="mt-2 text-sm leading-6 text-[#788478]">
                  A clearer picture of your savings journey.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e0e7d9] bg-white px-3 py-2 text-xs font-semibold text-[#58765b]">
                  <span className="h-2 w-2 rounded-full bg-[#80a984]" />
                  Demo mode
                </span>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#204a38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d634b]"
                >
                  Explore account setup ↗
                </Link>
              </div>
            </div>

            {/* Demo notice */}
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#e5dfc8] bg-[#f8f2df] p-4 sm:items-center">
              <span className="mt-0.5 text-lg text-[#967a3e] sm:mt-0">ⓘ</span>
              <div>
                <p className="text-sm font-semibold text-[#69572f]">
                  Demonstration account — sample data only
                </p>
                <p className="mt-1 text-xs leading-5 text-[#81724c]">
                  These balances, goals, dates, and transactions are fictional
                  examples for interface testing. No real account is connected,
                  and no money has been received or invested.
                </p>
              </div>
            </div>

            {/* Summary cards */}
            <section
              aria-label="Illustrative account summary"
              className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              <article className="rounded-2xl bg-[#204a38] p-6 text-white shadow-lg shadow-[#204a38]/5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white/70">
                    Illustrative savings
                  </p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
                    ◈
                  </span>
                </div>
                <p className="mt-5 break-words text-3xl font-medium tracking-tight">
                  {formatKsh(demoAccount.balance)}
                </p>
                <p className="mt-3 text-xs text-white/55">
                  Sample balance · Not live
                </p>
              </article>

              <article className="rounded-2xl border border-[#e6e8de] bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#788478]">Contributions</p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf0e5] text-lg text-[#527a59]">
                    ↗
                  </span>
                </div>
                <p className="mt-5 break-words text-2xl font-semibold tracking-tight">
                  {formatKsh(demoAccount.contributions)}
                </p>
                <p className="mt-3 text-xs text-[#899287]">
                  Illustrative principal
                </p>
              </article>

              <article className="rounded-2xl border border-[#e6e8de] bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#788478]">Estimated interest</p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6edda] text-lg text-[#a17b3d]">
                    ✳
                  </span>
                </div>
                <p className="mt-5 break-words text-2xl font-semibold tracking-tight">
                  {formatKsh(demoAccount.interest)}
                </p>
                <p className="mt-3 text-xs text-[#899287]">
                  Example figure, not earned interest
                </p>
              </article>

              <article className="rounded-2xl border border-[#e6e8de] bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-[#788478]">Savings goals</p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e9ebf6] text-lg text-[#727eae]">
                    ◎
                  </span>
                </div>
                <p className="mt-5 text-3xl font-semibold tracking-tight">
                  {demoAccount.activeGoals.toString().padStart(2, "0")}
                </p>
                <p className="mt-3 text-xs text-[#899287]">
                  Illustrative goals
                </p>
              </article>
            </section>

            {/* Goals and maturity schedule */}
            <div className="mt-8 grid items-start gap-6 xl:grid-cols-[1.5fr_0.85fr]">
              <section
                id="goals"
                className="min-w-0 rounded-2xl border border-[#e6e8de] bg-white p-5 sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <SectionLabel>Your plans</SectionLabel>
                    <h2 className="mt-2 text-xl font-semibold">
                      Savings goals
                    </h2>
                    <p className="mt-2 text-sm text-[#899287]">
                      Example balances and progress
                    </p>
                  </div>
                  <Link
                    href="/register"
                    className="rounded-full border border-[#dfe4d9] px-4 py-2.5 text-xs font-semibold transition hover:bg-[#f2f3eb]"
                  >
                    Explore plans ↗
                  </Link>
                </div>

                <div className="mt-7 space-y-7">
                  {savingsGoals.map((goal) => (
                    <article key={goal.id}>
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-1 h-10 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: goal.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-semibold">
                                {goal.name}
                              </h3>
                              <p className="mt-1 text-xs text-[#899287]">
                                {goal.category}
                              </p>
                            </div>
                            <p className="text-sm font-semibold">
                              {goal.progress}%
                            </p>
                          </div>

                          <div
                            className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#edf0e9]"
                            role="progressbar"
                            aria-label={`${goal.name} illustrative progress`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={goal.progress}
                          >
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${goal.progress}%`,
                                backgroundColor: goal.color,
                              }}
                            />
                          </div>

                          <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs">
                            <span className="font-medium text-[#526c58]">
                              {formatKsh(goal.saved)} saved
                            </span>
                            <span className="text-[#899287]">
                              Target {formatKsh(goal.target)}
                            </span>
                          </div>

                          <p className="mt-3 text-xs text-[#899287]">
                            Example maturity date: {goal.maturity}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <p className="mt-7 border-t border-[#edf0e8] pt-4 text-xs leading-5 text-[#899287]">
                  Progress percentages are sample interface values. They are
                  not calculated from a live financial account.
                </p>
              </section>

              <section
                id="maturity"
                className="rounded-2xl border border-[#e6e8de] bg-white p-5 sm:p-7"
              >
                <SectionLabel>Plan timeline</SectionLabel>
                <h2 className="mt-2 text-xl font-semibold">
                  Maturity schedule
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#899287]">
                  Example dates for planning purposes.
                </p>

                <div className="mt-7 space-y-5">
                  {savingsGoals.map((goal, index) => (
                    <div key={goal.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold"
                          style={{
                            backgroundColor: `${goal.color}20`,
                            color: goal.color,
                          }}
                        >
                          {index + 1}
                        </span>
                        {index < savingsGoals.length - 1 && (
                          <span className="mt-2 h-7 w-px bg-[#e5e8de]" />
                        )}
                      </div>
                      <div className="min-w-0 pb-2">
                        <p className="text-sm font-semibold">{goal.name}</p>
                        <p className="mt-1 text-xs text-[#899287]">
                          {goal.maturity}
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-[#f1f2eb] px-2.5 py-1 text-[10px] font-medium text-[#69776a]">
                          Illustrative date
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-[#f5f6f0] p-4">
                  <p className="text-xs leading-6 text-[#788478]">
                    Actual maturity dates depend on confirmed plan start
                    dates, contractual terms, and applicable business rules.
                  </p>
                </div>
              </section>
            </div>

            {/* Transactions */}
            <section
              id="transactions"
              className="mt-8 rounded-2xl border border-[#e6e8de] bg-white p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <SectionLabel>Activity</SectionLabel>
                  <h2 className="mt-2 text-xl font-semibold">
                    Recent transactions
                  </h2>
                  <p className="mt-2 text-sm text-[#899287]">
                    Sample records for the dashboard preview
                  </p>
                </div>
                <span className="rounded-full border border-[#e5e8de] px-3 py-2 text-xs text-[#788478]">
                  Demo records only
                </span>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#e9ebe3] text-xs text-[#899287]">
                      <th className="pb-4 pr-4 font-medium">Transaction</th>
                      <th className="pb-4 pr-4 font-medium">Date</th>
                      <th className="pb-4 pr-4 font-medium">Type</th>
                      <th className="pb-4 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-[#f0f1eb] last:border-0"
                      >
                        <td className="py-4 pr-4">
                          <p className="text-sm font-medium">
                            {transaction.title}
                          </p>
                          <p className="mt-1 text-xs text-[#899287]">
                            {transaction.detail} · {transaction.id}
                          </p>
                        </td>
                        <td className="py-4 pr-4 text-sm text-[#788478]">
                          {transaction.date}
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                              transaction.type === "Interest"
                                ? "bg-[#f6edda] text-[#92703a]"
                                : "bg-[#eaf0e5] text-[#527a59]"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-4 text-right text-sm font-semibold">
                          +{formatKsh(transaction.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-5 text-xs leading-5 text-[#899287]">
                Transaction identifiers and amounts above are fictional
                examples. They are not evidence of deposits or interest paid.
              </p>
            </section>

            {/* Footer */}
            <footer className="flex flex-col gap-3 py-8 text-xs text-[#899287] sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Savora · Dashboard prototype</p>
              <div className="flex flex-wrap gap-5">
                <Link href="/" className="hover:text-[#204a38]">
                  Public website
                </Link>
                <Link href="/login" className="hover:text-[#204a38]">
                  Login page
                </Link>
                <Link href="/register" className="hover:text-[#204a38]">
                  Register
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
