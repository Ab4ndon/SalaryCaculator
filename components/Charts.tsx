import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { YearlySummary } from '../types';

interface ChartsProps {
  yearly: YearlySummary;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  // 计算圆环正中心的位置
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // 占比太小时不显示标签，避免重叠
  if (percent < 0.03) return null;

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central" 
      className="text-sm font-bold pointer-events-none"
      style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const Charts: React.FC<ChartsProps> = ({ yearly }) => {
  const data = [
    { name: '到手收入', value: yearly.totalNet, color: '#10B981' }, // 翠绿色
    { name: '个人个税', value: yearly.totalTax, color: '#EF4444' }, // 红色
    { name: '五险一金', value: yearly.totalSocial, color: '#F59E0B' }, // 琥珀色
  ];

  return (
    <div className="glass-card rounded-xl p-6 mb-6 flex flex-col items-center">
      <div className="flex items-center w-full mb-2">
        <div className="w-1 h-6 bg-indigo-600 rounded-full mr-3"></div>
        <h3 className="text-lg font-bold text-gray-800">全年收入去向分布</h3>
      </div>
      
      {/* 进一步增加高度至 h-96 (384px)，彻底解决截断问题 */}
      <div className="w-full h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={70}  // 增加内径，使圆环更宽厚
              outerRadius={125} // 增加外径，填充空间
              paddingAngle={3}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={3} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `¥${value.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={40} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 w-full glass-effect p-4 rounded-lg border-2 border-indigo-200/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="text-xs font-semibold text-gray-700">税前总收入统计基数</span>
          <span className="font-mono text-lg sm:text-xl font-bold text-indigo-600 bg-white/80 px-4 py-2 rounded-lg shadow-sm border border-indigo-200">
            ¥{yearly.totalGross.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>
    </div>
  );
};