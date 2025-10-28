import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useIsMobile } from '../../utils/hooks';

const ExpenseCalendar = ({ expenses }) => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [currentDate, setCurrentDate] = useState(new Date());

  const isFemale = user?.gender === 'Female';

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getExpensesForDate = (date) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getDate() === date &&
        expenseDate.getMonth() === currentDate.getMonth() &&
        expenseDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const getTotalForDate = (date) => {
    const dayExpenses = getExpensesForDate(date);
    return dayExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const femaleStyle = {
    background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    accentColor: '#ec407a',
    hoverColor: '#f06292',
  };

  const maleStyle = {
    background: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
    accentColor: '#42a5f5',
    hoverColor: '#64b5f6',
  };

  const style = isFemale ? femaleStyle : maleStyle;

  return (
    <div className="card p-4" style={{ background: style.background }}>
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={previousMonth}
          className="p-1.5 rounded-lg hover:bg-white/50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-base font-bold" style={{ color: style.accentColor }}>
          {monthName}
        </h3>

        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-white/50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx} className="text-center font-semibold py-1" style={{ color: style.accentColor }}>
            {day}
          </div>
        ))}

        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const total = getTotalForDate(day);
          const hasExpenses = total > 0;
          const isHighExpense = total > 1000;
          const isToday =
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={day}
              className={`aspect-square flex flex-col items-center justify-center rounded-md transition-all cursor-pointer text-xs ${
                isToday ? 'ring-2' : ''
              } ${hasExpenses ? 'bg-white/70 hover:bg-white' : 'bg-white/30 hover:bg-white/50'}`}
              style={{
                ringColor: isToday ? style.accentColor : 'transparent',
              }}
            >
              <span className="font-semibold">{day}</span>
              {hasExpenses && (
                <div className="mt-0.5">
                  {isHighExpense && (
                    <span className="text-[10px]" title="High expense!">
                      🔥
                    </span>
                  )}
                  <p
                    className="text-[9px] font-medium leading-tight"
                    style={{ color: style.accentColor }}
                  >
                    ₹{Math.round(total)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-white/30 flex items-center gap-2 text-xs">
        <span>🔥</span>
        <span>High expense (₹1000+)</span>
      </div>
    </div>
  );
};

export default ExpenseCalendar;