const mongoose = require('mongoose')
const Schema = mongoose.Schema


const expenseSchema = new Schema({
    category: String,
    amount: Number,
    date: Date,
    description: String,
    type: String
})


const Expense = mongoose.model('Expense', expenseSchema)
module.exports = Expense