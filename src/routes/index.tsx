import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "../components/Calculator";
import { AdSlot } from "../components/AdSlot";
import { TAX_YEAR } from "../lib/tax";

const FAQS = [
  {
    q: "How much should I set aside for freelance taxes?",
    a: "A common rule of thumb is 25–30% of your net freelance profit, which usually covers the 15.3% self-employment tax plus a 10–22% federal income tax bracket. If you're in a higher bracket or a high-tax state, 35% is safer. Use the calculator above for a number based on your actual income instead of a rule of thumb.",
  },
  {
    q: "Do I have to pay quarterly estimated taxes?",
    a: "Generally yes, if you expect to owe $1,000 or more in tax for the year after withholding. Skipping payments can trigger an underpayment penalty even if you pay in full by April.",
  },
  {
    q: "What is self-employment tax?",
    a: "It's the Social Security and Medicare tax that employees split with an employer. Because you're both, you pay the full 15.3% on 92.35% of your net earnings. Half of it is deductible against your income tax.",
  },
  {
    q: "Does this calculator include state taxes?",
    a: "No. It estimates federal self-employment tax and federal income tax only. Your state may require separate estimated payments, so budget for those on top of these numbers.",
  },
  {
    q: "Which tax year should I choose?",
    a: "Pick the year the income is earned in, not the year you file. The selector switches the standard deduction, tax brackets, Social Security wage base, and the approximate quarterly due dates. Years marked \u201cprojected\u201d use inflation-adjusted estimates because the IRS has not published official figures for them yet.",
  },
  {
    q: "What happens when my income passes the Social Security wage base?",
    a: "The 12.4% Social Security portion of self-employment tax stops once your combined W-2 wages and self-employment earnings reach the annual wage base cap. Above that only the 2.9% Medicare portion continues, with no ceiling. If you enter W-2 wages, the calculator applies them against the cap first and warns you when you cross it.",
  },
  {
    q: "What is the Additional Medicare Tax?",
    a: "An extra 0.9% Medicare tax applies to combined wages and self-employment earnings above $200,000 for single and head-of-household filers, $250,000 for married filing jointly, and $125,000 for married filing separately. Unlike regular SE tax, this portion is not half-deductible. The calculator adds it automatically when you cross the threshold.",
  },
  {
    q: "What if my business expenses are higher than my income?",
    a: "You have a net loss. There is no self-employment tax to pay because net earnings are treated as $0, and the loss generally offsets your other income for income-tax purposes. The calculator flags this so you can double-check your numbers, since a paper loss year is unusual and draws more IRS attention.",
  },
  {
    q: "Can I lower my quarterly payments?",
    a: "Yes — track every legitimate business expense, contribute to a SEP-IRA or solo 401(k), and deduct self-employed health insurance premiums where eligible. Each deductible dollar reduces taxable income, and business expenses reduce self-employment tax too, often saving 30 cents or more per dollar.",
  },
  {
    q: "What is the safe harbor rule?",
    a: "If you pay at least 100% of last year's total tax through withholding and estimated payments (110% if your prior-year adjusted gross income was over $150,000), you generally avoid an underpayment penalty even if this year turns out far bigger than expected.",
  },
  {
    q: "How do I actually pay the IRS?",
    a: "Pay online through IRS Direct Pay from a bank account or EFTPS, or by card for a fee. Both take a couple of minutes. Select \u201cestimated tax\u201d and the correct tax year so the payment is credited properly.",
  },
  {
    q: "Can I save or print my estimate?",
    a: "Yes. Use the Download / print estimate button under the results to generate a clean one-page summary of your inputs, quarterly amounts, due dates, and the full calculation breakdown. Choose \u201cSave as PDF\u201d in the print dialog to keep a copy. Nothing is uploaded — the whole calculation runs in your browser.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Freelance Tax Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      description:
        "Free calculator that estimates US federal self-employment tax, federal income tax, and quarterly estimated tax payments for freelancers.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Freelance Tax Calculator — Estimate Your Quarterly Self-Employment Taxes" },
      {
        name: "description",
        content:
          "Free freelance tax calculator: estimate your federal self-employment tax, income tax, and quarterly estimated payments in seconds. No signup.",
      },
      {
        property: "og:title",
        content: "Freelance Tax Calculator — Estimate Your Quarterly Self-Employment Taxes",
      },
      {
        property: "og:description",
        content:
          "Estimate US self-employment tax and quarterly estimated payments instantly. Free, private, no signup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(structuredData) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <AdSlot id="top" height={90} />

      <header className="mt-8 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Free · No signup · {TAX_YEAR} rates
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
          Freelance Tax Calculator
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Estimate your federal self-employment tax, federal income tax, and what to send the IRS
          each quarter. Built for freelancers, contractors, gig workers, and anyone with 1099
          income who wants a straight answer to "how much should I set aside?"
        </p>
      </header>

      <div className="mt-8">
        <Calculator />
      </div>

      <div className="mt-12">
        <AdSlot id="mid-content" height={250} />
      </div>

      <article className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          How self-employment tax and quarterly payments actually work
        </h2>

        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-foreground/85">
          <p>
            When you work for an employer, taxes leave your paycheck before you ever see the money.
            Your employer withholds federal income tax and pays half of your Social Security and
            Medicare tax for you. When you go freelance, both of those jobs become yours. Nothing is
            withheld, and the IRS expects payment throughout the year rather than in one lump sum
            each April. That's the whole reason quarterly estimated payments exist.
          </p>

          <h3 className="pt-2 text-xl font-semibold">Self-employment tax: the 15.3% surprise</h3>
          <p>
            Self-employment tax is Social Security and Medicare tax for people who work for
            themselves. Employees pay 7.65% and their employer pays a matching 7.65%. As a
            freelancer you pay both halves: 12.4% for Social Security and 2.9% for Medicare, a total
            of 15.3%. This is separate from — and on top of — income tax, which is why so many first
            year freelancers get blindsided in April.
          </p>
          <p>
            Two rules soften it. First, you only pay the tax on 92.35% of your net earnings, a
            built-in adjustment that mimics the employer-side deduction employees get. Second, the
            Social Security portion stops once your combined wages and self-employment earnings pass
            the annual wage base cap; above that only the 2.9% Medicare piece continues, with no
            ceiling. You also deduct half of your self-employment tax when calculating your income
            tax, which lowers the second bill.
          </p>

          <h3 className="pt-2 text-xl font-semibold">Federal income tax on freelance profit</h3>
          <p>
            Income tax is calculated on your profit, not your revenue. Start with everything clients
            paid you, subtract legitimate business expenses — software, equipment, mileage, home
            office, professional fees, health insurance premiums in many cases — then subtract your
            standard deduction and the half-of-SE-tax deduction. Whatever is left runs through the
            progressive federal brackets. Progressive means only the dollars inside each bracket are
            taxed at that bracket's rate, so landing in the 22% bracket does not mean 22% of
            everything you earned.
          </p>
          <p>
            This is why tracking expenses is the highest-return hour of admin work a freelancer can
            do. Every legitimate deductible dollar reduces both your income tax and your
            self-employment tax, often saving 30 cents or more per dollar deducted.
          </p>

          <h3 className="pt-2 text-xl font-semibold">Paying quarterly without the stress</h3>
          <p>
            The IRS generally expects estimated payments if you'll owe $1,000 or more for the year.
            Payments are due roughly in mid-April, mid-June, mid-September, and mid-January of the
            following year — note the periods are uneven, so the "quarters" are not three months
            each. You can pay online through IRS Direct Pay or EFTPS in a couple of minutes.
          </p>
          <p>
            The simplest system that works: open a separate savings account, move a fixed percentage
            of every client payment into it the day it lands, and pay the IRS from that account four
            times a year. Using the estimate above as your percentage keeps the money out of your
            spending balance and turns tax deadlines into a transfer rather than a scramble. If your
            income swings a lot, recalculate mid-year and adjust the remaining payments up or down.
          </p>
          <p>
            One more safety net worth knowing: the safe harbor rule. If you pay at least 100% of last
            year's total tax (110% if your income was high), you generally avoid underpayment
            penalties even if this year turns out much bigger than expected.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-5 space-y-4">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-surface p-5 shadow-card">
              <h3 className="text-base font-semibold">{f.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
