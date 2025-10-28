import Expense from '../models/Expense.js';

// Get all expenses for logged in user
export const getExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate, search } = req.query;

    // Build filter object
    const filter = { user: req.user._id };

    if (category) {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    console.error('Get expenses error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get single expense
export const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    // Check if expense belongs to user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this expense',
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error('Get expense error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Create expense
export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    // Validation
    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, amount, category, and date',
      });
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      date,
      description,
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error('Create expense error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    // Check if expense belongs to user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this expense',
      });
    }

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error('Update expense error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    // Check if expense belongs to user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this expense',
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    console.error('Delete expense error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get expense statistics
export const getExpenseStats = async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
    ]);

    const totalExpenses = await Expense.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        categoryWise: stats,
        overall: totalExpenses[0] || { total: 0, count: 0 },
      },
    });
  } catch (error) {
    console.error('Get stats error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};