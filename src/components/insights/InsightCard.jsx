import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';

/**
 * InsightCard Component - Display key financial insights
 */
const InsightCard = ({ icon: Icon, title, value, subtext, trend }) => {
  return (
    <Card className="animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 font-dm-sans mb-2">{title}</p>
          <p className="text-2xl font-syne font-bold text-white mb-2">{value}</p>
          {subtext && (
            <p className="text-xs text-slate-400 font-dm-sans">{subtext}</p>
          )}
          {trend && (
            <p className={`text-xs font-dm-sans font-semibold mt-2 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.text}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-blue-500/20">
          <Icon size={24} className="text-blue-400" />
        </div>
      </div>
    </Card>
  );
};

export default InsightCard;
