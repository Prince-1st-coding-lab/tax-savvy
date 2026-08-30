export type FilingStatus = "single" | "mfj" | "mfs" | "hoh";

export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: "Single",
  mfj: "Married Filing Jointly",
  mfs: "Married Filing Separately",
  hoh: "Head of Household",
};

const SS_RATE = 0.124;
const MEDICARE_RATE = 0.029;
const SE_BASE_FACTOR = 0.9235;
// Additional Medicare tax applies above these thresholds (not indexed).
const ADDL_MEDICARE_RATE = 0.009;
const ADDL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200_000,
  mfj: 250_000,
  mfs: 125_000,
  hoh: 200_000,
};

type Bracket = { rate: number; upTo: number };

export interface YearConfig {
  year: number;
  ssWageBase: number;
  standardDeduction: Record<FilingStatus, number>;
  brackets: Record<FilingStatus, Bracket[]>;
  dueDates: { label: string; period: string; due: string }[];
  /** true when the figures are IRS-published rather than projected */
  official: boolean;
}

const YEAR_2025: YearConfig = {
  year: 2025,
  ssWageBase: 176_100,
  official: true,
  standardDeduction: { single: 15_750, mfj: 31_500, mfs: 15_750, hoh: 23_625 },
  brackets: {
    single: [
      { rate: 0.1, upTo: 11_925 },
      { rate: 0.12, upTo: 48_475 },
      { rate: 0.22, upTo: 103_350 },
      { rate: 0.24, upTo: 197_300 },
      { rate: 0.32, upTo: 250_525 },
      { rate: 0.35, upTo: 626_350 },
      { rate: 0.37, upTo: Infinity },
    ],
    mfj: [
      { rate: 0.1, upTo: 23_850 },
      { rate: 0.12, upTo: 96_950 },
      { rate: 0.22, upTo: 206_700 },
      { rate: 0.24, upTo: 394_600 },
      { rate: 0.32, upTo: 501_050 },
      { rate: 0.35, upTo: 751_600 },
      { rate: 0.37, upTo: Infinity },
    ],
    mfs: [
      { rate: 0.1, upTo: 11_925 },
      { rate: 0.12, upTo: 48_475 },
      { rate: 0.22, upTo: 103_350 },
      { rate: 0.24, upTo: 197_300 },
      { rate: 0.32, upTo: 250_525 },
      { rate: 0.35, upTo: 375_800 },
      { rate: 0.37, upTo: Infinity },
    ],
    hoh: [
      { rate: 0.1, upTo: 17_000 },
      { rate: 0.12, upTo: 64_850 },
      { rate: 0.22, upTo: 103_350 },
      { rate: 0.24, upTo: 197_300 },
      { rate: 0.32, upTo: 250_500 },
      { rate: 0.35, upTo: 626_350 },
      { rate: 0.37, upTo: Infinity },
    ],
  },
  dueDates: [
    { label: "Q1", period: "Jan 1 – Mar 31", due: "April 15, 2025" },
    { label: "Q2", period: "Apr 1 – May 31", due: "June 16, 2025" },
    { label: "Q3", period: "Jun 1 – Aug 31", due: "September 15, 2025" },
    { label: "Q4", period: "Sep 1 – Dec 31", due: "January 15, 2026" },
  ],
};

