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
        
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                  参考数据 (Reference Data)
                </h3>
                
                {/* 1. Tax Rate Table */}
                <h4 className="font-bold text-gray-800 mb-2 border-l-4 border-indigo-500 pl-2">
                  个人所得税预扣率表一 (2019版)
                </h4>
                <div className="overflow-x-auto mb-6 border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">级数</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">累计预扣预缴应纳税所得额</th>
                        <th className="px-4 py-2 text-right font-medium text-gray-500">预扣率 (%)</th>
                        <th className="px-4 py-2 text-right font-medium text-gray-500">速算扣除数</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr><td>1</td><td>不超过 36,000 元</td><td className="text-right">3</td><td className="text-right">0</td></tr>
                      <tr><td>2</td><td>超过 36,000 元 至 144,000 元</td><td className="text-right">10</td><td className="text-right">2,520</td></tr>
                      <tr><td>3</td><td>超过 144,000 元 至 300,000 元</td><td className="text-right">20</td><td className="text-right">16,920</td></tr>
                      <tr><td>4</td><td>超过 300,000 元 至 420,000 元</td><td className="text-right">25</td><td className="text-right">31,920</td></tr>
                      <tr><td>5</td><td>超过 420,000 元 至 660,000 元</td><td className="text-right">30</td><td className="text-right">52,920</td></tr>
                      <tr><td>6</td><td>超过 660,000 元 至 960,000 元</td><td className="text-right">35</td><td className="text-right">85,920</td></tr>
                      <tr><td>7</td><td>超过 960,000 元</td><td className="text-right">45</td><td className="text-right">181,920</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* 2. Social Security Ratios */}
                <h4 className="font-bold text-gray-800 mb-2 border-l-4 border-green-500 pl-2">
                  五险一金缴纳比例参考
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-2">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>🏠 住房公积金</span>
                    <span className="font-semibold">5% - 12%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>👴 养老保险</span>
                    <span className="font-semibold">8%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>🏥 医疗保险</span>
                    <span className="font-semibold">2%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>💼 失业保险</span>
                    <span className="font-semibold">0.5% - 1%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2 text-gray-400">
                    <span>👷 工伤保险 (个人)</span>
                    <span>不缴费</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>👶 生育保险 (个人)</span>
                    <span>不缴费</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              关闭 (Close)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};