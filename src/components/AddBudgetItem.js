import React, { Component } from 'react'
import Transactions from './Transactions';

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

    expense = () => {
        const transaction = {
            category: this.state.category,
            amount: this.state.amount,
            date: new Date(this.state.date),
            description: this.state.description,
            type: "expense"
        }
        this.props.makeInput(transaction)
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
    }

    render(){
        return (<div id="main-add-container">
            <div id="add-inputs">
                <input name="category" type="text" className="category" placeholder="Enter Category" 
                    value={this.state.category} onChange={this.getInput} />

                <input name="amount" type="number" className="amount" placeholder="Amount"
                    value={this.state.amount} onChange={this.getInput} />

                <input name="date" type="date" className="date" placeholder="Date (leave blank to enter today's date)"
                    value={this.state.date} onChange={this.getInput} />

                <input name="description" type="text" className="description" placeholder="Enter description"
                    value={this.state.description} onChange={this.getInput} />

                <button className="expense-button" onClick={this.expense}>Expense</button>
                <button className="income-button" onClick={this.income}>Income</button>
            </div>
            <div className="transaction-summary">
                <Transactions transactions={this.props.transactions}/>
            </div>
        </div>)
    }
}

export default AddBudgetItem