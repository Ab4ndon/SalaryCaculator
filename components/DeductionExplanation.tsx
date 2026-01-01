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
        
        {/* Backdrop with blur */}
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom glass-card rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-white/30">
          <div className="px-4 pt-6 pb-4 sm:p-8 sm:pb-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100/80 backdrop-blur-sm rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                专项附加扣除项目说明
              </h3>
            </div>
            
            <div className="glass-effect rounded-lg p-4 mb-6 text-sm text-gray-700">
              <p>以下是可以税前扣除的7个专项附加项目，请根据个人实际情况填写每月的总扣除额。</p>
            </div>

            <div className="overflow-x-auto glass-effect rounded-xl border border-white/40">
              <table className="min-w-full divide-y divide-gray-200/50 text-sm">
                <thead className="glass-effect">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">扣除项目</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">扣除标准 (元/月)</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden sm:table-cell">说明</th>
                  </tr>
                </thead>
                <tbody className="bg-white/30 divide-y divide-gray-200/50">
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="font-medium text-gray-900">3岁以下婴幼儿照护</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">2000</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">每名婴幼儿</td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="font-medium text-gray-900">子女教育</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">2000</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">每名子女</td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-gray-900">赡养老人</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">3000</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">独生子女3000；非独生子女分摊，最高不超过3000</td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="font-medium text-gray-900">住房租金</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">1500 / 1100 / 800</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">直辖市/省会等1500；其他依人口而定</td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-gray-900">住房贷款利息</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">1000</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">首套住房贷款期间</td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="font-medium text-gray-900">继续教育</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-indigo-600 font-bold">400 / 3600(年)</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">学历教育400/月；职业资格3600/年</td>
                  </tr>
                  <tr className="hover:bg-white/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="font-medium text-gray-900">大病医疗</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 italic">限额内据实扣除</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">医保目录内自付超过1.5万部分，每年限额8万（年底汇算清缴时扣除）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200/50">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center rounded-xl shadow-md px-6 py-3 bg-indigo-600 text-base font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all sm:ml-3 sm:w-auto sm:text-sm"
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