import React, { Component } from 'react'
import Transactions from './Transactions'
import { observer, inject } from 'mobx-react'

import '../style/addbudgetitem.css'

@inject("generalStore", "currentBudget")
@observer
class AddBudgetItem extends Component {

    getInput = event => this.props.generalStore.getInput(event.target.name, event.target.value)

    addTransaction = () => {
        this.props.currentBudget.makeInput(this.props.generalStore.budgetItem)
        this.props.generalStore.resetItem()
    }

    expense = () => {
        this.props.generalStore.addItemType(true)
        this.addTransaction()
    }

    income = () => {
        this.props.generalStore.addItemType(false)
        this.addTransaction()
    }

    render(){
        return (<div id="main-add-container">
            <div className="add-inputs">
                <div className="category"><input name="category" type="text" placeholder="Enter Category" 
                    value={this.props.generalStore.budgetItem.category} onChange={this.getInput} /></div>

                <div className="amount"><input name="amount" type="number" placeholder="Amount"
                    value={this.props.generalStore.budgetItem.amount} onChange={this.getInput} /></div>

                <div className="date"><input name="date" type="date" placeholder="Date (leave blank to enter today's date)"
                    value={this.props.generalStore.budgetItem.date} onChange={this.getInput} /></div>

                <div className="description"><input name="description" type="text" placeholder="Enter description"
                    value={this.props.generalStore.budgetItem.description} onChange={this.getInput} /></div>

                <div className="add-buttons">
                    <button className="expense-button" onClick={this.expense}>Add an Expense</button>
                    <button className="income-button" onClick={this.income}>Add an Income</button>
                </div>
            </div>
            <Transactions />
        </div>)
    }
}

export default AddBudgetItem