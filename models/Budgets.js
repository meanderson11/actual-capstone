const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  total: {
    type: Number,
    required: [true, 'Please add a number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);