import React, { useState } from 'react';
import { CalculationResult } from '../types';

interface ResultsTableProps {
  data: CalculationResult;
}

const formatMoney = (val: number) => val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatRate = (rate: number) => (rate * 100).toFixed(0) + '%';

export const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  const { monthlyData, bonus } = data;
  const [isDetailed, setIsDetailed] = useState(false);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-lg font-bold text-gray-800">每月明细 (Monthly Breakdown)</h3>
        
        <div className="flex items-center space-x-2 sm:space-x-3 glass-effect p-1 rounded-lg">
           <button
             onClick={() => setIsDetailed(false)}
             className={`px-3 py-1 text-xs sm:text-sm rounded-md transition-all ${!isDetailed ? 'bg-white/90 text-indigo-600 shadow-sm font-medium' : 'text-gray-600 hover:text-gray-800'}`}
           >
             简要版
           </button>
           <button
             onClick={() => setIsDetailed(true)}
             className={`px-3 py-1 text-xs sm:text-sm rounded-md transition-all ${isDetailed ? 'bg-white/90 text-indigo-600 shadow-sm font-medium' : 'text-gray-600 hover:text-gray-800'}`}
           >
             详细版
           </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="glass-effect">
            <tr>
              <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">月份</th>
              <th scope="col" className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">税前工资</th>
              <th scope="col" className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">五险一金</th>
              
              {isDetailed && (
                <>
                    <th scope="col" className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider text-gray-400">累计应纳税</th>
                    <th scope="col" className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider text-indigo-600">税率</th>
                    <th scope="col" className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider text-gray-400">累计已缴</th>
                </>
              )}

              <th scope="col" className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider text-red-500">当月个税</th>
              <th scope="col" className="px-3 sm:px-4 py-3 text-right text-xs font-bold text-emerald-600 uppercase tracking-wider">到手工资</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-200/50">
            {monthlyData.map((row) => (
              <tr key={row.month} className="hover:bg-white/70 transition-colors">
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                  第 {row.month} 月
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-right">
                  {formatMoney(row.gross)}
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-right">
                  {formatMoney(row.socialDed)}
                </td>

                {isDetailed && (
                    <>
                        <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-400 text-right">
                        {formatMoney(row.cumulativeTaxableIncome)}
                        </td>
                        <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-indigo-600 text-right font-medium">
                        {formatRate(row.taxRate)}
                        </td>
                        <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-400 text-right">
                        {formatMoney(row.cumulativeTaxPaid)}
                        </td>
                    </>
                )}

                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-red-500 text-right font-medium">
                  {formatMoney(row.monthlyTax)}
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-emerald-600 text-right font-bold">
                  {formatMoney(row.netIncome)}
                </td>
              </tr>
            ))}
            
            {/* Bonus Row */}
            {bonus.gross > 0 && (
               <tr className="bg-yellow-50">
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-yellow-800">
                  年终奖
                  <span className='block text-xs font-normal opacity-75'>
                    ({data.comparison.currentMethod === 'separate' ? '单独' : '合并'})
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-yellow-800 text-right font-medium">
                  {formatMoney(bonus.gross)}
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-yellow-800 text-right">
                  -
                </td>

                {isDetailed && (
                    <>
                        <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-yellow-800 text-right opacity-50">
                            -
                        </td>
                        <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-yellow-800 text-right font-medium">
                        {data.comparison.currentMethod === 'separate' ? formatRate(bonus.rate) : '合并'}
                        </td>
                         <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-yellow-800 text-right opacity-50">
                            -
                        </td>
                    </>
                )}

                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-red-600 text-right font-bold">
                  {formatMoney(bonus.tax)}
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-emerald-700 text-right font-bold">
                  {formatMoney(bonus.net)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};