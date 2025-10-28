import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useIsMobile } from '../../utils/hooks';

const ExpensePieChart = ({ stats, totalIncome }) => {
  const isMobile = useIsMobile();

  if (!stats || !stats.categoryWise || stats.categoryWise.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">No expense data to display</p>
      </div>
    );
  }

  const COLORS = {
    Food: '#FF6B6B',
    Transport: '#4ECDC4',
    Entertainment: '#A78BFA',
    Shopping: '#F472B6',
    Bills: '#EF4444',
    Health: '#10B981',
    Education: '#6366F1',
    Others: '#6B7280',
  };

  const data = stats.categoryWise.map((item) => ({
    name: item._id,
    value: item.totalAmount,
    count: item.count,
    color: COLORS[item._id] || COLORS.Others,
  }));

  const totalExpenses = stats.overall?.total || 0;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1);
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">{formatAmount(data.value)}</p>
          <p className="text-xs text-gray-500">{percentage}% of total</p>
          <p className="text-xs text-gray-500">{data.count} transactions</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4">Expense Distribution</h3>
      
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={isMobile ? 80 : 100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => 
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensePieChart;