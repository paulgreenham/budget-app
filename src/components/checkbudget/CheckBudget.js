import React, { Component } from 'react'
import CategoryCharts from './CategoryCharts'
import { observer, inject } from 'mobx-react'

import './style/checkbudget.css'
import '../../globalstyle/spinner.css'
@inject("currentBudget")
@observer
class CheckBudget extends Component {
    constructor() {
        super()
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        await this.props.currentBudget.updateCategories()
        this.setState({ loading: false })
    }

    render(){
        return (<React.Fragment> {this.state.loading ? 
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div> :
        <div className="main-analytics-container">
            <CategoryCharts />
        </div>}
        <div className="analytics-background"></div>
        </React.Fragment>)
    }
}

export default CheckBudget