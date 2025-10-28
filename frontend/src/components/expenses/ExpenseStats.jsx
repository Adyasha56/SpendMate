import { useIsMobile } from '../../utils/hooks';

const ExpenseStats = ({ stats, totalIncome }) => {
  const isMobile = useIsMobile();

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Food: '🍔',
      Transport: '🚗',
      Entertainment: '🎬',
      Shopping: '🛍️',
      Bills: '💳',
      Health: '🏥',
      Education: '📚',
      Others: '📦',
    };
    return icons[category] || icons.Others;
  };

  const totalExpenses = stats?.overall?.total || 0;
  const balance = totalIncome - totalExpenses;
  const isNegative = balance < 0;

  return (
    <div className="space-y-4">
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
        <div className="card" style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
          <p className="text-sm font-medium opacity-90">Total Income</p>
          <p className="text-3xl font-bold mt-2">{formatAmount(totalIncome)}</p>
        </div>

        <div className="card" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
          <p className="text-sm font-medium opacity-90">Total Spent</p>
          <p className="text-3xl font-bold mt-2">{formatAmount(totalExpenses)}</p>
        </div>

        <div 
          className="card" 
          style={{ 
            backgroundColor: isNegative ? '#ef4444' : 'var(--color-secondary)', 
            color: isNegative ? 'white' : 'var(--color-text-dark)' 
          }}
        >
          <p className="text-sm font-medium opacity-90">Balance</p>
          <p className="text-3xl font-bold mt-2">
            {isNegative ? '-' : ''}{formatAmount(Math.abs(balance))}
          </p>
          {isNegative && (
            <p className="text-xs mt-1 opacity-90">Over budget!</p>
          )}
        </div>
      </div>

      {stats?.categoryWise && stats.categoryWise.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            {stats.categoryWise.map((item) => {
              const percentage = ((item.totalAmount / totalExpenses) * 100).toFixed(1);
              return (
                <div key={item._id}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getCategoryIcon(item._id)}</span>
                      <span className="font-medium">{item._id}</span>
                      <span className="text-xs text-gray-500">({item.count} transactions)</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatAmount(item.totalAmount)}</p>
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: 'var(--color-primary)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseStats;