import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { YearlySummary } from '../types';

interface ChartsProps {
  yearly: YearlySummary;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  // Put label in the middle of the ring
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.03) return null; // Don't show labels for tiny slices

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central" 
      className="text-sm font-bold pointer-events-none"
      style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const Charts: React.FC<ChartsProps> = ({ yearly }) => {
  const data = [
    { name: '到手收入', value: yearly.totalNet, color: '#10B981' }, // Emerald
    { name: '个人个税', value: yearly.totalTax, color: '#EF4444' }, // Red
    { name: '五险一金', value: yearly.totalSocial, color: '#F59E0B' }, // Amber
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col items-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2 w-full text-left border-l-4 border-indigo-500 pl-3">全年收入去向分布</h3>
      
      {/* Container height increased to h-80 (320px) to prevent clipping of the thicker ring */}
      <div className="w-full h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={65}  // Thicker ring
              outerRadius={115} // Thicker ring, fits safely within 320px height
              paddingAngle={2}
              dataKey="value"
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `¥${value.toLocaleString()}`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-xs text-gray-400 mt-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 italic">
        * 计算基数 (税前总收入): ¥{yearly.totalGross.toLocaleString()}
      </div>
    </div>
  );
};