const express = require('express')
const router = express.Router()
const moment = require('moment')


const Expense = require('../models/Expense')

router.get('/budget-items', function (req, res) {
    if(req.query.d1) {
    let startDate = moment(req.query.d1, "YYYY-MM-DD").format("LLLL")
        if(req.query.d2) {
            let endDate = moment(req.query.d2, "YYYY-MM-DD").format("LLLL")
            Expense.find().and([{date: {$gte: startDate}}, {date: {$lte: endDate}}]).sort({date: -1}).exec(function (err, expenses) {
                res.send(expenses)
            })
        }
        else {
            Expense.find({date: {$gte: startDate}}).sort({date: -1}).exec(function (err, expenses) {
                res.send(expenses)
            })
        }
    }
    else {
        Expense.find({}).sort({date: -1}).exec(function (err, expenses) {
            res.send(expenses)
        })
    }  
})

router.get('/budget-items/:category', function (req, res) {
    let categorySelection = req.params.category
    if(req.query.total) {
        Expense.aggregate([
            {$match: {category: categorySelection}},
            {$category: {_id: "$category", total: {$sum: "$amount"}}},
        ], 
        function (err, results) {
            res.send(results)
        }
        )
    }
    else {
        Expense.find({category: categorySelection}, function (err, expenses) {
            res.send(expenses)
        })
    }
})

router.post('/new', async function (req, res) {
    let newExpense = new Expense ({
        category: req.body.category,
        amount: req.body.amount,
        date: (req.body.date) ? moment(req.body.date, "YYYY-MM-DD").format("LLLL") : moment().format("LLLL"),
        description: req.body.description,
        type: req.body.type
    })
    await newExpense.save()
    res.end()
})

router.put('/update/:category1/:category2', function (req, res) {
    Expense.findOneAndUpdate(
        {category: req.params.category1},
        {category: req.params.category2},
        {new: true},
        function (err, expense) {
        res.send(`Expense: ${expense.description} on ${expense.date} has had category ${req.params.category1} changed to ${expense.category}`)
    })
})

module.exports = router