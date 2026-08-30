import { useMemo, useState } from "react";
import {
  FILING_STATUS_LABELS,
  NO_INCOME_TAX_STATES,
  STATES,
  TAX_YEAR,
  TAX_YEARS,
  calculateTaxes,
  formatCurrency,
  getYearConfig,
  validateInputs,
  type FilingStatus,
  type Warning,
} from "../lib/tax";

function MoneyField({
  id,
  label,
  hint,
  value,
  onChange,
  invalid,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
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
          aria-invalid={invalid || undefined}
          className={`field pl-7 ${invalid ? "border-destructive" : ""}`}
          value={value}
          placeholder="0"
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

const WARNING_STYLES: Record<Warning["level"], string> = {
  error: "border-destructive/40 bg-destructive/10 text-destructive",
  warning: "border-accent/40 bg-accent/10 text-secondary-foreground",
  info: "border-border bg-secondary/60 text-secondary-foreground",
};

const WARNING_ICON: Record<Warning["level"], string> = {
  error: "!",
  warning: "!",
  info: "i",
};

export function Calculator() {
  const [year, setYear] = useState<number>(TAX_YEAR);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [seIncome, setSeIncome] = useState("80000");
  const [w2Income, setW2Income] = useState("0");
  const [expenses, setExpenses] = useState("0");
  const [state, setState] = useState("California");

  const config = getYearConfig(year);

  const result = useMemo(
    () =>
      calculateTaxes({
        status,
        seIncome: parseFloat(seIncome) || 0,
        w2Income: parseFloat(w2Income) || 0,
        expenses: parseFloat(expenses) || 0,
        year,
      }),
    [status, seIncome, w2Income, expenses, year],
  );

  const warnings = useMemo(
    () =>
      validateInputs(
        { status, seIncomeRaw: seIncome, w2IncomeRaw: w2Income, expensesRaw: expenses, year },
        result,
      ),
    [status, seIncome, w2Income, expenses, year, result],
  );

  const fieldHasError = (id: string) =>
    warnings.some((w) => w.id === id && w.level === "error");

  const stateNote = NO_INCOME_TAX_STATES.has(state)
    ? `${state} has no broad personal income tax, so your state bill is likely $0 — but check local and business-level taxes.`
    : `${state} has its own income tax rules. Budget for state estimated payments separately; this tool covers federal tax only.`;

  const breakdown: [string, number][] = [
    ["Net self-employment earnings", result.netSeEarnings],
    ["SE tax base (92.35%)", result.seTaxBase],
    ["Social Security portion (12.4%)", result.socialSecurityTax],
    ["Medicare portion (2.9%)", result.medicareTax],
    ...(result.additionalMedicareTax > 0
      ? ([["Additional Medicare tax (0.9%)", result.additionalMedicareTax]] as [string, number][])
      : []),
    ["Deduction for half of SE tax", result.halfSeDeduction],
    ["Standard deduction", result.standardDeduction],
    ["Taxable income", result.taxableIncome],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
      <section
        aria-labelledby="inputs-heading"
        className="no-print rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6"
      >
        <h2 id="inputs-heading" className="text-lg font-semibold">
          Your numbers
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Results update as you type. Nothing is saved or sent anywhere.
        </p>

        <div className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="tax-year" className="block text-sm font-medium text-ink">
                Tax year
              </label>
              <select
                id="tax-year"
                className="field mt-1.5"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {TAX_YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                    {getYearConfig(y).official ? "" : " (projected)"}
                  </option>
                ))}
              </select>
            </div>

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
          </div>

          <MoneyField
            id="se-income"
            label="Expected self-employment income this year"
            hint="Gross 1099 / freelance / business revenue before expenses."
            value={seIncome}
            onChange={setSeIncome}
            invalid={fieldHasError("se-income")}
          />
          <MoneyField
            id="expenses"
            label="Business expenses & deductions"
            hint="Subtracted from your gross before any tax is calculated."
            value={expenses}
            onChange={setExpenses}
            invalid={fieldHasError("expenses")}
          />
          <MoneyField
            id="w2-income"
            label="W-2 income (optional)"
            hint={`W-2 wages don't pay SE tax, but they use up the ${formatCurrency(
              config.ssWageBase,
            )} ${year} Social Security wage base and push you into higher brackets.`}
            value={w2Income}
            onChange={setW2Income}
            invalid={fieldHasError("w2-income")}
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

        {warnings.length > 0 ? (
          <ul aria-live="polite" className="mt-5 space-y-2">
            {warnings.map((w) => (
              <li
                key={w.id}
                className={`flex gap-2.5 rounded-lg border p-3 text-xs leading-relaxed ${WARNING_STYLES[w.level]}`}
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-current text-[10px] font-bold"
                >
                  {WARNING_ICON[w.level]}
                </span>
                <span>{w.message}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section aria-labelledby="results-heading" className="print-area space-y-4">
        <div className="rounded-2xl border border-border bg-primary p-5 text-primary-foreground shadow-lift sm:p-6">
          <h2 id="results-heading" className="text-lg font-semibold text-primary-foreground">
            Your {year} estimate
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

        <div className="print-summary hidden text-sm">
          <h3 className="text-base font-semibold">Inputs used</h3>
          <dl className="mt-2 space-y-1">
            {[
              ["Tax year", `${year}${config.official ? "" : " (projected figures)"}`],
              ["Filing status", FILING_STATUS_LABELS[status]],
              ["Self-employment income", formatCurrency(parseFloat(seIncome) || 0)],
              ["Business expenses", formatCurrency(parseFloat(expenses) || 0)],
              ["W-2 income", formatCurrency(parseFloat(w2Income) || 0)],
              ["State", state],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-4 text-base font-semibold">How this was calculated</h3>
          <dl className="mt-2 space-y-1">
            {breakdown.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="num font-medium text-ink">{formatCurrency(value)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6">
          <h3 className="text-base font-semibold">Quarterly payment schedule</h3>
          <table className="mt-3 w-full text-sm">
            <caption className="sr-only">
              Estimated quarterly federal tax payments and approximate IRS due dates for {year}
            </caption>
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th scope="col" className="py-2 font-medium">Quarter</th>
                <th scope="col" className="py-2 font-medium">Due date</th>
                <th scope="col" className="py-2 text-right font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {config.dueDates.map((q) => (
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
            Dates are approximate — confirm the exact {year} deadline on IRS.gov, since they shift
            for weekends and holidays.
          </p>
        </div>

        <details className="no-print rounded-2xl border border-border bg-surface p-5 text-sm shadow-card sm:p-6" open={false}>
          <summary className="cursor-pointer font-semibold text-ink">How this was calculated</summary>
          <dl className="mt-4 space-y-2 text-muted-foreground">
            {breakdown.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt>{label}</dt>
                <dd className="num font-medium text-ink">{formatCurrency(value)}</dd>
              </div>
            ))}
          </dl>
        </details>

        <div className="no-print flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-card transition-opacity hover:opacity-90"
          >
            <span aria-hidden>↓</span> Download / print estimate (PDF)
          </button>
          <span className="self-center text-xs text-muted-foreground">
            Choose "Save as PDF" in the print dialog.
          </span>
        </div>

        <p className="rounded-xl border border-border bg-secondary/70 p-4 text-xs leading-relaxed text-secondary-foreground">
          This is an estimate for planning purposes only, not tax advice. Consult a licensed tax
          professional or the IRS website for your exact obligations.
        </p>
      </section>
    </div>
  );
}
