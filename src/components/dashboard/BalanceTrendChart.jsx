import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { calculateBalanceTrend } from '../../utils/helpers';

/**
 * Custom tooltip for the balance trend chart
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm">
        <p className="text-slate-300">{label}</p>
        <p className="text-green-400 font-dm-sans font-semibold">
          ₹{(payload[0].value / 1000).toFixed(0)}k
        </p>
      </div>
    );
  }
  return null;
};

/**
 * BalanceTrendChart Component - Line chart showing balance over time
 */
const BalanceTrendChart = ({ transactions }) => {
  const data = calculateBalanceTrend(transactions);

  const formatYAxis = (value) => `₹${(value / 1000).toFixed(0)}k`;

  return (
    <Card className="animate-fade-in-up">
      <h3 className="text-lg font-syne font-bold text-white mb-6">Balance Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BalanceTrendChart;
