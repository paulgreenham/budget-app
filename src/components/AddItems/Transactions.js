import React, { Component } from 'react'
import Transaction from './Transaction'
import { observer, inject } from 'mobx-react'

import '../../style/spinner.css'
import '../../style/transactions.css'

@inject("currentBudget")
@observer
class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            loading: true
        }
    }

    changeMonth = event => this.props.currentBudget.changeMonth(parseInt(event.target.value))

    async componentDidMount() {
        await this.props.currentBudget.updateTransactions()
        this.setState({ loading: false })
    }
    
    selectMonth = () => {
        return (
            <div className="selection-header">
                <span className="selection-text">Choose which month's transactions you wish to see: </span>
                <select name="selectMonth" id="month-selector" value={this.props.currentBudget.currentMonth} onChange={this.changeMonth}>
                    <option value="0">January</option>
                    <option value="1">Feburary</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>
            </div>
        )
    }

    render(){
        const transactions = this.props.currentBudget.currentMonthTransactions
        return (<React.Fragment> {this.state.loading ? 
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div> :
            <div className="transaction-summary">
                {this.selectMonth()}
                <div className="transactions-container">
                    {transactions.map(t => <Transaction key={t._id} transaction={t} isEditMode={this.isEditMode}/>)}
                </div>
            </div>}
        </React.Fragment>)
    }
}

export default Transactions