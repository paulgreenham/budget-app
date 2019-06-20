import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import './style/editpopup.css'


@inject("generalStore", "currentBudget")
@observer
class EditPopUp extends Component {

    closePopUp = () => this.props.closePopUp()

    getInput = event => this.props.generalStore.getInput(event.target.name, event.target.value)

    updateRecord = async () => {
        await this.props.currentBudget.editTransaction(this.props.generalStore.budgetItem)
        this.closePopUp()
    }

    deleteRecord = async () => {
        await this.props.currentBudget.deleteTransaction(this.props.generalStore.budgetItem._id)
        this.closePopUp()
    }

    render(){
        return (<div className="edit-popup">
            <div className="popup-details">
                <span onClick={this.closePopUp} className="close-button"><i className="fas fa-window-close"></i></span>
                <div className="edit-input">
                    <span>Category:</span>
                    <input name="category" type="text" 
                        value={this.props.generalStore.budgetItem.category} onChange={this.getInput} />
                </div>
                <div className="edit-input">
                    <span>Amount:</span>
                    <input name="amount" type="number"
                        value={this.props.generalStore.budgetItem.amount} onChange={this.getInput} />
                </div>
                <div className="edit-input">
                    <span>Date:</span>
                    <input name="date" type="date"
                        value={this.props.generalStore.budgetItem.date} onChange={this.getInput} />
                </div>
                <div className="edit-input">
                    <span>Description:</span>
                    <input name="description" type="text"
                        value={this.props.generalStore.budgetItem.description} onChange={this.getInput} />
                </div>
                <div className="edit-input">
                    <span>Type:</span>
                    <input name="type" type="text"
                        value={this.props.generalStore.budgetItem.type} onChange={this.getInput} />
                </div>
                <button className="update-button" onClick={this.updateRecord}>Update</button>
                <button className="delete-button" onClick={this.deleteRecord}>Delete</button>
            </div>
        </div>)
    }
}

export default EditPopUp