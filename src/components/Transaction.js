import React, { Component } from 'react'

class Transaction extends Component {
    render(){
        let t = this.props.transaction
        return (<div className={t.type === "expense" ? "expense transaction" : "income transaction"}>
            <span>{t.category}</span>
            <span>{t.amount}{"\t"}{t.type === "income" ? <i className="fas fa-money-check-alt"></i> : null}</span>
            <span>{new Date(t.date).toDateString()}</span>
            <span>{t.description}</span>
        </div>)
    }
}

export default Transaction