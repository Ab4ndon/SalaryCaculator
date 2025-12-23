import { CalculationResult } from '../types';

/**
 * 导出为 CSV 格式
 */
export const exportToCSV = (data: CalculationResult, filename: string = '薪资计算结果'): void => {
  const { monthlyData, bonus, yearly } = data;
  
  // 构建 CSV 内容
  const headers = ['月份', '税前工资', '五险一金', '累计应纳税所得额', '适用税率', '累计已缴税额', '当月个税', '到手工资'];
  const rows: string[][] = [headers];
  
  // 添加每月数据
  monthlyData.forEach((row) => {
    rows.push([
      `第${row.month}月`,
      row.gross.toFixed(2),
      row.socialDed.toFixed(2),
      row.cumulativeTaxableIncome.toFixed(2),
      `${(row.taxRate * 100).toFixed(0)}%`,
      row.cumulativeTaxPaid.toFixed(2),
      row.monthlyTax.toFixed(2),
      row.netIncome.toFixed(2),
    ]);
  });
  
  // 添加年终奖数据
  if (bonus.gross > 0) {
    rows.push([
      '年终奖',
      bonus.gross.toFixed(2),
      '-',
      '-',
      bonus.rate > 0 ? `${(bonus.rate * 100).toFixed(0)}%` : '-',
      '-',
      bonus.tax.toFixed(2),
      bonus.net.toFixed(2),
    ]);
  }
  
  // 添加汇总数据
  rows.push([]);
  rows.push(['年度汇总', '', '', '', '', '', '', '']);
  rows.push(['税前总收入', yearly.totalGross.toFixed(2), '', '', '', '', '', '']);
  rows.push(['到手总收入', yearly.totalNet.toFixed(2), '', '', '', '', '', '']);
  rows.push(['全年个税', yearly.totalTax.toFixed(2), '', '', '', '', '', '']);
  rows.push(['个人五险一金', yearly.totalSocial.toFixed(2), '', '', '', '', '', '']);
  
  // 转换为 CSV 字符串
  const csvContent = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  
  // 添加 BOM 以支持中文
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 导出为 JSON 格式
 */
export const exportToJSON = (data: CalculationResult, filename: string = '薪资计算结果'): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

