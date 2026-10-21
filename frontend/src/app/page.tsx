import Link from "next/link";
import SavingsCalculator from "./saving-calculator";
import CurrentYear from "./current-year";
const features = [
  {
    number: "01",
    title: "Set your intention",
    description:
      "Choose a savings goal and a timeline that fits your financial plans.",
    icon: "◎",
  },
  {
    number: "02",
    title: "Build your habit",
    description:
      "Make consistent contributions and follow your progress as you go.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Reach your goals",
    description:
      "Track milestones and understand your savings plan's maturity terms.",
    icon: "✳",
  },
];

const plans = [
  {
    name: "Starter",
    duration: "3 months",
    description: "A simple way to begin building your savings habit.",
    detail: "Short-term goals",
  },
  {
    name: "Growth",
    duration: "6 months",
    description: "Give your financial goals more time and structure.",
    detail: "Medium-term goals",
  },
  {
    name: "Future",
    duration: "12 months",
    description: "Plan ahead for the milestones that matter to you.",
    detail: "Long-term goals",
  },
];

const milestones = [
  { label: "Emergency fund", amount: "KSh 15,000", progress: 68 },
  { label: "New laptop", amount: "KSh 45,000", progress: 42 },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex w-fit items-center gap-3">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${
          light
            ? "bg-white text-[#204a38]"
            : "bg-[#204a38] text-white"
        }`}
      >
        S
      </span>
      <span
        className={`text-xl font-semibold tracking-tight ${
          light ? "text-white" : "text-[#204a38]"
        }`}
      >
        Savora
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f5] text-[#203d30]">
      {/* Navigation */}
      <header className="relative z-10 border-b border-[#e9e9df]">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12"
        >
          <Brand />

          <div className="hidden items-center gap-8 text-sm text-[#637368] md:flex">
            <a href="#how-it-works" className="transition hover:text-[#204a38]">
              How it works
            </a>
            <a href="#plans" className="transition hover:text-[#204a38]">
              Savings plans
            </a>
            <a href="#about" className="transition hover:text-[#204a38]">
              About Savora
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-[#eeefe7] sm:inline-flex"
            >
              Log in
            </a>
            <a
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#204a38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d634b]"
            >
              Get started <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-12 h-[480px] w-[480px] rounded-full bg-[#e6eddf] opacity-70 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-12 lg:py-28">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dce5d8] bg-white/80 px-4 py-2 text-xs font-medium tracking-wide text-[#41674e] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#72a37c]" />
              A more intentional way to save
            </div>

            <h1 className="mt-8 max-w-2xl text-[3.4rem] font-medium leading-[1.04] tracking-[-0.055em] sm:text-7xl lg:text-[5.25rem]">
              Your money.
              <br />
              Your plans.
              <br />
              <span className="font-serif italic text-[#72947a]">
                Your future.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#69776c] sm:text-lg">
              Big goals begin with small steps. Create a savings plan,
              follow your progress, and make room for the future you
              want to build.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="/register"
                className="inline-flex items-center gap-3 rounded-full bg-[#204a38] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#204a38]/10 transition hover:-translate-y-0.5 hover:bg-[#2d634b]"
              >
                Start your journey <span aria-hidden="true">→</span>
              </a>
              <a
                href="#how-it-works"
                className="rounded-full px-5 py-4 text-sm font-semibold text-[#46614f] transition hover:bg-[#edf0e7]"
              >
                Discover how it works
              </a>
            </div>

            <div className="mt-10 flex items-start gap-3 border-t border-[#e3e6dc] pt-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e6eddf] text-[#41674e]">
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-[#304e3c]">
                  Clarity in every step
                </p>
                <p className="mt-1 text-sm leading-6 text-[#798379]">
                  Understand your plan, timeline, and applicable terms.
                </p>
              </div>
            </div>
          </div>

          {/* Illustrative dashboard preview */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rotate-3 rounded-[2rem] bg-[#e9ecdf]"
            />

            <div className="relative rounded-[1.7rem] border border-[#e5e7dd] bg-white p-4 shadow-2xl shadow-[#314b3410] sm:p-6">
              <div className="flex items-center justify-between gap-3 px-1 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8eee3] text-lg text-[#41674e]">
                    ◷
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Your savings</p>
                    <p className="mt-1 text-xs text-[#92998f]">
                      A sample dashboard
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-[#e1e7db] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#66816a]">
                  Preview
                </span>
              </div>

              <div className="rounded-[1.3rem] bg-[#204a38] p-6 text-white sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/70">
                    Illustrative total savings
                  </p>
                  <span className="text-lg text-[#b8d3b6]" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <p className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
                  KSh 30,000
                </p>

                <div className="mt-8 grid grid-cols-2 gap-5 border-t border-white/15 pt-5">
                  <div>
                    <p className="text-xs text-white/60">
                      Example monthly target
                    </p>
                    <p className="mt-2 text-base font-medium">
                      KSh 5,000
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">
                      Example active goals
                    </p>
                    <p className="mt-2 text-base font-medium">02 goals</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-white/[0.08] p-3">
                  <span className="text-xs text-white/75">
                    Illustrative portfolio overview
                  </span>
                  <span className="text-xs text-[#c5dfbd]">
                    Sample data
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Your goals</h2>
                <span className="text-xs text-[#899287]">
                  Example progress
                </span>
              </div>

              <div className="mt-4 space-y-5">
                {milestones.map((milestone) => (
                  <div key={milestone.label}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">
                          {milestone.label}
                        </p>
                        <p className="mt-1 text-xs text-[#899287]">
                          {milestone.amount} · Illustrative target
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#41674e]">
                        {milestone.progress}%
                      </p>
                    </div>
                    <div
                      className="mt-3 h-2 overflow-hidden rounded-full bg-[#edf0e9]"
                      role="progressbar"
                      aria-label={`${milestone.label} illustrative progress`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={milestone.progress}
                    >
                      <div
                        className="h-full rounded-full bg-[#72947a]"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 border-t border-[#eef0e8] pt-4 text-[11px] leading-5 text-[#899287]">
                All balances, targets, and progress percentages shown here
                are illustrative examples, not live account information.
              </p>
            </div>

            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-[#e5e7dd] bg-white px-5 py-4 shadow-lg sm:block">
              <p className="text-xs text-[#899287]">Your next step</p>
              <p className="mt-1 text-sm font-semibold text-[#41674e]">
                Start with a goal ↗
              </p>
            </div>
          </div>
        </div>
      </section>

      <SavingsCalculator />

      {/* Trust strip */}
      <section className="border-y border-[#e6e8de] bg-[#f2f3eb]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-12">
          {[
            ["01", "Goal-oriented", "Plan around what matters to you."],
            ["02", "Transparent", "Understand terms before committing."],
            ["03", "Progress-focused", "See milestones clearly."],
          ].map(([number, title, description]) => (
            <div key={number} className="flex items-start gap-4">
              <span className="pt-0.5 font-serif text-xl italic text-[#72947a]">
                {number}
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-6 text-[#7b857a]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#72947a]">
            A simpler approach
          </p>
          <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Saving that feels
            <br />
            <span className="font-serif italic text-[#72947a]">
              purposeful.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#758075]">
            Build a financial habit around clear goals, practical timelines,
            and a better understanding of your progress.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group rounded-2xl border border-[#e6e8de] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#cbd9c8] hover:shadow-xl hover:shadow-[#304b3410] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf1e7] text-2xl text-[#41674e]">
                  {feature.icon}
                </span>
                <span className="text-sm text-[#a2aa9e]">
                  {feature.number}
                </span>
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-[#758075]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Savings plans */}
      <section
        id="plans"
        className="border-y border-[#e6e8de] bg-[#f2f3eb] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#72947a]">
                Find your timeframe
              </p>
              <h2 className="mt-4 max-w-xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
                A plan for the
                <br />
                <span className="font-serif italic text-[#72947a]">
                  things that matter.
                </span>
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#758075]">
              Explore example savings timeframes. Actual rates, fees,
              eligibility, and withdrawal conditions must be confirmed
              in the published terms of each plan.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => (
              <article
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-7 sm:p-8 ${
                  index === 1
                    ? "border-[#204a38] bg-[#204a38] text-white shadow-xl shadow-[#204a38]/10"
                    : "border-[#e2e5da] bg-white text-[#203d30]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest ${
                      index === 1 ? "text-[#b8d3b6]" : "text-[#72947a]"
                    }`}
                  >
                    {plan.detail}
                  </span>
                  {index === 1 && (
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-medium">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="mt-7 text-3xl font-medium tracking-tight">
                  {plan.name}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    index === 1 ? "text-white/65" : "text-[#899287]"
                  }`}
                >
                  {plan.duration}
                </p>
                <p
                  className={`mt-5 min-h-14 leading-7 ${
                    index === 1 ? "text-white/75" : "text-[#758075]"
                  }`}
                >
                  {plan.description}
                </p>

                <div
                  className={`my-7 border-t ${
                    index === 1 ? "border-white/15" : "border-[#e9ebe3]"
                  }`}
                />

                <p
                  className={`text-xs ${
                    index === 1 ? "text-white/60" : "text-[#899287]"
                  }`}
                >
                  Interest rate
                </p>
                <p className="mt-2 text-lg font-semibold">
                  To be confirmed
                </p>

                <a
                  href="/register"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition ${
                    index === 1
                      ? "bg-white text-[#204a38] hover:bg-[#eaf0e5]"
                      : "border border-[#dfe4d9] hover:bg-[#f2f3eb]"
                  }`}
                >
                  Get started <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs leading-6 text-[#899287]">
            Plan durations are examples for the prototype. No interest rate
            or financial return is promised or implied.
          </p>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#204a38] px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-40 h-96 w-96 rounded-full border border-white/10 sm:h-[32rem] sm:w-[32rem]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-48 right-32 h-80 w-80 rounded-full border border-white/10"
          />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8d3b6]">
              Begin where you are
            </p>
            <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              A little intention
              <br />
              goes a long way.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/70">
              Your next goal doesn&apos;t have to feel far away. Start planning,
              make a commitment to yourself, and take the first step.
            </p>
            <a
              href="/register"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#204a38] transition hover:bg-[#eaf0e5]"
            >
              Create your account <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e6e8de] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <Brand />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#758075]">
            <a href="#how-it-works" className="hover:text-[#204a38]">
              How it works
            </a>
            <a href="#plans" className="hover:text-[#204a38]">
              Savings plans
            </a>
            <a href="/login" className="hover:text-[#204a38]">
              Log in
            </a>
            <a href="/register" className="hover:text-[#204a38]">
              Register
            </a>
          </div>
          <p className="text-xs text-[#899287]">
            © <CurrentYear /> Savora · Prototype
          </p>
        </div>
      </footer>
    </main>
  );
}
