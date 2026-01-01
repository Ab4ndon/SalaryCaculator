import React, { useState } from 'react';
import { SalaryInputs } from '../types';
import { ReferenceTables } from './ReferenceTables';
import { TaxMethodExplanation } from './TaxMethodExplanation';
import { DeductionExplanation } from './DeductionExplanation';
import { SocialSecurityExplanation } from './SocialSecurityExplanation';

interface InputCardProps {
  inputs: SalaryInputs;
  setInputs: React.Dispatch<React.SetStateAction<SalaryInputs>>;
}

export const InputCard: React.FC<InputCardProps> = ({ inputs, setInputs }) => {
  const [showRefModal, setShowRefModal] = useState(false);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [showDeductionModal, setShowDeductionModal] = useState(false);
  const [showSocialSecurityModal, setShowSocialSecurityModal] = useState(false);

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
    <div className="glass-card rounded-xl p-6 mb-6 relative">
      <ReferenceTables isOpen={showRefModal} onClose={() => setShowRefModal(false)} />
      <TaxMethodExplanation isOpen={showMethodModal} onClose={() => setShowMethodModal(false)} />
      <DeductionExplanation isOpen={showDeductionModal} onClose={() => setShowDeductionModal(false)} />
      <SocialSecurityExplanation isOpen={showSocialSecurityModal} onClose={() => setShowSocialSecurityModal(false)} />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="p-2 bg-indigo-100/80 backdrop-blur-sm rounded-lg mr-3 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          薪资计算设置
        </h2>
        <button 
          onClick={() => setShowRefModal(true)}
          className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center font-bold glass-effect px-3 py-1.5 rounded-full transition-all hover:bg-white/90"
        >
          <HelpIcon />
          <span className="ml-1 uppercase">参考税率</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* 基本工资 */}
        <div className="p-4 rounded-xl">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">基本薪资设定</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">月薪金额 (元)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">¥</span>
                <input
                  type="number"
                  name="monthlySalary"
                  value={inputs.monthlySalary}
                  onChange={handleChange}
                  className="glass-input block w-full pl-8 pr-4 sm:text-sm rounded-lg py-2.5"
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
                className="glass-input block w-full sm:text-sm rounded-lg py-2.5 px-4"
              />
            </div>
          </div>
        </div>

        {/* 五险一金 */}
        <div className="p-4 rounded-xl">
          <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-2">五险一金个人比例</h3>
                <button onClick={() => setShowSocialSecurityModal(true)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <HelpIcon />
                </button>
              </div>
              <span className="text-xs font-bold text-white bg-indigo-500 px-3 py-1.5 rounded-full shadow-md">合计 {totalSocialRatio.toFixed(1)}%</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="flex items-center text-xs font-bold text-gray-600 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                公积金
              </label>
              <input type="number" name="housingFundRatio" value={inputs.housingFundRatio} onChange={handleChange} step="0.1" className="glass-input block w-full text-sm rounded-lg py-2 px-2" />
            </div>
            <div>
              <label className="flex items-center text-xs font-bold text-gray-600 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                养老
              </label>
              <input type="number" name="pensionRatio" value={inputs.pensionRatio} onChange={handleChange} step="0.1" className="glass-input block w-full text-sm rounded-lg py-2 px-2" />
            </div>
            <div>
              <label className="flex items-center text-xs font-bold text-gray-600 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                医疗
              </label>
              <input type="number" name="medicalRatio" value={inputs.medicalRatio} onChange={handleChange} step="0.1" className="glass-input block w-full text-sm rounded-lg py-2 px-2" />
            </div>
            <div>
              <label className="flex items-center text-xs font-bold text-gray-600 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                失业
              </label>
              <input type="number" name="unemploymentRatio" value={inputs.unemploymentRatio} onChange={handleChange} step="0.1" className="glass-input block w-full text-sm rounded-lg py-2 px-2" />
            </div>
          </div>
        </div>

        {/* 奖金与扣除 */}
        <div className="p-4 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-1.5">
                <label className="block text-sm font-semibold text-gray-700 mr-2">专项附加扣除/月</label>
                <button onClick={() => setShowDeductionModal(true)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <HelpIcon />
                </button>
              </div>
              <input type="number" name="specialAdditionalDeduction" value={inputs.specialAdditionalDeduction} onChange={handleChange} className="glass-input block w-full text-sm rounded-lg py-2.5 px-4" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">年终奖月数</label>
              <input type="number" name="bonusMonths" value={inputs.bonusMonths} onChange={handleChange} step="0.1" className="glass-input block w-full text-sm rounded-lg py-2.5 px-4" />
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
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${inputs.bonusTaxMethod === 'separate' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200' : 'glass-effect text-gray-700 hover:bg-white/80'}`}
                >
                  单独计税
                </button>
                <button 
                  onClick={() => handleMethodChange('combined')} 
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${inputs.bonusTaxMethod === 'combined' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200' : 'glass-effect text-gray-700 hover:bg-white/80'}`}
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