const YEAR_2026: YearConfig = {
  year: 2026,
  ssWageBase: 184_500,
  official: true,
  standardDeduction: { single: 16_100, mfj: 32_200, mfs: 16_100, hoh: 24_150 },
  brackets: {
    single: [
      { rate: 0.1, upTo: 12_400 },
      { rate: 0.12, upTo: 50_400 },
      { rate: 0.22, upTo: 105_700 },
      { rate: 0.24, upTo: 201_775 },
      { rate: 0.32, upTo: 256_225 },
      { rate: 0.35, upTo: 640_600 },
      { rate: 0.37, upTo: Infinity },
    ],
    mfj: [
      { rate: 0.1, upTo: 24_800 },
      { rate: 0.12, upTo: 100_800 },
      { rate: 0.22, upTo: 211_400 },
      { rate: 0.24, upTo: 403_550 },
      { rate: 0.32, upTo: 512_450 },
      { rate: 0.35, upTo: 768_700 },
      { rate: 0.37, upTo: Infinity },
    ],
    mfs: [
      { rate: 0.1, upTo: 12_400 },
      { rate: 0.12, upTo: 50_400 },
      { rate: 0.22, upTo: 105_700 },
      { rate: 0.24, upTo: 201_775 },
      { rate: 0.32, upTo: 256_225 },
      { rate: 0.35, upTo: 384_350 },
      { rate: 0.37, upTo: Infinity },
    ],
    hoh: [
      { rate: 0.1, upTo: 17_700 },
      { rate: 0.12, upTo: 67_450 },
      { rate: 0.22, upTo: 105_700 },
      { rate: 0.24, upTo: 201_750 },
      { rate: 0.32, upTo: 256_200 },
      { rate: 0.35, upTo: 640_600 },
      { rate: 0.37, upTo: Infinity },
    ],
  },
  dueDates: [
    { label: "Q1", period: "Jan 1 – Mar 31", due: "April 15, 2026" },
    { label: "Q2", period: "Apr 1 – May 31", due: "June 15, 2026" },
    { label: "Q3", period: "Jun 1 – Aug 31", due: "September 15, 2026" },
    { label: "Q4", period: "Sep 1 – Dec 31", due: "January 15, 2027" },
  ],
};

const YEAR_2027: YearConfig = {
  year: 2027,
  // Projected: inflation-adjusted estimates until the IRS publishes 2027 figures.
  ssWageBase: 192_900,
  official: false,
  standardDeduction: { single: 16_600, mfj: 33_200, mfs: 16_600, hoh: 24_900 },
  brackets: {
    single: [
      { rate: 0.1, upTo: 12_775 },
      { rate: 0.12, upTo: 51_925 },
      { rate: 0.22, upTo: 108_875 },
      { rate: 0.24, upTo: 207_825 },
      { rate: 0.32, upTo: 263_925 },
      { rate: 0.35, upTo: 659_825 },
      { rate: 0.37, upTo: Infinity },
    ],
    mfj: [
      { rate: 0.1, upTo: 25_550 },
      { rate: 0.12, upTo: 103_850 },
      { rate: 0.22, upTo: 217_750 },
      { rate: 0.24, upTo: 415_650 },
      { rate: 0.32, upTo: 527_825 },
      { rate: 0.35, upTo: 791_775 },
      { rate: 0.37, upTo: Infinity },
    ],
    mfs: [
      { rate: 0.1, upTo: 12_775 },
      { rate: 0.12, upTo: 51_925 },
      { rate: 0.22, upTo: 108_875 },
      { rate: 0.24, upTo: 207_825 },
      { rate: 0.32, upTo: 263_925 },
      { rate: 0.35, upTo: 395_875 },
      { rate: 0.37, upTo: Infinity },
    ],
    hoh: [
      { rate: 0.1, upTo: 18_225 },
      { rate: 0.12, upTo: 69_475 },
      { rate: 0.22, upTo: 108_875 },
      { rate: 0.24, upTo: 207_800 },
      { rate: 0.32, upTo: 263_900 },
      { rate: 0.35, upTo: 659_825 },
      { rate: 0.37, upTo: Infinity },
    ],
  },
  dueDates: [
    { label: "Q1", period: "Jan 1 – Mar 31", due: "April 15, 2027" },
    { label: "Q2", period: "Apr 1 – May 31", due: "June 15, 2027" },
    { label: "Q3", period: "Jun 1 – Aug 31", due: "September 15, 2027" },
    { label: "Q4", period: "Sep 1 – Dec 31", due: "January 18, 2028" },
  ],
};

export const YEAR_CONFIGS: Record<number, YearConfig> = {
  2025: YEAR_2025,
  2026: YEAR_2026,
  2027: YEAR_2027,
};

