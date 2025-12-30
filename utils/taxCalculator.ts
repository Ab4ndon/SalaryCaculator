import { CalculationResult, SalaryInputs, BonusTaxMethod } from '../types';

const TAX_THRESHOLD = 5000;

// Helper to get tax rate based on taxable income
const getTaxRate = (taxable: number): number => {
  if (taxable <= 0) return 0;
  if (taxable <= 36000) return 0.03;
  if (taxable <= 144000) return 0.10;
  if (taxable <= 300000) return 0.20;
  if (taxable <= 420000) return 0.25;
  if (taxable <= 660000) return 0.30;
  if (taxable <= 960000) return 0.35;
  return 0.45;
};

// 综合所得累计税率表 (2019版) - Calculates Tax Amount
const calcTax = (taxable: number): number => {
  if (taxable <= 0) return 0;
  if (taxable <= 36000) return taxable * 0.03;
  if (taxable <= 144000) return taxable * 0.10 - 2520;
  if (taxable <= 300000) return taxable * 0.20 - 16920;
  if (taxable <= 420000) return taxable * 0.25 - 31920;
  if (taxable <= 660000) return taxable * 0.30 - 52920;
  if (taxable <= 960000) return taxable * 0.35 - 85920;
  return taxable * 0.45 - 181920;
};

// 标准年终奖计算方法 (单独计税)：奖金 * 适用税率 - 速算扣除数
const getBonusTaxSeparate = (totalBonus: number): number => {
  const avg = totalBonus / 12.0;
  if (avg <= 3000) return totalBonus * 0.03 - 0;
  if (avg <= 12000) return totalBonus * 0.10 - 210;
  if (avg <= 25000) return totalBonus * 0.20 - 1410;
  if (avg <= 35000) return totalBonus * 0.25 - 2660;
  if (avg <= 55000) return totalBonus * 0.30 - 4410;
  if (avg <= 80000) return totalBonus * 0.35 - 7160;
  return totalBonus * 0.45 - 15160;
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
  
  // Calculate total individual deduction ratio
  const totalRatio = housingFundRatio + pensionRatio + medicalRatio + unemploymentRatio;
  const monthlyPersonalDed = monthlySalary * (totalRatio / 100.0);
  const monthlyHousingFundOnly = monthlySalary * (housingFundRatio / 100.0);

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