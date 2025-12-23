import React from 'react';
import { YearlySummary, ComparisonResult } from '../types';

interface SummaryCardsProps {
  yearly: YearlySummary;
  comparison?: ComparisonResult;
}

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(val);

export const SummaryCards: React.FC<SummaryCardsProps> = ({ yearly, comparison }) => {
  
  // Check if we need to show a recommendation
  const showRecommendation = comparison && comparison.currentMethod !== comparison.optimalMethod && comparison.diffAmount > 1;

  return (
    <div className="space-y-6 mb-6">
      
      {/* Recommendation Banner */}
      {showRecommendation && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 flex items-start shadow-sm">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="ml-3 w-full">
            <h3 className="text-sm font-bold text-yellow-800">
              💡 节税建议 (Optimization Tip)
            </h3>
            <div className="mt-1 text-sm text-yellow-700">
              <p>
                当前选择 <strong>{comparison.currentMethod === 'separate' ? '单独计税' : '合并计税'}</strong> 不是最优解。
                建议切换为 <strong>{comparison.optimalMethod === 'separate' ? '单独计税' : '合并计税'}</strong>，
                预计每年可多得 <span className="font-bold text-green-600">+{formatCurrency(comparison.diffAmount)}</span>。
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Net Income */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform transition hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 text-sm font-medium">全年到手总收入</p>
              <h3 className="text-3xl font-bold mt-1">{formatCurrency(yearly.totalNet)}</h3>
            </div>
            <div className="p-2 bg-emerald-400 bg-opacity-30 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-4 opacity-80">含月薪及年终奖税后</p>
        </div>

        {/* Total Tax */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">全年缴纳个税</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(yearly.totalTax)}</h3>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
             {comparison?.currentMethod === 'separate' ? '年终奖单独计税' : '年终奖合并计税'}
          </p>
        </div>

        {/* Social Security */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">个人五险一金</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(yearly.totalSocial)}</h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">账户增加估算: {formatCurrency(yearly.totalSocialCompanyEstimate)}</p>
        </div>

      </div>
    </div>
  );
};