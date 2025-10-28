import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0, 'Amount cannot be negative'],
    },
    source: {
      type: String,
      required: [true, 'Please provide a source'],
      enum: [
        'Salary',
        'Pocket Money',
        'Bonus',
        'Part Time',
        'Freelance',
        'Business',
        'Investment',
        'Others',
      ],
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date'],
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

incomeSchema.index({ user: 1, date: -1 });

const Income = mongoose.model('Income', incomeSchema);

export default Income;