
"use client";

import { useMemo, useState } from "react";

const formatKsh = (amount: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(2000);
  const [duration, setDuration] = useState(12);
  const [annualRate, setAnnualRate] = useState(8);

  const result = useMemo(() => {
    const months = duration;
    const monthlyRate = annualRate / 100 / 12;

    const contributions = initialDeposit + monthlyContribution * months;

    const projectedBalance =
      monthlyRate === 0
        ? contributions
        : initialDeposit * Math.pow(1 + monthlyRate, months) +
          monthlyContribution *
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    return {
      contributions,
      projectedBalance,
      estimatedInterest: projectedBalance - contributions,
    };
  }, [initialDeposit, monthlyContribution, duration, annualRate]);

  const fields = [
    {
      label: "Starting deposit",
      value: initialDeposit,
      min: 0,
      max: 100000000,
      step: 1000,
      update: setInitialDeposit,
      description: "Your initial savings amount",
    },
    {
      label: "Monthly contribution",
      value: monthlyContribution,
      min: 0,
      max: 10000000,
      step: 500,
      update: setMonthlyContribution,
      description: "What you plan to add each month",
    },
  ];

  return (
    <section
      id="calculator"
      className="border-y border-[#e6e8de] bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#72947a]">
            Plan with confidence
          </p>

          <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            See what your
            <br />
            savings could
            <br />
            <span className="font-serif italic text-[#72947a]">
              grow into.
            </span>
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-[#758075]">
            Adjust your starting amount, monthly contributions, and timeline
            to explore an illustrative savings projection before choosing a
            plan.
          </p>

          <div className="mt-8 rounded-2xl border border-[#e5e8dd] bg-[#f5f6f0] p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e4ecdf] text-[#41674e]">
                i
              </span>
              <div>
                <p className="text-sm font-semibold">An estimate, not a promise</p>
                <p className="mt-2 text-sm leading-6 text-[#758075]">
                  The rate is an example you can change. Actual rates, fees,
                  taxes, compounding rules, and product terms may differ.
                  This calculator does not connect to a bank or create an
                  account.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#e5e8dd] bg-[#faf9f5] p-5 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">Savings calculator</h3>
            <span className="rounded-full bg-[#e5ecdf] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#41674e]">
              Interactive
            </span>
          </div>

          <div className="mt-8 space-y-7">
            {fields.map((field, index) => (
              <div key={field.label}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor={`savings-field-${index}`}
                    className="text-sm font-medium"
                  >
                    {field.label}
                  </label>
                  <span className="text-sm font-semibold text-[#41674e]">
                    {formatKsh(field.value)}
                  </span>
                </div>

                <input
                  id={`savings-field-${index}`}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={field.value}
                  onChange={(event) => {
                    const parsed = Number(event.target.value);
                    if (Number.isFinite(parsed)) {
                      field.update(
                        Math.min(field.max, Math.max(field.min, parsed))
                      );
                    }
                  }}
                  className="mt-3 w-full rounded-xl border border-[#dfe4d9] bg-white px-4 py-3 text-base outline-none focus:border-[#72947a] focus:ring-2 focus:ring-[#72947a]/20"
                />

                <p className="mt-2 text-xs text-[#899287]">
                  {field.description}
                </p>
              </div>
            ))}

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="savings-duration" className="text-sm font-medium">
                  Savings duration
                </label>
                <span className="text-sm font-semibold text-[#41674e]">
                  {duration} {duration === 1 ? "month" : "months"}
                </span>
              </div>

              <input
                id="savings-duration"
                type="range"
                min={3}
                max={60}
                step={1}
                value={duration}
                onChange={(event) => setDuration(Number(event.target.value))}
                className="mt-4 w-full cursor-pointer accent-[#41674e]"
              />

              <div className="mt-1 flex justify-between text-xs text-[#899287]">
                <span>3 months</span>
                <span>60 months</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="savings-rate" className="text-sm font-medium">
                  Illustrative annual rate
                </label>
                <span className="text-sm font-semibold text-[#41674e]">
                  {annualRate.toFixed(1)}%
                </span>
              </div>

              <input
                id="savings-rate"
                type="range"
                min={0}
                max={20}
                step={0.5}
                value={annualRate}
                onChange={(event) => setAnnualRate(Number(event.target.value))}
                className="mt-4 w-full cursor-pointer accent-[#41674e]"
              />

              <div className="mt-1 flex justify-between text-xs text-[#899287]">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>
          </div>

          <div className="mt-9 rounded-2xl bg-[#204a38] p-6 text-white sm:p-7">
            <p className="text-sm text-white/70">
              Illustrative projected balance
            </p>

            <p className="mt-3 break-words text-3xl font-medium tracking-tight sm:text-4xl">
              {formatKsh(result.projectedBalance)}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
              <div>
                <p className="text-xs text-white/60">
                  Total contributions
                </p>
                <p className="mt-2 break-words text-sm font-semibold sm:text-base">
                  {formatKsh(result.contributions)}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60">
                  Estimated interest
                </p>
                <p className="mt-2 break-words text-sm font-semibold text-[#c5dfbd] sm:text-base">
                  {formatKsh(result.estimatedInterest)}
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-white/60">
              Assumes monthly contributions are made at the end of each
              month and interest compounds monthly. No fees or taxes are
              included. Figures are estimates, not guaranteed returns.
            </p>
          </div>

          <a
            href="/register"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-[#dfe4d9] bg-white px-5 py-4 text-sm font-semibold transition hover:bg-[#edf0e7]"
          >
            Start planning your savings <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
