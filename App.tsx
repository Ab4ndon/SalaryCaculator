import React, { useState, useEffect, useMemo } from 'react';
import { SalaryInputs, CalculationResult } from './types';
import { calculateSalary } from './utils/taxCalculator';
import { InputCard } from './components/InputCard';
import { SummaryCards } from './components/SummaryCards';
import { Charts } from './components/Charts';
import { ResultsTable } from './components/ResultsTable';
import { loadInputsFromStorage, saveInputsToStorage } from './utils/storage';

// 默认输入值
const DEFAULT_INPUTS: SalaryInputs = {
  monthlySalary: 34000,
  baseMonths: 12,
  bonusMonths: 3, // 15 salary total -> 12 base + 3 bonus
  
  // Default Ratios
  housingFundRatio: 12,
  pensionRatio: 8,
  medicalRatio: 2,
  unemploymentRatio: 0.5,
  
  specialAdditionalDeduction: 1500,
  bonusTaxMethod: 'separate'
};

const App: React.FC = () => {
  // 从 localStorage 加载保存的输入，如果没有则使用默认值
  const [inputs, setInputs] = useState<SalaryInputs>(() => {
    const saved = loadInputsFromStorage();
    return saved || DEFAULT_INPUTS;
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  // 使用 useMemo 优化计算性能
  const calcResult = useMemo(() => {
    try {
      return calculateSalary(inputs);
    } catch (error) {
      console.error('计算薪资时出错:', error);
      return null;
    }
  }, [inputs]);

  useEffect(() => {
    setResult(calcResult);
  }, [calcResult]);

  // 保存输入到 localStorage
  useEffect(() => {
    saveInputsToStorage(inputs);
  }, [inputs]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            中国薪资计算器
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Based on 2019 Individual Income Tax Law (Cumulative Withholding)
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Inputs & Charts */}
            <div className="lg:col-span-5 space-y-6">
              <InputCard inputs={inputs} setInputs={setInputs} />
              {result && <Charts yearly={result.yearly} />}
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>计税说明：</strong> 采用累计预扣法。随着累计收入增加，适用税率可能逐月提高（跳档）。
                      <br/>
                      <span className="mt-1 block">
                        年终奖可选择 <strong>单独计税</strong> 或 <strong>合并计税</strong>。系统会自动提示更优方案。
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-7 space-y-6">
              {result && (
                <>
                  <SummaryCards yearly={result.yearly} comparison={result.comparison} />
                  <ResultsTable data={result} />
                </>
              )}
            </div>

          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500 pb-8">
          <p>© {new Date().getFullYear()} China Salary Calculator. Calculations are estimates.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;