import React, { useState, useEffect } from 'react';
import { SalaryInputs, CalculationResult } from './types';
import { calculateSalary } from './utils/taxCalculator';
import { InputCard } from './components/InputCard';
import { SummaryCards } from './components/SummaryCards';
import { Charts } from './components/Charts';
import { ResultsTable } from './components/ResultsTable';

const App: React.FC = () => {
  // Default State - only monthly salary needs user input
  const [inputs, setInputs] = useState<SalaryInputs>({
    monthlySalary: 0, // User input required
    baseMonths: 12,   // Pre-filled, user can modify
    bonusMonths: 3,   // Pre-filled default
    
    // Pre-filled ratios, user can modify
    housingFundRatio: 12,
    pensionRatio: 8,
    medicalRatio: 2,
    unemploymentRatio: 0.5,
    
    specialAdditionalDeduction: 1500, // Pre-filled, user can modify
    bonusTaxMethod: 'separate'
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    // Only calculate if there are valid inputs
    if (inputs.monthlySalary > 0 && inputs.baseMonths > 0) {
      const calcResult = calculateSalary(inputs);
      setResult(calcResult);
    } else {
      setResult(null);
    }
  }, [inputs]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl drop-shadow-sm">
            薪资计算器
          </h1>
          <p className="mt-2 text-lg text-gray-700 font-medium">
            基于2019年个人所得税法（累计预扣法）
          </p>
        </header>

        <main>
          {!result ? (
            // Initial state: Input card centered
            <div className="flex justify-center">
              <div className="w-full max-w-2xl space-y-6">
                <InputCard inputs={inputs} setInputs={setInputs} />
                <div className="glass-card p-4 rounded-xl border-l-4 border-blue-400">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">计税说明：</strong> 采用累计预扣法。随着累计收入增加，适用税率可能逐月提高（跳档）。
                        <br/>
                        <span className="mt-1 block">
                          年终奖可选择 <strong>单独计税</strong> 或 <strong>合并计税</strong>。系统会自动提示更优方案。
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // After calculation: Two column layout
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* Left Column: Inputs & Charts */}
              <div className="xl:col-span-5 space-y-6">
                <InputCard inputs={inputs} setInputs={setInputs} />
                <Charts yearly={result.yearly} />
                
                <div className="glass-card p-4 rounded-xl border-l-4 border-blue-400">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">计税说明：</strong> 采用累计预扣法。随着累计收入增加，适用税率可能逐月提高（跳档）。
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
              <div className="xl:col-span-7 space-y-6">
                <SummaryCards yearly={result.yearly} comparison={result.comparison} />
                <ResultsTable data={result} />
              </div>

            </div>
          )}
        </main>

        <footer className="mt-12 text-center text-sm text-gray-600 pb-8">
          <p className="glass-effect inline-block px-6 py-3 rounded-full">© {new Date().getFullYear()} 薪资计算器。计算结果仅供参考。</p>
        </footer>
      </div>
    </div>
  );
};

export default App;