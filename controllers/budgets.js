const Budget = require('../models/Budgets')

// @desc    Get all budgets
// @route   GET /api/v1/budgets
// @access  Public
exports.getBudgets = async (req, res, next) => {
    try {
      const budgets = await Budget.find();
  
      return res.status(200).json({
        success: true,
        count: budgets.length,
        data: budgets
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
  
  // @desc    Add budget
  // @route   POST /api/v1/budgets
  // @access  Public
  exports.addBudget = async (req, res, next) => {
    try {
      const { title, total } = req.body;
  
      await Budget.create(req.body);
      const budgets = await Budget.find()
      return res.status(201).json({
        success: true,
        data: budgets
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
  
  // @desc    Delete budget
  // @route   DELETE /api/v1/budgets/:id
  // @access  Public
  exports.deleteBudget = async (req, res, next) => {
    try {

      //locates the budget to be deleted
      const budget = await Budget.findById(req.params.id);
  
      if(!budget) {
        //no budget found returns error
        return res.status(404).json({
          success: false,
          error: 'No budget found'
        });
      }
      
      //budget exists and the delete is called on it
      await budget.remove();

      //find all budgets and return them to the front end
      const budgets = await Budget.find()
      return res.status(200).json({
        success: true,
        data: budgets
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }