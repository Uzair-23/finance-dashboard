import { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { getCategorySpending } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../data/constants';

/**
 * Custom tooltip for the pie chart
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const total = payload[0].payload._total || 0;
    const percentage = total > 0 ? ((payload[0].value / total) * 100).toFixed(1) : 0;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    
    return (
      <div className={`bg-slate-800 border border-slate-700 rounded px-2 sm:px-3 py-1.5 sm:py-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
        <p className="text-slate-300">{payload[0].name}</p>
        <p className="text-blue-400 font-dm-sans font-semibold">
          ₹{(payload[0].value / 1000).toFixed(0)}k ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

/**
 * SpendingPieChart Component - Pie chart showing spending by category with optimizations
 */
const SpendingPieChart = ({ transactions }) => {
  const data = useMemo(() => {
    const categoryData = getCategorySpending(transactions);
    const total = categoryData.reduce((sum, item) => sum + item.amount, 0);
    return categoryData.map(item => ({
      ...item,
      _total: total,
    }));
  }, [transactions]);

  // Responsive dimensions based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const chartHeight = isMobile ? 180 : 280;
  const innerRadius = isMobile ? 35 : 50;
  const outerRadius = isMobile ? 55 : 80;

  return (
    <Card className="animate-fade-in-up overflow-hidden">
      <h3 className="text-base sm:text-lg font-syne font-bold text-white mb-3 sm:mb-6">Spending Breakdown</h3>
      {data.length > 0 ? (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                dataKey="amount"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category] || '#64748b'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Custom Legend for Mobile */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] || '#64748b' }}
                />
                <span className="text-xs text-slate-300 font-dm-sans whitespace-nowrap">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-slate-400" style={{ height: `${chartHeight}px` }}>
          No expense data available
        </div>
      )}
    </Card>
  );
};

export default SpendingPieChart;
