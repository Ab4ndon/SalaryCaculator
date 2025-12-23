import { SalaryInputs } from '../types';

const STORAGE_KEY = 'china-salary-calculator-inputs';

/**
 * 保存用户输入到 localStorage
 */
export const saveInputsToStorage = (inputs: SalaryInputs): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  } catch (error) {
    console.warn('无法保存到 localStorage:', error);
  }
};

/**
 * 从 localStorage 加载用户输入
 */
export const loadInputsFromStorage = (): SalaryInputs | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as SalaryInputs;
    }
  } catch (error) {
    console.warn('无法从 localStorage 加载数据:', error);
  }
  return null;
};

/**
 * 清除保存的输入
 */
export const clearStoredInputs = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('无法清除 localStorage:', error);
  }
};