export const TAX_YEARS = [2025, 2026, 2027];
export const TAX_YEAR = 2026;

export function getYearConfig(year: number): YearConfig {
  return YEAR_CONFIGS[year] ?? YEAR_2026;
}

export function incomeTaxFor(taxable: number, status: FilingStatus, year: number = TAX_YEAR) {
  let remaining = Math.max(0, taxable);
  let previous = 0;
  let tax = 0;
  for (const bracket of getYearConfig(year).brackets[status]) {
    const width = bracket.upTo - previous;
    const amount = Math.min(remaining, width);
    if (amount <= 0) break;
    tax += amount * bracket.rate;
    remaining -= amount;
    previous = bracket.upTo;
  }
  return tax;
}

export interface TaxInput {
  status: FilingStatus;
  seIncome: number;
  w2Income: number;
  expenses: number;
  year?: number;
}

export interface TaxResult {
  year: number;
  ssWageBase: number;
  netSeEarnings: number;
  seTaxBase: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  seTax: number;
  halfSeDeduction: number;
  standardDeduction: number;
  taxableIncome: number;
  incomeTax: number;
  totalTax: number;
  quarterly: number;
  effectiveRate: number;
  /** amount by which expenses exceeded self-employment income (a business loss) */
  seLoss: number;
}

export function calculateTaxes({
  status,
  seIncome,
  w2Income,
  expenses,
  year = TAX_YEAR,
}: TaxInput): TaxResult {
  const config = getYearConfig(year);
  const gross = Math.max(0, seIncome || 0);
  const costs = Math.max(0, expenses || 0);
  const wages = Math.max(0, w2Income || 0);

  const rawNet = gross - costs;
  const seLoss = rawNet < 0 ? -rawNet : 0;
  const netSeEarnings = Math.max(0, rawNet);
  const seTaxBase = netSeEarnings * SE_BASE_FACTOR;

  // W-2 wages consume the Social Security wage base first.
  const ssRemaining = Math.max(0, config.ssWageBase - wages);
  const ssTaxable = Math.min(seTaxBase, ssRemaining);
  const socialSecurityTax = ssTaxable * SS_RATE;
  const medicareTax = seTaxBase * MEDICARE_RATE;

  const addlThreshold = ADDL_MEDICARE_THRESHOLD[status];
  const medicareWages = wages + seTaxBase;
  const additionalMedicareTax =
    Math.max(0, Math.min(seTaxBase, medicareWages - addlThreshold)) * ADDL_MEDICARE_RATE;

  const seTax = socialSecurityTax + medicareTax + additionalMedicareTax;

  // Only the regular (non-additional) SE tax is half-deductible.
  const halfSeDeduction = (socialSecurityTax + medicareTax) / 2;
  const standardDeduction = config.standardDeduction[status];
  // A business loss offsets W-2 income for income-tax purposes.
  const agi = Math.max(0, rawNet + wages);
  const taxableIncome = Math.max(0, agi - standardDeduction - halfSeDeduction);
  const incomeTax = incomeTaxFor(taxableIncome, status, year);
  const totalTax = seTax + incomeTax;

  return {
    year: config.year,
    ssWageBase: config.ssWageBase,
    netSeEarnings,
    seTaxBase,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    seTax,
    halfSeDeduction,
    standardDeduction,
    taxableIncome,
    incomeTax,
    totalTax,
    quarterly: totalTax / 4,
    effectiveRate: agi > 0 ? totalTax / agi : 0,
    seLoss,
  };
}

export type WarningLevel = "error" | "warning" | "info";
export interface Warning {
  id: string;
  level: WarningLevel;
  message: string;
}

export interface ValidationInput {
  status: FilingStatus;
  seIncomeRaw: string;
  w2IncomeRaw: string;
  expensesRaw: string;
  year: number;
}

const MAX_REASONABLE = 100_000_000;

