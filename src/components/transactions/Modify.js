import React, { Component } from './node_modules/react'
import AddBudgetItem from './AddBudgetItem'
import Transactions from './Transactions'


class Modify extends Component {
    render(){
        return (<div id="modify-container">
            <AddBudgetItem />
            <Transactions />
        </div>)
    }
}

export default Modify