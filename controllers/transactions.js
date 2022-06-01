const Transaction = require('../models/Transaction')

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  console.log('hello')
    try {
      const transactions = await Transaction.find();
  
      return res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
  
  // @desc    Add transaction
  // @route   POST /api/v1/transactions
  // @access  Public
  exports.addTransaction = async (req, res, next) => {
    try {
      const { text, amount } = req.body;
  
      
      await Transaction.create(req.body);
      const transaction = await Transaction
      return res.status(201).json({
        success: true,
        data: transaction
      }); 
    } catch (err) {
      if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
  
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    }
  }
  
  // @desc    Delete transaction
  // @route   DELETE /api/v1/transactions/:id
  // @access  Public
  exports.deleteTransaction = async (req, res, next) => {
    try {
      console.log(req.params.id)
      // const transaction = await Transaction.findOne({budgetId: req.params.id});
      // console.log(transaction)
      // if(!transaction) {
      //   return res.status(404).json({
      //     success: false,
      //     error: 'No transaction found'
      //   });
      // }
  
      // await transaction.deleteOne({budgetId: req.params.id});
;
      // const transactions = Transaction.find()
      return res.status(200).json({
        success: true,
        data: transactions
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err
      });
    }
  }