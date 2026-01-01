import React from 'react';

interface ReferenceTablesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceTables: React.FC<ReferenceTablesProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop with blur */}
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom glass-card rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-white/30">
          <div className="px-4 pt-6 pb-4 sm:p-8 sm:pb-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-indigo-100/80 backdrop-blur-sm rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                    参考数据
                  </h3>
                </div>
                
                {/* 1. Tax Rate Table */}
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className="w-1 h-5 bg-indigo-500 rounded-full mr-2"></div>
                    <h4 className="font-bold text-gray-800 text-base">
                      个人所得税预扣率表一 (2019版)
                    </h4>
                  </div>
                  <div className="overflow-x-auto glass-effect rounded-xl border border-white/40">
                    <table className="min-w-full divide-y divide-gray-200/50 text-sm">
                      <thead className="glass-effect">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">级数</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">累计预扣预缴应纳税所得额</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">预扣率 (%)</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">速算扣除数</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white/30 divide-y divide-gray-200/50">
                        <tr className="hover:bg-white/50 transition-colors"><td className="px-4 py-3 font-medium text-gray-900">1</td><td className="px-4 py-3 text-gray-700">不超过 36,000 元</td><td className="px-4 py-3 text-right font-semibold text-indigo-600">3</td><td className="px-4 py-3 text-right text-gray-600">0</td></tr>
                        <tr className="hover:bg-white/50 transition-colors"><td className="px-4 py-3 font-medium text-gray-900">2</td><td className="px-4 py-3 text-gray-700">超过 36,000 元 至 144,000 元</td><td className="px-4 py-3 text-right font-semibold text-indigo-600">10</td><td className="px-4 py-3 text-right text-gray-600">2,520</td></tr>
                        <tr className="hover:bg-white/50 transition-colors"><td className="px-4 py-3 font-medium text-gray-900">3</td><td className="px-4 py-3 text-gray-700">超过 144,000 元 至 300,000 元</td><td className="px-4 py-3 text-right font-semibold text-indigo-600">20</td><td className="px-4 py-3 text-right text-gray-600">16,920</td></tr>
                        <tr className="hover:bg-white/50 transition-colors"><td className="px-4 py-3 font-medium text-gray-900">4</td><td className="px-4 py-3 text-gray-700">超过 300,000 元 至 420,000 元</td><td className="px-4 py-3 text-right font-semibold text-indigo-600">25</td><td className="px-4 py-3 text-right text-gray-600">31,920</td></tr>
                        <tr className="hover:bg-white/50 transition-colors"><td className="px-4 py-3 font-medium text-gray-900">5</td><td className="px-4 py-3 text-gray-700">超过 420,000 元 至 660,000 元</td><td className="px-4 py-3 text-right font-semibold text-indigo-600">30</td><td className="px-4 py-3 text-right text-gray-600">52,920</td></tr>
                        <tr className="hover:bg-white/50 transition-colors"><td className="px-4 py-3 font-medium text-gray-900">6</td><td className="px-4 py-3 text-gray-700">超过 660,000 元 至 960,000 元</td><td className="px-4 py-3 text-right font-semibold text-indigo-600">35</td><td className="px-4 py-3 text-right text-gray-600">85,920</td></tr>
                        <tr className="hover:bg-white/50 transition-colors"><td className="px-4 py-3 font-medium text-gray-900">7</td><td className="px-4 py-3 text-gray-700">超过 960,000 元</td><td className="px-4 py-3 text-right font-semibold text-indigo-600">45</td><td className="px-4 py-3 text-right text-gray-600">181,920</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200/50">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center rounded-xl shadow-md px-6 py-3 bg-indigo-600 text-base font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};