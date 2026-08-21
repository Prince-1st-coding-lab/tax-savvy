import { useMemo, useState } from "react";
import {
  FILING_STATUS_LABELS,
  NO_INCOME_TAX_STATES,
  QUARTERLY_DUE_DATES,
  SS_WAGE_BASE,
  STATES,
  TAX_YEAR,
  calculateTaxes,
  formatCurrency,
  type FilingStatus,
} from "../lib/tax";

function MoneyField({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          className="field pl-7"
          value={value}
          placeholder="0"
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function Calculator() {
  const [status, setStatus] = useState<FilingStatus>("single");
  const [seIncome, setSeIncome] = useState("80000");
  const [w2Income, setW2Income] = useState("0");
  const [expenses, setExpenses] = useState("0");
  const [state, setState] = useState("California");

  const result = useMemo(
    () =>
      calculateTaxes({
        status,
        seIncome: parseFloat(seIncome) || 0,
        w2Income: parseFloat(w2Income) || 0,
        expenses: parseFloat(expenses) || 0,
      }),
    [status, seIncome, w2Income, expenses],
  );

  const stateNote = NO_INCOME_TAX_STATES.has(state)
    ? `${state} has no broad personal income tax, so your state bill is likely $0 — but check local and business-level taxes.`
    : `${state} has its own income tax rules. Budget for state estimated payments separately; this tool covers federal tax only.`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
      <section
        aria-labelledby="inputs-heading"
        className="rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6"
      >
        <h2 id="inputs-heading" className="text-lg font-semibold">
          Your numbers
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Results update as you type. Nothing is saved or sent anywhere.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="filing-status" className="block text-sm font-medium text-ink">
              Filing status
            </label>
            <select
              id="filing-status"
              className="field mt-1.5"
              value={status}
              onChange={(e) => setStatus(e.target.value as FilingStatus)}
            >
              {(Object.keys(FILING_STATUS_LABELS) as FilingStatus[]).map((key) => (
                <option key={key} value={key}>
                  {FILING_STATUS_LABELS[key]}
                </option>
              ))}
            </select>
          </div>

          <MoneyField
            id="se-income"
            label="Expected self-employment income this year"
            hint="Gross 1099 / freelance / business revenue before expenses."
            value={seIncome}
            onChange={setSeIncome}
          />
          <MoneyField
            id="expenses"
            label="Business expenses & deductions"
            hint="Subtracted from your gross before any tax is calculated."
            value={expenses}
            onChange={setExpenses}
          />
          <MoneyField
            id="w2-income"
            label="W-2 income (optional)"
            hint={`W-2 wages don't pay SE tax, but they use up the ${formatCurrency(SS_WAGE_BASE)} Social Security wage base and push you into higher brackets.`}
            value={w2Income}
            onChange={setW2Income}
          />

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-ink">
              State
            </label>
            <select
              id="state"
              className="field mt-1.5"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{stateNote}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="results-heading" className="space-y-4">
        <div className="rounded-2xl border border-border bg-primary p-5 text-primary-foreground shadow-lift sm:p-6">
          <h2 id="results-heading" className="text-lg font-semibold text-primary-foreground">
            Your {TAX_YEAR} estimate
          </h2>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-[0.16em] text-primary-foreground/70">
              Set aside each quarter
            </p>
            <p className="num mt-1 text-5xl font-bold sm:text-6xl">
              {formatCurrency(result.quarterly)}
            </p>
          </div>

          <div className="mt-6 border-t border-primary-foreground/20 pt-5">
            <p className="text-xs uppercase tracking-[0.16em] text-primary-foreground/70">
              Total estimated tax for the year
            </p>
            <p className="num mt-1 text-3xl font-semibold">{formatCurrency(result.totalTax)}</p>
            <p className="mt-1 text-sm text-primary-foreground/70">
              ≈ {(result.effectiveRate * 100).toFixed(1)}% effective rate on your income
            </p>
          </div>

          <dl className="mt-6 grid gap-3 border-t border-primary-foreground/20 pt-5 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-primary-foreground/10 p-3">
              <dt className="text-primary-foreground/75">Self-employment tax</dt>
              <dd className="num mt-1 text-xl font-semibold">{formatCurrency(result.seTax)}</dd>
            </div>
            <div className="rounded-lg bg-primary-foreground/10 p-3">
              <dt className="text-primary-foreground/75">Federal income tax</dt>
              <dd className="num mt-1 text-xl font-semibold">{formatCurrency(result.incomeTax)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6">
          <h3 className="text-base font-semibold">Quarterly payment schedule</h3>
          <table className="mt-3 w-full text-sm">
            <caption className="sr-only">
              Estimated quarterly federal tax payments and approximate IRS due dates
            </caption>
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th scope="col" className="py-2 font-medium">Quarter</th>
                <th scope="col" className="py-2 font-medium">Due date</th>
                <th scope="col" className="py-2 text-right font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {QUARTERLY_DUE_DATES.map((q) => (
                <tr key={q.label} className="border-b border-border/60 last:border-0">
                  <td className="py-2.5">
                    <span className="font-medium text-ink">{q.label}</span>
                    <span className="block text-xs text-muted-foreground">{q.period}</span>
                  </td>
                  <td className="py-2.5 text-muted-foreground">{q.due}</td>
                  <td className="num py-2.5 text-right font-semibold text-ink">
                    {formatCurrency(result.quarterly, 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted-foreground">
            Dates are approximate — confirm the exact deadline for the current year on IRS.gov, since
            they shift for weekends and holidays.
          </p>
        </div>

        <details className="rounded-2xl border border-border bg-surface p-5 text-sm shadow-card sm:p-6">
          <summary className="cursor-pointer font-semibold text-ink">How this was calculated</summary>
          <dl className="mt-4 space-y-2 text-muted-foreground">
            {[
              ["Net self-employment earnings", result.netSeEarnings],
              ["SE tax base (92.35%)", result.seTaxBase],
              ["Social Security portion (12.4%)", result.socialSecurityTax],
              ["Medicare portion (2.9%)", result.medicareTax],
              ["Deduction for half of SE tax", result.halfSeDeduction],
              ["Standard deduction", result.standardDeduction],
              ["Taxable income", result.taxableIncome],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between gap-4">
                <dt>{label}</dt>
                <dd className="num font-medium text-ink">{formatCurrency(value as number)}</dd>
              </div>
            ))}
          </dl>
        </details>

        <p className="rounded-xl border border-border bg-secondary/70 p-4 text-xs leading-relaxed text-secondary-foreground">
          This is an estimate for planning purposes only, not tax advice. Consult a licensed tax
          professional or the IRS website for your exact obligations.
        </p>
      </section>
    </div>
  );
}
