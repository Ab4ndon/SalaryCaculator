import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { YearlySummary } from '../types';

interface ChartsProps {
  yearly: YearlySummary;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label if percentage is significant (> 3%) to avoid clutter
  if (percent < 0.03) return null;

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central" 
      className="text-sm font-bold pointer-events-none drop-shadow-md"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const Charts: React.FC<ChartsProps> = ({ yearly }) => {
  const data = [
    { name: '到手收入', value: yearly.totalNet, color: '#10B981' }, // Emerald 500
    { name: '个人个税', value: yearly.totalTax, color: '#EF4444' }, // Red 500
    { name: '五险一金', value: yearly.totalSocial, color: '#F59E0B' }, // Amber 500
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col items-center">
      <h3 className="text-lg font-bold text-gray-800 mb-4 w-full text-left">全年收入去向分布</h3>
      {/* Increased height to h-80 (320px) to prevent clipping of the larger ring */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={60} // Adjusted for better proportions
              outerRadius={110} // Adjusted to fit within h-80
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `¥${value.toFixed(2)}`}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle"/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-sm text-gray-500 mt-2 text-center">
        * 基于税前总收入: ¥{yearly.totalGross.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
};