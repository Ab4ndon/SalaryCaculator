import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { YearlySummary } from '../types';

interface ChartsProps {
  yearly: YearlySummary;
}

export const Charts: React.FC<ChartsProps> = ({ yearly }) => {
  const data = [
    { name: '到手收入 (Net)', value: yearly.totalNet, color: '#10B981' }, // Emerald 500
    { name: '个人个税 (Tax)', value: yearly.totalTax, color: '#EF4444' }, // Red 500
    { name: '五险一金 (Social)', value: yearly.totalSocial, color: '#F59E0B' }, // Amber 500
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col items-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2 w-full text-left">全年收入去向分布</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `¥${value.toFixed(2)}`}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-sm text-gray-500 mt-2 text-center">
        * 基于税前总收入: ¥{yearly.totalGross.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
};