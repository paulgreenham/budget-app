import React, { Component } from 'react'
import Transaction from './Transaction'
import { observer, inject } from 'mobx-react'

import '../style/spinner.css'

@inject("currentBudget")
@observer
class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            selectedMonth: new Date().getMonth(),
            loading: true
        }
    }

    changeMonth = event => {
        this.setState({
            selectedMonth: parseInt(event.target.value)
        })
    }

    async componentDidMount() {
        await this.props.currentBudget.updateTransactions()
        this.setState({ loading: false })
    }

    selectMonth = () => {
        return (
            <div>Choose which month's transactions you wish to see:
                <select name="selectMonth" id="month-selector" value={this.state.selectedMonth} onChange={this.changeMonth}>
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
        const transactions = this.props.currentBudget.getTransactionsByMonth(this.state.selectedMonth)
        return (<React.Fragment> {this.state.loading ? 
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div> :
            <div className="transaction-summary">
                {this.selectMonth()}
                {transactions.map(t => <Transaction key={t._id} transaction={t}/>)}
            </div>}
        </React.Fragment>)
    }
}

export default Transactions