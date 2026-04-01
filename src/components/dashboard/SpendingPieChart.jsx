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
    return (
      <div className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm">
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

  return (
    <Card className="animate-fade-in-up">
      <h3 className="text-lg font-syne font-bold text-white mb-6">Spending Breakdown</h3>
      {data.length > 0 ? (
        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="amount"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category] || '#64748b'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value, entry) => entry.payload.category}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-slate-400">
          No expense data available
        </div>
      )}
    </Card>
  );
};

export default SpendingPieChart;
