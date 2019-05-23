const express = require('express')
const router = express.Router()
const moment = require('moment')


const Expense = require('../models/Expense')

router.get('/transactions', function (req, res) {
    console.log("hey server this is paul")
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

router.get('/transactions/:category', function (req, res) {
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

router.post('/transaction', async function (req, res) {
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

router.put('/transaction', async function (req, res) {
    const data = req.body
    let updated = await Expense.findByIdAndUpdate(
        data._id, 
        {$set: {
            category: data.category,
            amount: data.amount,
            date: moment(data.date, "YYYY-MM-DD").format("LLLL"),
            description: data.description,
            type: data.type
        }},
        {new: true}
        )
    res.send(updated)
})

router.delete('/transaction/:id', async function (req, res) {
    let id = req.params.id
    await Expense.findByIdAndDelete(id)
    res.end()
})

module.exports = router