import { useState } from 'react';
import { useIsMobile } from '../../utils/hooks';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const isMobile = useIsMobile();
  const [showActions, setShowActions] = useState(false);

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

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-100 text-orange-700',
      Transport: 'bg-blue-100 text-blue-700',
      Entertainment: 'bg-purple-100 text-purple-700',
      Shopping: 'bg-pink-100 text-pink-700',
      Bills: 'bg-red-100 text-red-700',
      Health: 'bg-green-100 text-green-700',
      Education: 'bg-indigo-100 text-indigo-700',
      Others: 'bg-gray-100 text-gray-700',
    };
    return colors[category] || colors.Others;
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg truncate">{expense.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                expense.category
              )}`}
            >
              {expense.category}
            </span>
          </div>

          {expense.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {expense.description}
            </p>
          )}

          <p className="text-xs text-gray-500">{formatDate(expense.date)}</p>
        </div>

        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-end gap-3`}>
          <div className="text-right">
            <p className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {formatAmount(expense.amount)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(expense)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
                if (window.confirm('Are you sure you want to delete this expense?')) {
                  onDelete(expense._id);
                }
              }}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
              title="Delete"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
  );
};

export default ExpenseItem;