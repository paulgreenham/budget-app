import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import './style/addbudgetitem.css'

@inject("generalStore", "currentBudget")
@observer
class AddBudgetItem extends Component {

    getInput = event => this.props.generalStore.getInput(event.target.name, event.target.value)

    addTransaction = () => {
        if (this.props.generalStore.isBudgetItemEmpty()) {
            return alert("Please enter data in each field.")
        }
        this.props.currentBudget.postTransaction(this.props.generalStore.budgetItem)
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
        return (
            <div className="add-inputs" style={{color: this.props.generalStore.isEditMode ? "var(--variation-one)" : "var(--primary-dark)"}}>
                <div className="category add-input">
                    <div>What category of transaction?</div>
                    <input name="category" type="text" placeholder="Category" 
                        value={this.props.generalStore.budgetItem.category} onChange={this.getInput} />
                </div>

                <div className="amount add-input">
                    <div>How much?</div>
                    <input name="amount" type="number" placeholder="Amount" 
                        value={this.props.generalStore.budgetItem.amount} onChange={this.getInput} />
                </div>

                <div className="date add-input">
                    <div>When?</div>
                    <input name="date" type="date"
                        value={this.props.generalStore.budgetItem.date} onChange={this.getInput} />
                </div>

                <div className="description add-input">
                    <div>Give some details:</div>
                    <input name="description" type="text" placeholder="Enter description"
                        value={this.props.generalStore.budgetItem.description} onChange={this.getInput} />
                </div>

                <div className="add-buttons">
                    <button className="expense-button" onClick={this.expense}>Add as an Expense</button>
                    <button className="income-button" onClick={this.income}>Add as an Income</button>
                </div>
            </div>
        )
    }
}

export default AddBudgetItem