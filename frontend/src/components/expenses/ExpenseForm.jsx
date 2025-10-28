import { useState, useEffect } from 'react';
import { useIsMobile } from '../../utils/hooks';

const CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills',
  'Health',
  'Education',
  'Others',
];

const ExpenseForm = ({ onSubmit, onCancel, initialData = null }) => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        amount: initialData.amount,
        category: initialData.category,
        date: new Date(initialData.date).toISOString().split('T')[0],
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Grocery Shopping"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="input-field"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description (Optional)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input-field"
          placeholder="Add notes about this expense"
          rows="3"
        />
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3`}>
        <button type="submit" className="btn btn-primary flex-1">
          {initialData ? 'Update Expense' : 'Add Expense'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;