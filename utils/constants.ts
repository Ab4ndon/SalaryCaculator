/**
 * 税务计算相关常量
 * 基于2019年个人所得税法
 */

// 个税起征点（每月）
export const TAX_THRESHOLD = 5000;

// 综合所得税率表（2019版）
export const TAX_BRACKETS = [
  { max: 36000, rate: 0.03, deduction: 0 },
  { max: 144000, rate: 0.10, deduction: 2520 },
  { max: 300000, rate: 0.20, deduction: 16920 },
  { max: 420000, rate: 0.25, deduction: 31920 },
  { max: 660000, rate: 0.30, deduction: 52920 },
  { max: 960000, rate: 0.35, deduction: 85920 },
  { max: Infinity, rate: 0.45, deduction: 181920 },
] as const;

// 年终奖单独计税税率表
export const BONUS_TAX_BRACKETS = [
  { max: 3000, rate: 0.03, deduction: 0 },
  { max: 12000, rate: 0.10, deduction: 210 },
  { max: 25000, rate: 0.20, deduction: 1410 },
  { max: 35000, rate: 0.25, deduction: 2660 },
  { max: 55000, rate: 0.30, deduction: 4410 },
  { max: 80000, rate: 0.35, deduction: 7160 },
  { max: Infinity, rate: 0.45, deduction: 15160 },
] as const;

// 社保比例范围（个人部分）
export const SOCIAL_RATIO_RANGES = {
  housingFund: { min: 5, max: 12, default: 12 },
  pension: { min: 8, max: 8, default: 8 },
  medical: { min: 2, max: 2, default: 2 },
  unemployment: { min: 0.5, max: 1, default: 0.5 },
} as const;

// 社保基数限制（可根据城市调整，这里使用常见值）
// 2024年北京社保基数：下限 6326元，上限 33891元
export const SOCIAL_BASE_LIMITS = {
  min: 6326,  // 社保基数下限
  max: 33891, // 社保基数上限（可根据实际城市调整）
} as const;

// 输入验证范围
export const INPUT_LIMITS = {
  monthlySalary: { min: 0, max: 1000000 },
  baseMonths: { min: 1, max: 12 },
  bonusMonths: { min: 0, max: 24 },
  specialAdditionalDeduction: { min: 0, max: 100000 },
} as const;

