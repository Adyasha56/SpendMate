import { useIsMobile } from '../../utils/hooks';

const IncomeList = ({ incomes, onEdit, onDelete }) => {
  const isMobile = useIsMobile();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSourceIcon = (source) => {
    const icons = {
      Salary: '💼',
      'Pocket Money': '💰',
      Bonus: '🎁',
      'Part Time': '⏰',
      Freelance: '💻',
      Business: '🏢',
      Investment: '📈',
      Others: '💵',
    };
    return icons[source] || icons.Others;
  };

  if (incomes.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">No income records found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {incomes.map((income) => (
        <div key={income._id} className="card hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getSourceIcon(income.source)}</span>
                <h3 className="font-semibold text-lg">{income.source}</h3>
              </div>

              {income.description && (
                <p className="text-sm text-gray-600 mb-2">{income.description}</p>
              )}

              <p className="text-xs text-gray-500">{formatDate(income.date)}</p>
            </div>

            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-end gap-3`}>
              <div className="text-right">
                <p className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>
                  + {formatAmount(income.amount)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(income)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this income?')) {
                      onDelete(income._id);
                    }
                  }}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncomeList;