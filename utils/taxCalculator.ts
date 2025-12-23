import { CalculationResult, SalaryInputs, BonusTaxMethod } from '../types';
import { TAX_THRESHOLD, TAX_BRACKETS, BONUS_TAX_BRACKETS } from './constants';
import { calculateSocialBase } from './validation';

// Helper to get tax rate based on taxable income
const getTaxRate = (taxable: number): number => {
  if (taxable <= 0) return 0;
  const bracket = TAX_BRACKETS.find((b) => taxable <= b.max);
  return bracket?.rate ?? 0.45;
};

// 综合所得累计税率表 (2019版) - Calculates Tax Amount
const calcTax = (taxable: number): number => {
  if (taxable <= 0) return 0;
  const bracket = TAX_BRACKETS.find((b) => taxable <= b.max);
  if (!bracket) return taxable * 0.45 - 181920;
  return taxable * bracket.rate - bracket.deduction;
};

// 标准年终奖计算方法 (单独计税)：奖金 * 适用税率 - 速算扣除数
const getBonusTaxSeparate = (totalBonus: number): number => {
  if (totalBonus <= 0) return 0;
  const avg = totalBonus / 12.0;
  const bracket = BONUS_TAX_BRACKETS.find((b) => avg <= b.max);
  if (!bracket) return totalBonus * 0.45 - 15160;
  return totalBonus * bracket.rate - bracket.deduction;
};

export const calculateSalary = (inputs: SalaryInputs): CalculationResult => {
  const { 
    monthlySalary, 
    baseMonths,
    bonusMonths,
    housingFundRatio,
    pensionRatio,
    medicalRatio,
    unemploymentRatio,
    specialAdditionalDeduction, 
    bonusTaxMethod 
  } = inputs;

  // ===== 1. Monthly Salary Calculation (Standard Cumulative) =====
  let cumulativeTaxableIncome = 0;
  let cumulativeTaxPaid = 0;
  let totalNetIncomeSalaryPart = 0;
  
  // Calculate actual social security base (considering min/max limits)
  const socialBase = calculateSocialBase(monthlySalary);
  
  // Calculate total individual deduction ratio
  const totalRatio = housingFundRatio + pensionRatio + medicalRatio + unemploymentRatio;
  const monthlyPersonalDed = socialBase * (totalRatio / 100.0);
  const monthlyHousingFundOnly = socialBase * (housingFundRatio / 100.0);

  const monthlyData = [];

  // Limit loop to 12 months as it's a calendar year tax cycle
  // If baseMonths < 12, we only calculate for those months
  const monthsToCalculate = Math.min(12, Math.max(1, Math.round(baseMonths)));

  for (let i = 0; i < monthsToCalculate; i++) {
    const currentMonthTaxable = monthlySalary - monthlyPersonalDed - specialAdditionalDeduction - TAX_THRESHOLD;

    if (currentMonthTaxable > 0) {
      cumulativeTaxableIncome += currentMonthTaxable;
    }

    const cumulativeTaxShouldPay = calcTax(cumulativeTaxableIncome);
    const monthlyTax = Math.max(0, cumulativeTaxShouldPay - cumulativeTaxPaid);
    
    // Determine current applicable rate
    const currentRate = getTaxRate(cumulativeTaxableIncome);

    cumulativeTaxPaid = cumulativeTaxShouldPay;

    const netIncome = monthlySalary - monthlyTax - monthlyPersonalDed;
    totalNetIncomeSalaryPart += netIncome;

    monthlyData.push({
      month: i + 1,
      gross: monthlySalary,
      socialDed: monthlyPersonalDed,
      taxableIncome: currentMonthTaxable,
      cumulativeTaxableIncome,
      cumulativeTaxPaid,
      monthlyTax,
      netIncome,
      taxRate: currentRate
    });
  }

  // ===== 2. Bonus Calculation =====
  const bonusGross = monthlySalary * bonusMonths;
  
  // -- Calculate for Separate Method --
  let bonusTaxSeparate = 0;
  let bonusRateSeparate = 0;
  if (bonusGross > 0) {
    bonusTaxSeparate = getBonusTaxSeparate(bonusGross);
    bonusRateSeparate = getTaxRate(bonusGross / 12.0);
  }
  const totalTaxSeparate = cumulativeTaxPaid + bonusTaxSeparate;
  const totalNetSeparate = totalNetIncomeSalaryPart + (bonusGross - bonusTaxSeparate);

  // -- Calculate for Combined Method --
  // For Combined, we treat the bonus as part of the yearly comprehensive income.
  const yearlyGross = monthlySalary * monthsToCalculate + bonusGross;
  const yearlyDeductions = (monthlyPersonalDed + specialAdditionalDeduction + TAX_THRESHOLD) * monthsToCalculate;
  const yearlyTaxableCombined = Math.max(0, yearlyGross - yearlyDeductions);
  
  const totalTaxCombined = calcTax(yearlyTaxableCombined);
  // The tax attributable to the bonus is the Total Combined Tax minus the Tax already paid on salary.
  const bonusTaxCombinedPart = Math.max(0, totalTaxCombined - cumulativeTaxPaid);
  const totalNetCombined = yearlyGross - (monthlyPersonalDed * monthsToCalculate) - totalTaxCombined;

  // ===== 3. Determine Result based on User Selection =====
  const isCombined = bonusTaxMethod === 'combined';
  
  const selectedBonusTax = isCombined ? bonusTaxCombinedPart : bonusTaxSeparate;
  const selectedBonusNet = bonusGross - selectedBonusTax;
  // For combined, the rate isn't a single simple tier, but we can assume 0 for display or use "-" logic in UI
  const selectedBonusRate = isCombined ? 0 : bonusRateSeparate;
  
  const selectedTotalTax = isCombined ? totalTaxCombined : totalTaxSeparate;
  const selectedTotalNet = isCombined ? totalNetCombined : totalNetSeparate;

  // ===== 4. Optimization Comparison =====
  // Compare Separate vs Combined to see which gives higher Net Income
  const optimalMethod = totalNetSeparate >= totalNetCombined ? 'separate' : 'combined';
  const diffAmount = Math.abs(totalNetSeparate - totalNetCombined);

  // ===== 5. Return Data =====
  const yearTotalSocial = monthlyPersonalDed * monthsToCalculate;
  const yearTotalHousing = monthlyHousingFundOnly * monthsToCalculate;

  return {
    monthlyData,
    bonus: {
      gross: bonusGross,
      tax: selectedBonusTax,
      net: selectedBonusNet,
      rate: selectedBonusRate
    },
    yearly: {
      totalGross: yearlyGross,
      totalNet: selectedTotalNet,
      totalTax: selectedTotalTax,
      totalSocial: yearTotalSocial,
      totalHousingFund: yearTotalHousing,
      totalSocialCompanyEstimate: yearTotalSocial * 2 // Rough estimate
    },
    comparison: {
      currentMethod: bonusTaxMethod,
      optimalMethod: optimalMethod,
      diffAmount: diffAmount,
      separateNet: totalNetSeparate,
      combinedNet: totalNetCombined
    }
  };
};