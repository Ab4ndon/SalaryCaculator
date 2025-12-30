import React, { useState } from 'react';
import { SalaryInputs } from '../types';
import { ReferenceTables } from './ReferenceTables';
import { TaxMethodExplanation } from './TaxMethodExplanation';
import { DeductionExplanation } from './DeductionExplanation';

interface InputCardProps {
  inputs: SalaryInputs;
  setInputs: React.Dispatch<React.SetStateAction<SalaryInputs>>;
}

export const InputCard: React.FC<InputCardProps> = ({ inputs, setInputs }) => {
  const [showRefModal, setShowRefModal] = useState(false);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [showDeductionModal, setShowDeductionModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleMethodChange = (method: 'separate' | 'combined') => {
    setInputs(prev => ({
      ...prev,
      bonusTaxMethod: method
    }));
  };

  const totalSocialRatio = inputs.housingFundRatio + inputs.pensionRatio + inputs.medicalRatio + inputs.unemploymentRatio;

  // Shared icon style for consistency - Outline Question Mark Circle
  const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative">
      <ReferenceTables isOpen={showRefModal} onClose={() => setShowRefModal(false)} />
      <TaxMethodExplanation isOpen={showMethodModal} onClose={() => setShowMethodModal(false)} />
      <DeductionExplanation isOpen={showDeductionModal} onClose={() => setShowDeductionModal(false)} />
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          薪资设置
        </h2>
        <button 
          onClick={() => setShowRefModal(true)}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center font-medium bg-indigo-50 px-3 py-1 rounded-full transition-colors"
        >
          <HelpIcon />
          <span className="ml-1">查看参考税率</span>
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Section 1: Base Salary */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">基本收入 (Base Income)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">税前月薪 (元)</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">¥</span>
                </div>
                <input
                  type="number"
                  name="monthlySalary"
                  value={inputs.monthlySalary}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">基本工资月数</label>
              <input
                type="number"
                name="baseMonths"
                value={inputs.baseMonths}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
              />
              <p className="mt-1 text-xs text-gray-500">通常为 12 个月</p>
            </div>
          </div>
        </div>

        {/* Section 2: Social Security & Housing Fund */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
           <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">五险一金个人比例</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">总计: {totalSocialRatio.toFixed(1)}%</span>
           </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Housing Fund */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">🏠 住房公积金 (%)</label>
              <input
                type="number"
                name="housingFundRatio"
                value={inputs.housingFundRatio}
                onChange={handleChange}
                step="0.1"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
              />
              <p className="mt-1 text-xs text-gray-500">通常 5% - 12%</p>
            </div>
             {/* Pension */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">👴 养老保险 (%)</label>
              <input
                type="number"
                name="pensionRatio"
                value={inputs.pensionRatio}
                onChange={handleChange}
                step="0.1"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
              />
               <p className="mt-1 text-xs text-gray-500">通常 8%</p>
            </div>
             {/* Medical */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🏥 医疗保险 (%)</label>
              <input
                type="number"
                name="medicalRatio"
                value={inputs.medicalRatio}
                onChange={handleChange}
                step="0.1"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
              />
            </div>
             {/* Unemployment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">💼 失业保险 (%)</label>
              <input
                type="number"
                name="unemploymentRatio"
                value={inputs.unemploymentRatio}
                onChange={handleChange}
                step="0.1"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Deductions & Bonus */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">扣除项 & 年终奖</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Special Deduction */}
            <div>
              <div className="flex items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 mr-1">专项附加扣除 (每月)</label>
                <button 
                  onClick={() => setShowDeductionModal(true)}
                  className="text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none"
                  title="查看扣除项说明"
                >
                  <HelpIcon />
                </button>
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">¥</span>
                </div>
                <input
                  type="number"
                  name="specialAdditionalDeduction"
                  value={inputs.specialAdditionalDeduction}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
                />
              </div>
            </div>

             {/* Bonus Months */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">年终奖月数</label>
              <div className="relative rounded-md shadow-sm">
                 <input
                  type="number"
                  name="bonusMonths"
                  value={inputs.bonusMonths}
                  onChange={handleChange}
                  step="0.1"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
                />
                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">个月</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">例如: 2个月 (即14薪)</p>
            </div>

            {/* Bonus Tax Method */}
            <div className="md:col-span-2 mt-2">
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mr-2">年终奖计税方式</label>
                <button 
                  onClick={() => setShowMethodModal(true)}
                  className="text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none"
                  title="点击查看计税方式说明"
                >
                  <HelpIcon />
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleMethodChange('separate')}
                  className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    inputs.bonusTaxMethod === 'separate'
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  单独计税
                </button>
                <button
                  onClick={() => handleMethodChange('combined')}
                  className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    inputs.bonusTaxMethod === 'combined'
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  合并计税
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};