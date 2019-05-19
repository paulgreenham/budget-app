import React, { Component } from 'react'
import Transactions from './Transactions';

import '../style/addbudgetitem.css'
class AddBudgetItem extends Component {
    constructor() {
        super()
        this.state = {
            category: "",
            amount: 0,
            date: new Date(),
            description: ""
        }
    }

    async componentDidMount() {
        await this.props.updateTransactions()
    }

    getInput = event => this.setState({ [event.target.name]: event.target.value })

    resetInput = () => {
        this.setState({
            category: "",
            amount: 0,
            date: new Date(),
            description: ""
        })
    }

    expense = () => {
        const transaction = {
            category: this.state.category,
            amount: this.state.amount,
            date: new Date(this.state.date),
            description: this.state.description,
            type: "expense"
        }
        this.props.makeInput(transaction)
        this.resetInput()
    }

    income = () => {
        const transaction = {
            category: this.state.category,
            amount: this.state.amount,
            date: new Date(this.state.date),
            description: this.state.description,
            type: "income"
        }
        this.props.makeInput(transaction)
        this.resetInput()
    }

    render(){
        return (<div id="main-add-container">
            <div className="add-inputs">
                <div className="category"><input name="category" type="text" placeholder="Enter Category" 
                    value={this.state.category} onChange={this.getInput} /></div>

                <div className="amount"><input name="amount" type="number" placeholder="Amount"
                    value={this.state.amount} onChange={this.getInput} /></div>

                <div className="date"><input name="date" type="date" placeholder="Date (leave blank to enter today's date)"
                    value={this.state.date} onChange={this.getInput} /></div>

                <div className="description"><input name="description" type="text" placeholder="Enter description"
                    value={this.state.description} onChange={this.getInput} /></div>

                <div className="add-buttons">
                    <button className="expense-button" onClick={this.expense}>Expense</button>
                    <button className="income-button" onClick={this.income}>Income</button>
                </div>
            </div>
            <div className="transaction-summary">
                <Transactions transactions={this.props.transactions}/>
            </div>
        </div>)
    }
}

export default AddBudgetItem