export type FilingStatus = "single" | "mfj" | "mfs" | "hoh";

export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: "Single",
  mfj: "Married Filing Jointly",
  mfs: "Married Filing Separately",
  hoh: "Head of Household",
};

// Tax-year assumptions (2026 figures). Clearly presented as estimates in the UI.
export const TAX_YEAR = 2026;
export const SS_WAGE_BASE = 184_500;
const SS_RATE = 0.124;
const MEDICARE_RATE = 0.029;
const SE_BASE_FACTOR = 0.9235;

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16_100,
  mfj: 32_200,
  mfs: 16_100,
  hoh: 24_150,
};

type Bracket = { rate: number; upTo: number };

const BRACKETS: Record<FilingStatus, Bracket[]> = {
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
};

export function incomeTaxFor(taxable: number, status: FilingStatus) {
  let remaining = Math.max(0, taxable);
  let previous = 0;
  let tax = 0;
  for (const bracket of BRACKETS[status]) {
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
}

export interface TaxResult {
  netSeEarnings: number;
  seTaxBase: number;
  socialSecurityTax: number;
  medicareTax: number;
  seTax: number;
  halfSeDeduction: number;
  standardDeduction: number;
  taxableIncome: number;
  incomeTax: number;
  totalTax: number;
  quarterly: number;
  effectiveRate: number;
}

export function calculateTaxes({ status, seIncome, w2Income, expenses }: TaxInput): TaxResult {
  const netSeEarnings = Math.max(0, (seIncome || 0) - (expenses || 0));
  const seTaxBase = netSeEarnings * SE_BASE_FACTOR;

  // W-2 wages consume the Social Security wage base first.
  const ssRemaining = Math.max(0, SS_WAGE_BASE - Math.max(0, w2Income || 0));
  const ssTaxable = Math.min(seTaxBase, ssRemaining);
  const socialSecurityTax = ssTaxable * SS_RATE;
  const medicareTax = seTaxBase * MEDICARE_RATE;
  const seTax = socialSecurityTax + medicareTax;

  const halfSeDeduction = seTax / 2;
  const standardDeduction = STANDARD_DEDUCTION[status];
  const taxableIncome = Math.max(
    0,
    netSeEarnings + Math.max(0, w2Income || 0) - standardDeduction - halfSeDeduction,
  );
  const incomeTax = incomeTaxFor(taxableIncome, status);
  const totalTax = seTax + incomeTax;
  const grossIncome = netSeEarnings + Math.max(0, w2Income || 0);

  return {
    netSeEarnings,
    seTaxBase,
    socialSecurityTax,
    medicareTax,
    seTax,
    halfSeDeduction,
    standardDeduction,
    taxableIncome,
    incomeTax,
    totalTax,
    quarterly: totalTax / 4,
    effectiveRate: grossIncome > 0 ? totalTax / grossIncome : 0,
  };
}

export const QUARTERLY_DUE_DATES = [
  { label: "Q1", period: "Jan 1 – Mar 31", due: `April 15, ${TAX_YEAR}` },
  { label: "Q2", period: "Apr 1 – May 31", due: `June 15, ${TAX_YEAR}` },
  { label: "Q3", period: "Jun 1 – Aug 31", due: `September 15, ${TAX_YEAR}` },
  { label: "Q4", period: "Sep 1 – Dec 31", due: `January 15, ${TAX_YEAR + 1}` },
];

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
