# Tax Savvy

# Lovable.dev Build Prompt — Freelance Tax Calculator



Copy everything below into Lovable.dev as your project prompt.



---



Build a web app called **FreelanceTaxCalculator** — a free, single-purpose tool that helps US-based freelancers and self-employed people estimate their federal self-employment tax and quarterly estimated tax payments. This is an AdSense-monetized public tool site, so it needs to be fast, clean, SEO-friendly, and trustworthy-looking — not a SaaS dashboard.



## Core functionality: the calculator



Build one primary calculator on the homepage with these inputs:



- **Filing status**: dropdown — Single, Married Filing Jointly, Married Filing Separately, Head of Household

- **Expected net self-employment income for the year** (number input, $)

- **W-2 income (if any)**, since self-employment tax only applies to SE income but total income affects bracket (number input, $, optional, default 0)

- **Business expenses / deductions already accounted for** (number input, $, optional, default 0) — subtract this from gross SE income before calculating

- **State** (dropdown of all 50 states + DC) — used only to show a note about state tax, not to calculate it (state tax logic is out of scope for v1)



Calculation logic (federal only, current year assumptions, show these clearly labeled as estimates):



1. **Net SE earnings** = self-employment income − business expenses

2. **SE tax base** = Net SE earnings × 92.35%

3. **Self-employment tax** = SE tax base × 15.3% (12.4% Social Security up to the annual SS wage base cap + 2.9% Medicare, no cap on Medicare). Apply the Social Security wage base cap correctly — if net SE earnings plus any W-2 Social Security wages already exceed the cap, only the Medicare portion (2.9%) applies to the excess.

4. **Deduction for half of SE tax** = SE tax × 50% (this reduces adjusted gross income)

5. **Estimated federal income tax** = apply the current-year IRS marginal tax brackets for the selected filing status to (net SE earnings + W-2 income − standard deduction for filing status − half of SE tax deduction). Use a simple progressive bracket calculation.

6. **Total estimated annual tax owed** = self-employment tax + estimated federal income tax

7. **Quarterly estimated payment** = total estimated annual tax owed ÷ 4, with the four IRS quarterly due dates displayed (typically April 15, June 15, Sept 15, Jan 15 of the following year — show as "approximate, confirm exact date for current year")



## Output display



Show results in a clean summary card immediately below the form, updating live as the user types (no submit button needed — instant recalculation). Include:



- Self-employment tax (dollar amount)

- Estimated federal income tax (dollar amount)

- **Total estimated tax owed** (bold, largest number)

- **Estimated payment per quarter** (bold, second largest — this is the number most users came for)

- A simple breakdown table showing the 4 quarterly due dates with the amount for each

- A visible disclaimer: "This is an estimate for planning purposes only, not tax advice. Consult a licensed tax professional or the IRS website for your exact obligations."



## Design direction



- Clean, modern, trustworthy fintech aesthetic — think Stripe or NerdWallet, not a generic template. Avoid AI-generated-looking gradients or stock icon sets.

- Calm, professional color palette (deep blue/green primary, white/off-white background, no harsh neon)

- Large, legible number outputs — this is the payoff moment for the user, make it feel clear and satisfying

- Fully responsive, mobile-first (most traffic will be mobile search)

- Fast initial load — no heavy animation libraries, no unnecessary JS

- Sticky top nav with logo/name only — no login, no signup, no account system anywhere on this site



## Pages needed (for AdSense approval + SEO)



1. **Home (`/`)** — the calculator itself, with a short intro paragraph above the fold explaining what it does and who it's for, and a longer SEO/educational content section below the calculator explaining how self-employment tax and quarterly payments work in plain language (400-600 words)

2. **About (`/about`)** — who runs the site, why it was built, tone: helpful and simple, not corporate

3. **Privacy Policy (`/privacy-policy`)** — standard template covering cookies, analytics, and AdSense's use of cookies for personalized ads

4. **Terms of Use (`/terms`)** — standard disclaimer template, emphasize this is not tax/legal/financial advice

5. **Contact (`/contact`)** — simple contact form or email link



## SEO requirements



- Page title: "Freelance Tax Calculator — Estimate Your Quarterly Self-Employment Taxes"

- Meta description under 160 characters summarizing the tool

- Semantic HTML with proper H1/H2 structure

- Fast Core Web Vitals — optimize images, avoid layout shift

- Add schema.org structured data for a WebApplication / FAQPage (include 3-4 common FAQ items like "How much should I set aside for freelance taxes?" answered briefly on the page)



## Ad placement (for future AdSense integration)



Leave clearly marked, clean placeholder divs (not actual ad code yet) in these spots so ads can be dropped in later without breaking layout:

- Below the header, above the calculator

- Between the calculator results and the educational content section

- In the footer area, above the site links



## Tech notes



- No backend/database needed — all calculation happens client-side in JavaScript/TypeScript

- No user accounts, no data storage, no cookies beyond standard analytics

- Keep dependencies minimal



Build this as a po

lished, launch-ready single tool site — the calculator is the entire product.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/37d61ba8-b569-42be-8aa7-5d9370a90341).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
