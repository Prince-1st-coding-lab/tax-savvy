import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Freelance Tax Calculator" },
      {
        name: "description",
        content:
          "Get in touch with the Freelance Tax Calculator team about corrections, feedback, or questions about the estimator.",
      },
      { property: "og:title", content: "Contact — Freelance Tax Calculator" },
      {
        property: "og:description",
        content: "Send feedback, corrections, or questions about the freelance tax estimator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const EMAIL = "hello@freelancetaxcalculator.com";

function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject || "Freelance Tax Calculator",
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Contact</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
        Found a rate that looks out of date, hit a bug, or want a feature? Write in — messages go to
        a real inbox and usually get a reply within a few days. We can't answer questions about your
        personal tax situation; that needs a licensed professional.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
        >
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-ink">
              Subject
            </label>
            <input
              id="subject"
              className="field mt-1.5"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Feedback about the calculator"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="field mt-1.5 resize-y"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Open in your email app
          </button>
          <p className="text-xs text-muted-foreground">
            This form opens your own email client — nothing is submitted to or stored on this site.
            Prefer to write directly?{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-accent underline underline-offset-4"
            >
              {EMAIL}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
