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

  // 统一的帮助图标组件
  const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative border border-gray-100">
      <ReferenceTables isOpen={showRefModal} onClose={() => setShowRefModal(false)} />
      <TaxMethodExplanation isOpen={showMethodModal} onClose={() => setShowMethodModal(false)} />
      <DeductionExplanation isOpen={showDeductionModal} onClose={() => setShowDeductionModal(false)} />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="p-2 bg-indigo-100 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          薪资计算设置
        </h2>
        <button 
          onClick={() => setShowRefModal(true)}
          className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center font-bold bg-indigo-50 px-3 py-1.5 rounded-full transition-all border border-indigo-100 hover:shadow-sm"
        >
          <HelpIcon />
          <span className="ml-1 uppercase">参考税率</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* 基本工资 */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">基本薪资设定</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">月薪金额 (元)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">¥</span>
                <input
                  type="number"
                  name="monthlySalary"
                  value={inputs.monthlySalary}
                  onChange={handleChange}
                  className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 pr-4 sm:text-sm border-gray-300 rounded-lg py-2.5 border"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">发薪月数</label>
              <input
                type="number"
                name="baseMonths"
                value={inputs.baseMonths}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border px-4"
              />
            </div>
          </div>
        </div>

        {/* 五险一金 */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">五险一金个人比例</h3>
              <span className="text-xs font-bold text-white bg-indigo-500 px-2 py-1 rounded">合计 {totalSocialRatio.toFixed(1)}%</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">🏠 公积金</label>
              <input type="number" name="housingFundRatio" value={inputs.housingFundRatio} onChange={handleChange} step="0.1" className="block w-full text-sm border-gray-300 rounded-lg py-2 border px-2 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">👴 养老</label>
              <input type="number" name="pensionRatio" value={inputs.pensionRatio} onChange={handleChange} step="0.1" className="block w-full text-sm border-gray-300 rounded-lg py-2 border px-2 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">🏥 医疗</label>
              <input type="number" name="medicalRatio" value={inputs.medicalRatio} onChange={handleChange} step="0.1" className="block w-full text-sm border-gray-300 rounded-lg py-2 border px-2 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">💼 失业</label>
              <input type="number" name="unemploymentRatio" value={inputs.unemploymentRatio} onChange={handleChange} step="0.1" className="block w-full text-sm border-gray-300 rounded-lg py-2 border px-2 focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        {/* 奖金与扣除 */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-1.5">
                <label className="block text-sm font-semibold text-gray-700 mr-2">专项附加扣除/月</label>
                <button onClick={() => setShowDeductionModal(true)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <HelpIcon />
                </button>
              </div>
              <input type="number" name="specialAdditionalDeduction" value={inputs.specialAdditionalDeduction} onChange={handleChange} className="focus:ring-2 focus:ring-indigo-500 block w-full text-sm border-gray-300 rounded-lg py-2.5 border px-4" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">年终奖月数</label>
              <input type="number" name="bonusMonths" value={inputs.bonusMonths} onChange={handleChange} step="0.1" className="focus:ring-2 focus:ring-indigo-500 block w-full text-sm border-gray-300 rounded-lg py-2.5 border px-4" />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center mb-3">
                <label className="block text-sm font-semibold text-gray-700 mr-2">年终奖计税方式</label>
                <button onClick={() => setShowMethodModal(true)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <HelpIcon />
                </button>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleMethodChange('separate')} 
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${inputs.bonusTaxMethod === 'separate' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                >
                  单独计税
                </button>
                <button 
                  onClick={() => handleMethodChange('combined')} 
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${inputs.bonusTaxMethod === 'combined' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
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