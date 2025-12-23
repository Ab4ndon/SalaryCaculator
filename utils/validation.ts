import { SalaryInputs } from '../types';
import { INPUT_LIMITS, SOCIAL_RATIO_RANGES, SOCIAL_BASE_LIMITS } from './constants';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * 验证薪资输入
 */
export const validateSalaryInputs = (inputs: SalaryInputs): ValidationError[] => {
  const errors: ValidationError[] = [];

  // 验证月薪
  if (inputs.monthlySalary < INPUT_LIMITS.monthlySalary.min) {
    errors.push({
      field: 'monthlySalary',
      message: `月薪不能小于 ${INPUT_LIMITS.monthlySalary.min} 元`,
    });
  }
  if (inputs.monthlySalary > INPUT_LIMITS.monthlySalary.max) {
    errors.push({
      field: 'monthlySalary',
      message: `月薪不能大于 ${INPUT_LIMITS.monthlySalary.max.toLocaleString()} 元`,
    });
  }

  // 验证基本工资月数
  if (inputs.baseMonths < INPUT_LIMITS.baseMonths.min || inputs.baseMonths > INPUT_LIMITS.baseMonths.max) {
    errors.push({
      field: 'baseMonths',
      message: `基本工资月数应在 ${INPUT_LIMITS.baseMonths.min}-${INPUT_LIMITS.baseMonths.max} 之间`,
    });
  }

  // 验证年终奖月数
  if (inputs.bonusMonths < INPUT_LIMITS.bonusMonths.min || inputs.bonusMonths > INPUT_LIMITS.bonusMonths.max) {
    errors.push({
      field: 'bonusMonths',
      message: `年终奖月数应在 ${INPUT_LIMITS.bonusMonths.min}-${INPUT_LIMITS.bonusMonths.max} 之间`,
    });
  }

  // 验证社保比例
  if (
    inputs.housingFundRatio < SOCIAL_RATIO_RANGES.housingFund.min ||
    inputs.housingFundRatio > SOCIAL_RATIO_RANGES.housingFund.max
  ) {
    errors.push({
      field: 'housingFundRatio',
      message: `住房公积金比例应在 ${SOCIAL_RATIO_RANGES.housingFund.min}%-${SOCIAL_RATIO_RANGES.housingFund.max}% 之间`,
    });
  }

  if (
    inputs.pensionRatio < SOCIAL_RATIO_RANGES.pension.min ||
    inputs.pensionRatio > SOCIAL_RATIO_RANGES.pension.max
  ) {
    errors.push({
      field: 'pensionRatio',
      message: `养老保险比例应为 ${SOCIAL_RATIO_RANGES.pension.default}%`,
    });
  }

  if (
    inputs.medicalRatio < SOCIAL_RATIO_RANGES.medical.min ||
    inputs.medicalRatio > SOCIAL_RATIO_RANGES.medical.max
  ) {
    errors.push({
      field: 'medicalRatio',
      message: `医疗保险比例应为 ${SOCIAL_RATIO_RANGES.medical.default}%`,
    });
  }

  if (
    inputs.unemploymentRatio < SOCIAL_RATIO_RANGES.unemployment.min ||
    inputs.unemploymentRatio > SOCIAL_RATIO_RANGES.unemployment.max
  ) {
    errors.push({
      field: 'unemploymentRatio',
      message: `失业保险比例应在 ${SOCIAL_RATIO_RANGES.unemployment.min}%-${SOCIAL_RATIO_RANGES.unemployment.max}% 之间`,
    });
  }

  // 验证专项附加扣除
  if (inputs.specialAdditionalDeduction < INPUT_LIMITS.specialAdditionalDeduction.min) {
    errors.push({
      field: 'specialAdditionalDeduction',
      message: `专项附加扣除不能小于 ${INPUT_LIMITS.specialAdditionalDeduction.min}`,
    });
  }
  if (inputs.specialAdditionalDeduction > INPUT_LIMITS.specialAdditionalDeduction.max) {
    errors.push({
      field: 'specialAdditionalDeduction',
      message: `专项附加扣除不能大于 ${INPUT_LIMITS.specialAdditionalDeduction.max.toLocaleString()}`,
    });
  }

  return errors;
};

/**
 * 规范化输入值（确保在合理范围内）
 */
export const normalizeInput = (field: keyof SalaryInputs, value: number): number => {
  switch (field) {
    case 'monthlySalary':
      return Math.max(INPUT_LIMITS.monthlySalary.min, Math.min(INPUT_LIMITS.monthlySalary.max, value));
    case 'baseMonths':
      return Math.max(INPUT_LIMITS.baseMonths.min, Math.min(INPUT_LIMITS.baseMonths.max, Math.round(value)));
    case 'bonusMonths':
      return Math.max(INPUT_LIMITS.bonusMonths.min, Math.min(INPUT_LIMITS.bonusMonths.max, value));
    case 'housingFundRatio':
      return Math.max(
        SOCIAL_RATIO_RANGES.housingFund.min,
        Math.min(SOCIAL_RATIO_RANGES.housingFund.max, value)
      );
    case 'pensionRatio':
      return Math.max(
        SOCIAL_RATIO_RANGES.pension.min,
        Math.min(SOCIAL_RATIO_RANGES.pension.max, value)
      );
    case 'medicalRatio':
      return Math.max(
        SOCIAL_RATIO_RANGES.medical.min,
        Math.min(SOCIAL_RATIO_RANGES.medical.max, value)
      );
    case 'unemploymentRatio':
      return Math.max(
        SOCIAL_RATIO_RANGES.unemployment.min,
        Math.min(SOCIAL_RATIO_RANGES.unemployment.max, value)
      );
    case 'specialAdditionalDeduction':
      return Math.max(
        INPUT_LIMITS.specialAdditionalDeduction.min,
        Math.min(INPUT_LIMITS.specialAdditionalDeduction.max, value)
      );
    default:
      return value;
  }
};

/**
 * 计算实际社保缴费基数（考虑上下限）
 */
export const calculateSocialBase = (monthlySalary: number): number => {
  return Math.max(
    SOCIAL_BASE_LIMITS.min,
    Math.min(SOCIAL_BASE_LIMITS.max, monthlySalary)
  );
};