export function validateInputs(
  { status, seIncomeRaw, w2IncomeRaw, expensesRaw, year }: ValidationInput,
  result: TaxResult,
): Warning[] {
  const warnings: Warning[] = [];
  const config = getYearConfig(year);
  const parse = (v: string) => (v.trim() === "" ? NaN : Number(v));
  const se = parse(seIncomeRaw);
  const w2 = parse(w2IncomeRaw);
  const exp = parse(expensesRaw);

  for (const [id, label, value] of [
    ["se-income", "Self-employment income", se],
    ["w2-income", "W-2 income", w2],
    ["expenses", "Business expenses", exp],
  ] as const) {
    if (!Number.isNaN(value) && !Number.isFinite(value)) {
      warnings.push({ id, level: "error", message: `${label} isn't a valid number.` });
    } else if (value > MAX_REASONABLE) {
      warnings.push({
        id,
        level: "error",
        message: `${label} looks unrealistically large — check for an extra digit.`,
      });
    }
  }

  const seBlank = Number.isNaN(se) || se === 0;
  if (seBlank && (Number.isNaN(w2) || w2 === 0)) {
    warnings.push({
      id: "no-income",
      level: "info",
      message: "Enter your expected income above to see an estimate.",
    });
  } else if (seBlank && w2 > 0) {
    warnings.push({
      id: "w2-only",
      level: "info",
      message:
        "With no self-employment income there's no SE tax. W-2 withholding usually covers this bill, so quarterly payments may not be needed.",
    });
  }

  if (result.seLoss > 0) {
    warnings.push({
      id: "se-loss",
      level: "warning",
      message: `Your expenses exceed your self-employment income by ${formatCurrency(
        result.seLoss,
      )}. Net earnings are treated as $0 for SE tax, and the loss is applied against your other income. Verify the numbers — most freelancers shouldn't run at a loss on paper.`,
    });
  }

  if (!Number.isNaN(exp) && exp > 0 && !Number.isNaN(se) && se > 0 && exp / se > 0.8) {
    warnings.push({
      id: "high-expenses",
      level: "warning",
      message:
        "Expenses above 80% of revenue are unusual and a common audit trigger. Make sure everything claimed is genuinely deductible.",
    });
  }

  const wages = Number.isNaN(w2) ? 0 : w2;
  if (wages >= config.ssWageBase) {
    warnings.push({
      id: "ss-cap",
      level: "info",
      message: `Your W-2 wages already meet the ${formatCurrency(
        config.ssWageBase,
      )} Social Security wage base for ${year}, so no Social Security portion applies to your freelance earnings — only the 2.9% Medicare piece (plus any additional Medicare tax).`,
    });
  } else if (wages > 0 && wages + result.seTaxBase > config.ssWageBase) {
    warnings.push({
      id: "ss-cap-partial",
      level: "info",
      message: `Your combined wages and freelance earnings cross the ${formatCurrency(
        config.ssWageBase,
      )} Social Security cap, so only part of your freelance income pays the 12.4% Social Security portion.`,
    });
  }

  if (result.additionalMedicareTax > 0) {
    warnings.push({
      id: "addl-medicare",
      level: "info",
      message: `Your combined earnings exceed the ${formatCurrency(
        ADDL_MEDICARE_THRESHOLD[status],
      )} threshold, so the extra 0.9% Additional Medicare Tax is included in your estimate.`,
    });
  }

  if (!config.official) {
    warnings.push({
      id: "projected-year",
      level: "warning",
      message: `${year} brackets aren't published by the IRS yet — these are inflation-adjusted projections and will change.`,
    });
  }

  return warnings;
}

export const QUARTERLY_DUE_DATES = YEAR_2026.dueDates;
export const SS_WAGE_BASE = YEAR_2026.ssWageBase;
export const STANDARD_DEDUCTION = YEAR_2026.standardDeduction;

export const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas",
  "Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York",
  "North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming",
];

export const NO_INCOME_TAX_STATES = new Set([
  "Alaska","Florida","Nevada","New Hampshire","South Dakota","Tennessee","Texas","Washington","Wyoming",
]);

export const formatCurrency = (value: number, fractionDigits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
