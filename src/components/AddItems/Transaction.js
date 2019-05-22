import React, { Component } from 'react'
import EditPopUp from './EditPopUp'
import { inject, observer } from 'mobx-react'


@inject("generalStore", "currentBudget")
@observer
class Transaction extends Component {
    constructor() {
        super()
        this.state = {
            revealEdit: false
        }
    }

    showPopUp = () => {
        this.props.generalStore.setItem(this.props.transaction)
        this.props.generalStore.changeEditMode(true)
        this.setState({ revealEdit: true })
    }

    closePopUp = () => {
        this.props.generalStore.resetItem()
        this.props.generalStore.changeEditMode(false)
        this.setState({ revealEdit: false })
    }

    render(){
        let t = this.props.transaction
        return (<React.Fragment>
            <div className={t.type === "expense" ? "expense transaction" : "income transaction"} onClick={this.showPopUp}>
                <span>{t.category}</span>
                <span>{t.amount}{"\t"}{t.type === "income" ? <i className="fas fa-money-check-alt"></i> : null}</span>
                <span>{new Date(t.date).toDateString()}</span>
                <span>{t.description}</span>
            </div>
            {this.state.revealEdit ? <EditPopUp closePopUp={this.closePopUp} updateRecord={this.updateRecord}/> : null}
        </React.Fragment>)
    }
}

export default Transaction