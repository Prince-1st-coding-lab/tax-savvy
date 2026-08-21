import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Freelance Tax Calculator" },
      {
        name: "description",
        content:
          "How Freelance Tax Calculator handles data: calculations stay in your browser. Details on cookies, analytics, and Google AdSense advertising.",
      },
      { property: "og:title", content: "Privacy Policy — Freelance Tax Calculator" },
      {
        property: "og:description",
        content: "Our approach to cookies, analytics, and advertising. Your tax inputs never leave your device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

function Privacy() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: August 21, 2026</p>

      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-foreground/85">
        <p>
          This policy explains what information FreelanceTaxCalculator ("we", "the Site") collects
          and how it is used. We keep data collection to the minimum needed to run and support a free
          public tool.
        </p>

        <Section title="Your calculator inputs">
          <p>
            The calculator runs entirely in your browser. The income, expense, filing status, and
            state values you enter are never transmitted to our servers, never stored, and never
            shared or sold. Closing the tab discards them.
          </p>
        </Section>

        <Section title="Information we collect">
          <p>
            We do not operate user accounts and do not ask for personal information to use the tool.
            If you email us via the contact page, we receive your email address and message and use
            them only to reply.
          </p>
          <p>
            Like most websites, our hosting provider and analytics may automatically log technical
            data such as IP address, browser type, device type, referring page, and pages viewed.
          </p>
        </Section>

        <Section title="Cookies and analytics">
          <p>
            We may use a privacy-respecting analytics service to understand aggregate traffic — how
            many people visit, which pages they read, and where they arrive from. Analytics data is
            aggregated and is not used to identify individuals.
          </p>
          <p>
            You can block or delete cookies in your browser settings at any time. The calculator
            works fine with cookies disabled.
          </p>
        </Section>

        <Section title="Advertising and Google AdSense">
          <p>
            This Site is supported by advertising and may display ads served by Google, including
            Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on
            your prior visits to this and other websites.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Google's use of advertising cookies enables it and its partners to serve ads to you
              based on your visit to this Site and/or other sites on the internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="font-medium text-accent underline underline-offset-4"
              >
                Google Ads Settings
              </a>
              , or opt out of third-party vendor cookies at{" "}
              <a
                href="https://www.aboutads.info/choices/"
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="font-medium text-accent underline underline-offset-4"
              >
                aboutads.info/choices
              </a>
              .
            </li>
            <li>
              Third-party ad networks set their own cookies and are governed by their own privacy
              policies, which we do not control.
            </li>
          </ul>
        </Section>

        <Section title="Your rights">
          <p>
            Depending on where you live (for example under GDPR or CCPA), you may have the right to
            access, correct, or delete personal information we hold about you, and to object to
            certain processing. Because we hold almost no personal data, such requests are usually
            limited to email correspondence. Contact us and we will respond.
          </p>
        </Section>

        <Section title="Children's privacy">
          <p>
            The Site is not directed to children under 13 and we do not knowingly collect their
            personal information.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy from time to time. Material changes will be reflected in the
            "last updated" date above.
          </p>
        </Section>
      </div>
    </div>
  );
}
