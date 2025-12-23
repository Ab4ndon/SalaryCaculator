import React, { useState, useEffect, useRef } from 'react';
import { CalculationResult } from '../types';
import { exportToCSV, exportToJSON } from '../utils/export';

interface ResultsTableProps {
  data: CalculationResult;
}

const formatMoney = (val: number) => val.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatRate = (rate: number) => (rate * 100).toFixed(0) + '%';

export const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  const { monthlyData, bonus } = data;
  const [isDetailed, setIsDetailed] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  const handleExport = (format: 'csv' | 'json') => {
    if (format === 'csv') {
      exportToCSV(data);
    } else {
      exportToJSON(data);
    }
    setShowExportMenu(false);
  };

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };

    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportMenu]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-lg font-bold text-gray-800">每月明细 (Monthly Breakdown)</h3>
        
        <div className="flex items-center space-x-3">
          {/* 导出按钮 */}
          <div className="relative" ref={exportMenuRef}>
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                >
                  📊 导出为 CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                >
                  📄 导出为 JSON
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3 bg-gray-100 p-1 rounded-lg">
           <button
             onClick={() => setIsDetailed(false)}
             className={`px-3 py-1 text-sm rounded-md transition-all ${!isDetailed ? 'bg-white text-indigo-600 shadow-sm font-medium' : 'text-gray-500 hover:text-gray-700'}`}
           >
             简要版
           </button>
           <button
             onClick={() => setIsDetailed(true)}
             className={`px-3 py-1 text-sm rounded-md transition-all ${isDetailed ? 'bg-white text-indigo-600 shadow-sm font-medium' : 'text-gray-500 hover:text-gray-700'}`}
           >
             详细版
           </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">月份</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">税前工资</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">五险一金</th>
              
              {isDetailed && (
                <>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider text-gray-400">累计应纳税所得额</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider text-indigo-600">适用税率</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider text-gray-400">累计已缴税额</th>
                </>
              )}

              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider text-red-500">当月个税</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-bold text-emerald-600 uppercase tracking-wider">到手工资</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthlyData.map((row) => (
              <tr key={row.month} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  第 {row.month} 月
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {formatMoney(row.gross)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {formatMoney(row.socialDed)}
                </td>

                {isDetailed && (
                    <>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400 text-right">
                        {formatMoney(row.cumulativeTaxableIncome)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-indigo-600 text-right font-medium">
                        {formatRate(row.taxRate)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400 text-right">
                        {formatMoney(row.cumulativeTaxPaid)}
                        </td>
                    </>
                )}

                <td className="px-4 py-4 whitespace-nowrap text-sm text-red-500 text-right font-medium">
                  {formatMoney(row.monthlyTax)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-emerald-600 text-right font-bold">
                  {formatMoney(row.netIncome)}
                </td>
              </tr>
            ))}
            
            {/* Bonus Row */}
            {bonus.gross > 0 && (
               <tr className="bg-yellow-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-yellow-800">
                  年终奖
                  <span className='block text-xs font-normal opacity-75'>
                    ({data.comparison.currentMethod === 'separate' ? '单独计税' : '合并计税'})
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-800 text-right font-medium">
                  {formatMoney(bonus.gross)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-800 text-right">
                  -
                </td>

                {isDetailed && (
                    <>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-800 text-right opacity-50">
                            -
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-800 text-right font-medium">
                        {data.comparison.currentMethod === 'separate' ? formatRate(bonus.rate) : '合并累计'}
                        </td>
                         <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-800 text-right opacity-50">
                            -
                        </td>
                    </>
                )}

                <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600 text-right font-bold">
                  {formatMoney(bonus.tax)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-emerald-700 text-right font-bold">
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