import React from 'react';

interface DeductionExplanationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeductionExplanation: React.FC<DeductionExplanationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4" id="modal-title">
              专项附加扣除项目说明 (2024标准)
            </h3>
            
            <div className="text-sm text-gray-600 mb-4">
              <p>以下是可以税前扣除的7个专项附加项目，请根据个人实际情况填写每月的总扣除额。</p>
            </div>

            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">扣除项目</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">扣除标准 (元/月)</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-500 hidden sm:table-cell">说明</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">👶 3岁以下婴幼儿照护</td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">2000</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">每名婴幼儿</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">🎒 子女教育</td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">2000</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">每名子女</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">👴 赡养老人</td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">3000</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">独生子女3000；非独生子女分摊，最高不超过3000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">🏠 住房租金</td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">1500 / 1100 / 800</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">直辖市/省会等1500；其他依人口而定</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">🏦 住房贷款利息</td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">1000</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">首套住房贷款期间</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">🎓 继续教育</td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">400 / 3600(年)</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">学历教育400/月；职业资格3600/年</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">🏥 大病医疗</td>
                    <td className="px-4 py-3 text-gray-500 italic">限额内据实扣除</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">医保目录内自付超过1.5万部分，每年限额8万（年底汇算清缴时扣除）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              我知道了
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};