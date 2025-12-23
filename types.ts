export type BonusTaxMethod = 'separate' | 'combined';

export interface SalaryInputs {
  monthlySalary: number;
  baseMonths: number;   // New: Base salary months (usually 12)
  bonusMonths: number;  // New: Bonus months (e.g. 2, 3)
  
  // Detailed Social Security Ratios
  housingFundRatio: number; // 5-12%
  pensionRatio: number;     // 8%
  medicalRatio: number;     // 2%
  unemploymentRatio: number;// 0.5-1%
  
  specialAdditionalDeduction: number;
  bonusTaxMethod: BonusTaxMethod;
}

export interface MonthlyDetail {
  month: number;
  gross: number;
  socialDed: number;
  taxableIncome: number; // Current month taxable calculation base
  cumulativeTaxableIncome: number;
  cumulativeTaxPaid: number;
  monthlyTax: number;
  netIncome: number;
  taxRate: number; // Applicable tax rate for the cumulative amount (0.03, 0.1, etc.)
}

export interface BonusDetail {
  gross: number;
  tax: number;
  net: number;
  rate: number; // Applicable tax rate for bonus (if separate)
}

export interface YearlySummary {
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalSocial: number;
  totalHousingFund: number; // Track separately for clarity if needed
  totalSocialCompanyEstimate: number;
}

export interface ComparisonResult {
  currentMethod: BonusTaxMethod;
  optimalMethod: BonusTaxMethod;
  diffAmount: number; // Positive means optimal is better by this amount
  separateNet: number;
  combinedNet: number;
}

export interface CalculationResult {
  monthlyData: MonthlyDetail[];
  bonus: BonusDetail;
  yearly: YearlySummary;
  comparison: ComparisonResult;
}