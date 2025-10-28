import express from 'express';
import {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getTotalIncome,
} from '../controllers/incomeController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getIncomes).post(createIncome);

router.route('/total').get(getTotalIncome);

router.route('/:id').put(updateIncome).delete(deleteIncome);

export default router;