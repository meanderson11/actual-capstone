const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');
const { getBudgets, addBudget, deleteBudget } = require('../controllers/budgets')

router
  .route('/transactions')
  .get(getTransactions)
  .post(addTransaction);

router
  .route('/transactions/:id')
  .delete(deleteTransaction);

  router
  .route('/budgets')
  .get(getBudgets)
  .post(addBudget);

  //added a delete endpoint
router.route('/budgets/:id')
.delete(deleteBudget)

module.exports = router;