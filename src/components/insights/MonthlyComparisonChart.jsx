import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { getMonthlyComparison } from '../../utils/helpers';

/**
 * Custom tooltip for the bar chart
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm">
        <p className="text-slate-300">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-dm-sans font-semibold">
            {entry.name}: ₹{(entry.value / 1000).toFixed(0)}k
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * MonthlyComparisonChart Component - Bar chart comparing income vs expense
 */
const MonthlyComparisonChart = ({ transactions }) => {
  const data = getMonthlyComparison(transactions);

  const formatYAxis = (value) => `₹${(value / 1000).toFixed(0)}k`;

  return (
    <Card className="animate-fade-in-up">
      <h3 className="text-lg font-syne font-bold text-white mb-6">Monthly Comparison</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" tickFormatter={formatYAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[350px] flex items-center justify-center text-slate-400">
          No data available
        </div>
      )}
    </Card>
  );
};

export default MonthlyComparisonChart;
