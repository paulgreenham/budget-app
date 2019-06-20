import React, { Component } from 'react'
import AddBudgetItem from './AddBudgetItem'
import Transactions from './Transactions'

import './style/modify.css'


class Modify extends Component {
    render(){
        return (<div id="modify-container">
            <AddBudgetItem />
            <Transactions />
        </div>)
    }
}

export default Modify