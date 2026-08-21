import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Freelance Tax Calculator" },
      {
        name: "description",
        content:
          "Terms of use for the Freelance Tax Calculator, including our disclaimer that results are estimates and not tax, legal, or financial advice.",
      },
      { property: "og:title", content: "Terms of Use — Freelance Tax Calculator" },
      {
        property: "og:description",
        content: "Terms governing use of the Freelance Tax Calculator and its estimates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

function Terms() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: August 21, 2026</p>

      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-foreground/85">
        <p>
          By accessing or using FreelanceTaxCalculator (the "Site"), you agree to these Terms of Use.
          If you do not agree, please do not use the Site.
        </p>

        <Section title="Not tax, legal, or financial advice">
          <p>
            The Site provides general educational estimates only. Nothing on it constitutes tax,
            legal, accounting, or financial advice, and no client, fiduciary, or professional
            relationship is created by using it. Tax law is complex and fact-specific. Always consult
            a licensed tax professional, CPA, enrolled agent, or the IRS directly before making
            decisions or filing.
          </p>
        </Section>

        <Section title="Accuracy and estimates">
          <p>
            Calculations rely on simplified assumptions and published federal rates that may change
            or be superseded. The Site ignores state and local taxes, credits, itemized deductions,
            the qualified business income deduction, retirement contributions, and many other
            factors. Results may differ substantially from your actual tax liability. You are solely
            responsible for verifying any figure before relying on it.
          </p>
        </Section>

        <Section title="No warranty">
          <p>
            The Site is provided "as is" and "as available", without warranties of any kind, express
            or implied, including merchantability, fitness for a particular purpose, accuracy, and
            non-infringement. We do not warrant uninterrupted or error-free operation.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            To the maximum extent permitted by law, we are not liable for any direct, indirect,
            incidental, consequential, or punitive damages — including underpayment penalties,
            interest, missed deadlines, lost profits, or lost data — arising from your use of, or
            inability to use, the Site.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>
            You agree not to misuse the Site, including attempting to disrupt it, scrape it at a
            volume that degrades service, reverse engineer it for malicious purposes, or use it in
            violation of applicable law.
          </p>
        </Section>

        <Section title="Intellectual property">
          <p>
            All content, design, and code on the Site are owned by us or our licensors and protected
            by applicable law. You may use the Site for personal and internal business purposes; you
            may not republish substantial portions without permission.
          </p>
        </Section>

        <Section title="Third-party links and advertising">
          <p>
            The Site may link to third-party websites and display advertising served by third
            parties, including Google AdSense. We are not responsible for third-party content,
            products, or practices.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>
            We may update these Terms at any time. Continued use of the Site after changes are posted
            constitutes acceptance of the revised Terms.
          </p>
        </Section>
      </div>
    </div>
  );
}
