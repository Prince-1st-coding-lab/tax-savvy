import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Freelance Tax Calculator" },
      {
        name: "description",
        content:
          "Why the Freelance Tax Calculator exists, who builds it, and how the self-employment tax estimates are put together.",
      },
      { property: "og:title", content: "About — Freelance Tax Calculator" },
      {
        property: "og:description",
        content: "The story behind a free, no-signup self-employment tax estimator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">About this site</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85">
        <p>
          FreelanceTaxCalculator is a small, free tool made by a freelancer who got a nasty surprise
          in their first April of self-employment. The math wasn't complicated — it was just buried
          in IRS publications and behind the signup forms of tax software that wanted a credit card
          before showing a number.
        </p>
        <p>
          So this site does one thing: you type in what you expect to earn, and it tells you roughly
          what to set aside each quarter. No account, no email capture, no upsell. Your numbers never
          leave your browser — every calculation runs on your own device, and nothing is stored.
        </p>
        <h2 className="pt-2 text-xl font-semibold">How the numbers are produced</h2>
        <p>
          The estimator applies the standard self-employment tax formula (92.35% of net earnings
          taxed at 15.3%, with the Social Security wage base cap applied), deducts half of that tax,
          subtracts the standard deduction for your filing status, and runs the remainder through the
          current federal marginal brackets. The annual total is divided into four equal quarterly
          payments.
        </p>
        <h2 className="pt-2 text-xl font-semibold">What it deliberately doesn't do</h2>
        <p>
          It doesn't handle state or local taxes, itemized deductions, the qualified business income
          deduction, credits, dependents, retirement plan contributions, or multi-income-household
          edge cases. Adding all of that would turn a 30-second answer into a tax return. If your
          situation involves any of those, treat this as a starting point and talk to a CPA or
          enrolled agent.
        </p>
        <h2 className="pt-2 text-xl font-semibold">Not tax advice</h2>
        <p>
          This is an educational estimate, not tax, legal, or financial advice. Rates and thresholds
          change; always confirm current figures on IRS.gov. Full details are in the{" "}
          <Link to="/terms" className="font-medium text-accent underline underline-offset-4">
            Terms of Use
          </Link>
          .
        </p>
        <p>
          Questions, corrections, or a bracket that looks wrong? The{" "}
          <Link to="/contact" className="font-medium text-accent underline underline-offset-4">
            contact page
          </Link>{" "}
          goes straight to a real inbox.
        </p>
      </div>
    </div>
  );
}
