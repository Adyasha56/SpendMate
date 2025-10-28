import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseStats from '../components/expenses/ExpenseStats';
import IncomeForm from '../components/income/IncomeForm';
import IncomeList from '../components/income/IncomeList';
import ExpenseCalendar from '../components/calendar/ExpenseCalendar';
import ExpensePieChart from '../components/charts/ExpensePieChart';
import { expenseAPI, incomeAPI } from '../utils/api';
import { useIsMobile } from '../utils/hooks';

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [stats, setStats] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchExpenses(),
        fetchStats(),
        fetchIncomes(),
        fetchTotalIncome(),
      ]);
    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await expenseAPI.getAll();
      setExpenses(response.data.data);
    } catch (error) {
      console.error('Fetch expenses error:', error);
      setError('Failed to fetch expenses');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await expenseAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const response = await incomeAPI.getAll();
      setIncomes(response.data.data);
    } catch (error) {
      console.error('Fetch incomes error:', error);
    }
  };

  const fetchTotalIncome = async () => {
    try {
      const response = await incomeAPI.getTotal();
      setTotalIncome(response.data.data.total);
    } catch (error) {
      console.error('Fetch total income error:', error);
    }
  };

  const handleAddExpense = async (formData) => {
    try {
      await expenseAPI.create(formData);
      await fetchData();
      setShowExpenseForm(false);
      setError('');
    } catch (error) {
      console.error('Add expense error:', error);
      setError(error.response?.data?.message || 'Failed to add expense');
    }
  };

  const handleUpdateExpense = async (formData) => {
    try {
      await expenseAPI.update(editingExpense._id, formData);
      await fetchData();
      setEditingExpense(null);
      setError('');
    } catch (error) {
      console.error('Update expense error:', error);
      setError(error.response?.data?.message || 'Failed to update expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await expenseAPI.delete(id);
      await fetchData();
      setError('');
    } catch (error) {
      console.error('Delete expense error:', error);
      setError(error.response?.data?.message || 'Failed to delete expense');
    }
  };

  const handleAddIncome = async (formData) => {
    try {
      await incomeAPI.create(formData);
      await fetchData();
      setShowIncomeForm(false);
      setError('');
    } catch (error) {
      console.error('Add income error:', error);
      setError(error.response?.data?.message || 'Failed to add income');
    }
  };

  const handleUpdateIncome = async (formData) => {
    try {
      await incomeAPI.update(editingIncome._id, formData);
      await fetchData();
      setEditingIncome(null);
      setError('');
    } catch (error) {
      console.error('Update income error:', error);
      setError(error.response?.data?.message || 'Failed to update income');
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await incomeAPI.delete(id);
      await fetchData();
      setError('');
    } catch (error) {
      console.error('Delete income error:', error);
      setError(error.response?.data?.message || 'Failed to delete income');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <section>
          <h2 className={`font-bold mb-4 ${isMobile ? 'text-xl' : 'text-2xl'}`} style={{ color: 'var(--color-primary)' }}>
            Overview
          </h2>
          <ExpenseStats stats={stats} totalIncome={totalIncome} />
        </section>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-6`}>
          <div className={isMobile ? 'col-span-1' : 'lg:col-span-2'}>
            <div className="space-y-6">
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'}`} style={{ color: 'var(--color-primary)' }}>
                    Income
                  </h2>
                  <button
                    onClick={() => {
                      setShowIncomeForm(!showIncomeForm);
                      setEditingIncome(null);
                    }}
                    className="btn btn-primary text-sm"
                  >
                    {showIncomeForm ? 'Cancel' : '+ Add'}
                  </button>
                </div>

                {showIncomeForm && (
                  <div className="card mb-4">
                    <IncomeForm
                      onSubmit={handleAddIncome}
                      onCancel={() => setShowIncomeForm(false)}
                    />
                  </div>
                )}

                {editingIncome && (
                  <div className="card mb-4">
                    <h3 className="text-base font-semibold mb-3">Edit Income</h3>
                    <IncomeForm
                      onSubmit={handleUpdateIncome}
                      onCancel={() => setEditingIncome(null)}
                      initialData={editingIncome}
                    />
                  </div>
                )}

                <IncomeList
                  incomes={incomes}
                  onEdit={setEditingIncome}
                  onDelete={handleDeleteIncome}
                />
              </section>

              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'}`} style={{ color: 'var(--color-primary)' }}>
                    Expenses
                  </h2>
                  <button
                    onClick={() => {
                      setShowExpenseForm(!showExpenseForm);
                      setEditingExpense(null);
                    }}
                    className="btn btn-primary text-sm"
                  >
                    {showExpenseForm ? 'Cancel' : '+ Add'}
                  </button>
                </div>

                {showExpenseForm && (
                  <div className="card mb-4">
                    <ExpenseForm
                      onSubmit={handleAddExpense}
                      onCancel={() => setShowExpenseForm(false)}
                    />
                  </div>
                )}

                {editingExpense && (
                  <div className="card mb-4">
                    <h3 className="text-base font-semibold mb-3">Edit Expense</h3>
                    <ExpenseForm
                      onSubmit={handleUpdateExpense}
                      onCancel={() => setEditingExpense(null)}
                      initialData={editingExpense}
                    />
                  </div>
                )}

                <ExpenseList
                  expenses={expenses}
                  onEdit={setEditingExpense}
                  onDelete={handleDeleteExpense}
                />
              </section>
            </div>
          </div>

          <div className={isMobile ? 'col-span-1' : 'lg:col-span-1'}>
            <div className="space-y-6 lg:sticky lg:top-4">
              <section>
                <h2 className={`font-bold mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`} style={{ color: 'var(--color-primary)' }}>
                  Calendar
                </h2>
                <ExpenseCalendar expenses={expenses} />
              </section>

              <section>
                <ExpensePieChart stats={stats} totalIncome={totalIncome} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;