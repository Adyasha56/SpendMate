import Income from '../models/Income.js';

export const getIncomes = async (req, res) => {
  try {
    const { source, startDate, endDate } = req.query;

    const filter = { user: req.user._id };

    if (source) {
      filter.source = source;
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

    const incomes = await Income.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: incomes.length,
      data: incomes,
    });
  } catch (error) {
    console.error('Get incomes error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export const createIncome = async (req, res) => {
  try {
    const { amount, source, date, description } = req.body;

    if (!amount || !source || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount, source, and date',
      });
    }

    const income = await Income.create({
      user: req.user._id,
      amount,
      source,
      date,
      description,
    });

    res.status(201).json({
      success: true,
      data: income,
    });
  } catch (error) {
    console.error('Create income error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export const updateIncome = async (req, res) => {
  try {
    let income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found',
      });
    }

    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this income',
      });
    }

    income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: income,
    });
  } catch (error) {
    console.error('Update income error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found',
      });
    }

    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this income',
      });
    }

    await income.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Income deleted successfully',
    });
  } catch (error) {
    console.error('Delete income error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export const getTotalIncome = async (req, res) => {
  try {
    const result = await Income.aggregate([
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
      data: result[0] || { total: 0, count: 0 },
    });
  } catch (error) {
    console.error('Get total income error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};