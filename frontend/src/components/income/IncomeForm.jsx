import { useState, useEffect } from 'react';
import { useIsMobile } from '../../utils/hooks';

const INCOME_SOURCES = [
  'Salary',
  'Pocket Money',
  'Bonus',
  'Part Time',
  'Freelance',
  'Business',
  'Investment',
  'Others',
];

const IncomeForm = ({ onSubmit, onCancel, initialData = null }) => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    amount: '',
    source: 'Salary',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount,
        source: initialData.source,
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
          <label className="block text-sm font-medium mb-2">Source</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="input-field"
            required
          >
            {INCOME_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <div className={isMobile ? 'col-span-1' : 'col-span-2'}>
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
          placeholder="Add notes about this income"
          rows="3"
        />
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3`}>
        <button type="submit" className="btn btn-primary flex-1">
          {initialData ? 'Update Income' : 'Add Income'}
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

export default IncomeForm;