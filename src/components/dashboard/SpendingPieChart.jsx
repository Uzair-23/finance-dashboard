import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { getCategorySpending } from '../../utils/helpers';

/**
 * Color palette for categories
 */
const COLORS = {
  Food: '#f97316',
  Transport: '#3b82f6',
  Shopping: '#ec4899',
  Entertainment: '#a855f7',
  Salary: '#10b981',
  Rent: '#64748b',
  Healthcare: '#ef4444',
  Utilities: '#eab308',
  Freelance: '#06b6d4',
};

/**
 * Custom tooltip for the pie chart
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm">
        <p className="text-slate-300">{payload[0].name}</p>
        <p className="text-blue-400 font-dm-sans font-semibold">
          ₹{(payload[0].value / 1000).toFixed(0)}k
        </p>
      </div>
    );
  }
  return null;
};

/**
 * SpendingPieChart Component - Pie chart showing spending by category
 */
const SpendingPieChart = ({ transactions }) => {
  const data = getCategorySpending(transactions);

  return (
    <Card className="animate-fade-in-up">
      <h3 className="text-lg font-syne font-bold text-white mb-6">Spending Breakdown</h3>
      {data.length > 0 ? (
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
                <Cell key={`cell-${index}`} fill={COLORS[entry.category] || '#64748b'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => entry.payload.category}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-slate-400">
          No expense data available
        </div>
      )}
    </Card>
  );
};

export default SpendingPieChart;
