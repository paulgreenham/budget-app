import React, { Component } from 'react'

class Transaction extends Component {
    render(){
        let t = this.props.transaction
        return (<div>
            <span>{t.category} :: </span>
            <span>{t.amount} :: </span>
            <span>{new Date(t.date).toDateString()} :: </span>
            <span>{t.description}</span>
        </div>)
    }
}

export default Transaction