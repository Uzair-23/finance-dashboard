import Card from '../common/Card';
import { formatCurrency } from '../../utils/helpers';

/**
 * InsightCard Component - Display key financial insights
 */
const InsightCard = ({ icon: Icon, title, value, subtext, trend }) => {
  return (
    <Card className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-slate-400 font-dm-sans mb-2">{title}</p>
          <p className="text-lg sm:text-2xl font-syne font-bold text-white mb-2 truncate">{value}</p>
          {subtext && (
            <p className="text-xs text-slate-400 font-dm-sans truncate">{subtext}</p>
          )}
          {trend && (
            <p className={`text-xs font-dm-sans font-semibold mt-2 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.text}
            </p>
          )}
        </div>
        <div className="p-2 sm:p-3 rounded-lg bg-blue-500/20 shrink-0">
          <Icon size={20} className="sm:w-6 sm:h-6 text-blue-400" />
        </div>
      </div>
    </Card>
  );
};

export default InsightCard;
