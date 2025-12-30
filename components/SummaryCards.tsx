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

  const netIncomeStr = formatCurrency(yearly.totalNet);
  const totalTaxStr = formatCurrency(yearly.totalTax);
  const totalSocialStr = formatCurrency(yearly.totalSocial);
  
  // Dynamic font size logic to ensure the number fits on one line without truncation
  // Logic: The longer the string, the smaller the font.
  const getFontSizeClass = (len: number) => {
    if (len > 15) return "text-lg sm:text-xl lg:text-2xl"; // Extremely large numbers
    if (len > 12) return "text-xl sm:text-2xl lg:text-3xl"; // Large numbers
    return "text-2xl sm:text-3xl lg:text-4xl"; // Standard
  };

  const netIncomeClass = getFontSizeClass(netIncomeStr.length);
  const taxClass = getFontSizeClass(totalTaxStr.length);
  const socialClass = getFontSizeClass(totalSocialStr.length);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Net Income */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform transition hover:scale-105 sm:col-span-2 lg:col-span-1 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-emerald-100 text-sm font-medium">全年到手总收入</p>
              <h3 className={`${netIncomeClass} font-bold mt-1 whitespace-nowrap tracking-tight transition-all duration-300`} title={netIncomeStr}>
                {netIncomeStr}
              </h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-4 opacity-80 relative z-10">含月薪及年终奖税后</p>
          
          {/* Decorative background element - Clear Smiley Face */}
          <div className="absolute -bottom-4 -right-4 text-emerald-400 opacity-20 pointer-events-none">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
        </div>

        {/* Total Tax */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white transform transition hover:scale-105 relative overflow-hidden">
           <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-red-100 text-sm font-medium">全年缴纳个税</p>
              <h3 className={`${taxClass} font-bold mt-1 whitespace-nowrap tracking-tight transition-all duration-300`} title={totalTaxStr}>
                {totalTaxStr}
              </h3>
            </div>
          </div>
          <p className="text-xs text-red-100 mt-4 opacity-80 relative z-10">
             {comparison?.currentMethod === 'separate' ? '年终奖单独计税' : '年终奖合并计税'}
          </p>

          {/* Decorative background element - Receipt/Percent */}
          <div className="absolute -bottom-4 -right-4 text-red-400 opacity-20 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
          </div>
        </div>

        {/* Social Security */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white transform transition hover:scale-105 relative overflow-hidden">
           <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-amber-100 text-sm font-medium">个人五险一金</p>
              <h3 className={`${socialClass} font-bold mt-1 whitespace-nowrap tracking-tight transition-all duration-300`} title={totalSocialStr}>
                {totalSocialStr}
              </h3>
            </div>
          </div>
          <p className="text-xs text-amber-100 mt-4 opacity-80 relative z-10">账户增加估算: {formatCurrency(yearly.totalSocialCompanyEstimate)}</p>

           {/* Decorative background element - Building */}
          <div className="absolute -bottom-4 -right-4 text-amber-400 opacity-20 pointer-events-none">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
          </div>
        </div>

      </div>
    </div>
  );
};