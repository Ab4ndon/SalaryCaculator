import React from 'react';

interface TaxMethodExplanationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaxMethodExplanation: React.FC<TaxMethodExplanationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4" id="modal-title">
              年终奖计税方式说明
            </h3>
            
            <div className="space-y-6 text-sm text-gray-600">
              
              {/* Concept Definitions */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="mb-2">
                  <span className="font-bold text-blue-700">👉 单独计税：</span> 
                  应纳税额 = 年终奖 × 适用税率 - 速算扣除数。
                  <br/>
                  <span className="text-xs text-gray-500">* 适用税率是根据年终奖除以12个月后的商数确定的。</span>
                </p>
                <p>
                  <span className="font-bold text-blue-700">👉 合并计税：</span> 
                  将年终奖并入全年综合所得，按照“个人所得税预扣税表”计税。
                </p>
              </div>

              {/* Examples */}
              <div className="border-t pt-4">
                <h4 className="font-bold text-gray-800 mb-3">举例分析</h4>
                
                {/* Case 1 */}
                <div className="mb-4">
                  <p className="font-bold text-gray-800 mb-1">案例一：工资较高，年终奖适中</p>
                  <p className="mb-1">假设小李扣除各项后，全年应纳税所得额15万元，年终奖3万元：</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>合并计税：</strong> (15万+3万) × 20% - 16920 = <span className="text-red-600">19080元</span></li>
                    <li><strong>单独计税：</strong> (15万×20% - 16920) + (3万×3% - 0) = <span className="text-green-600 font-bold">13980元</span></li>
                  </ul>
                  <p className="text-green-600 text-xs mt-1">➡ 这种情况下，单独计税少纳税 5100元。</p>
                </div>

                {/* Case 2 */}
                <div>
                  <p className="font-bold text-gray-800 mb-1">案例二：工资较低，年终奖很高</p>
                  <p className="mb-1">假设小王扣除各项后，全年应纳税所得额10万元，年终奖15万元：</p>
                   <ul className="list-disc pl-5 space-y-1">
                    <li><strong>合并计税：</strong> (10万+15万) × 20% - 16920 = <span className="text-green-600 font-bold">33080元</span></li>
                    <li><strong>单独计税：</strong> (10万×10% - 2520) + (15万×20% - 1410) = <span className="text-red-600">36070元</span></li>
                  </ul>
                   <p className="text-green-600 text-xs mt-1">➡ 这种情况下，合并计税少纳税 2990元。</p>
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
              我知道了
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};