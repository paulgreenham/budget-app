import React, { Component } from 'react'
import Transaction from './Transaction';

class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            selectedMonth: new Date().getMonth()
        }
    }

    getSelectedTransactions = () => {
        let transactions = this.props.transactions || []
        return transactions.filter(t => new Date(t.date).getMonth() === this.state.selectedMonth)
    }

    changeMonth = event => {
        this.setState({
            selectedMonth: parseInt(event.target.value)
        })
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
        const transactions = this.getSelectedTransactions() || []
        return (<div>
            {this.selectMonth()}
            {transactions.map(t => <Transaction key={t._id} transaction={t}/>)}
        </div>)
    }
}

export default Transactions