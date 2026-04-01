import Badge from '../common/Badge';
import Card from '../common/Card';
import { formatCurrency, getPercentageChange } from '../../utils/helpers';

/**
 * SummaryCard Component - Display key financial metrics
 */
const SummaryCard = ({ icon: Icon, label, value, change, percentage = false }) => {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const badgeVariant = isPositive ? 'success' : 'danger';

  return (
    <Card className="animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 font-dm-sans mb-2">{label}</p>
          <p className="text-3xl font-syne font-bold text-white mb-4">{percentage ? value : formatCurrency(value)}</p>
          <div className="flex items-center gap-2">
            <Badge variant={badgeVariant} size="sm">
              {isPositive ? '+' : ''}{change}%
            </Badge>
            <span className={`text-xs font-dm-sans ${changeColor}`}>vs last month</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-blue-500/20">
          <Icon size={24} className="text-blue-400" />
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;
