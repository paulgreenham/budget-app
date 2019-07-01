import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

// import './style/categorycharts.css'

@inject("currentBudget")
@observer
class CategoryCharts extends Component {
    constructor() {
        super()
        this.state = {
            currentMonth: new Date().getMonth(),
            period: "ytd",
            type: "expense",
            titleType: "Expenses",
            titlePeriod: "Year-to-Date",
            spending: {}
        }
    }

    updateGeneralState = () => {
        this.props.currentBudget.changeMonth(this.state.currentMonth)
        this.setState({ spending: this.props.currentBudget.getSpendingByCategory(this.state.type, this.state.period) })
    }

    handlePeriodInput = event => {
        this.setState({
            period: event.target.value,
            titlePeriod: event.target.value === "ytd" ? "Year-to-Date" : this.getMonth(this.state.currentMonth) 
        }, function() { this.updateGeneralState() })
    }

    handleMonthInput = event => {
        let month = Number(event.target.value)
        this.setState({
            currentMonth: month,
            titlePeriod: this.getMonth(month)
        }, function() { this.updateGeneralState() })
    }

    handleTypeInput = event => {
        this.setState({
            type: event.target.value,
            titleType: event.target.value === "expense" ? "Expenses" : "Income" 
        }, function() { this.updateGeneralState() })
    }

    renderPeriodMenu = () => {
        return(<select className="period-menu" name="period" value={this.state.period} onChange={this.handlePeriodInput}>
            <option defaultValue={true} value="ytd">Year to Date</option>
            <option value="byMonth">By Month</option>
        </select>)
    }

    renderMonthMenu = () => {
        return(<select className="month-menu" name="currentMonth" value={this.state.currentMonth} onChange={this.handleMonthInput}>
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
        </select>)
    }

    renderTypeMenu = () => {
        return(<select className="type-menu" name="type" value={this.state.type} onChange={this.handleTypeInput}>
            <option defaultValue={true} value="expense">Expenses</option>
            <option value="income">Income</option>
        </select>)
    }

    getMonth = month => new Date(2019, month).toDateString().slice(4, 7)

    getDataObject = (l, a) => {
        return {
            category: l,
            amount: a
        }
    }
    
    getDataObjects = list => Object.keys(list).map(l => this.getDataObject(l, list[l]))

    renderChart = data => {
        return (
            <ResponsiveContainer width="95%" height="90%">
                <BarChart width={1000} height={500} layout="horizontal" data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="category" type="category" interval={0}/>
                    <YAxis dataKey="amount" type="number"/>
                    <Tooltip />
                    <Bar dataKey="amount" legendType="none"
                        isAnimationActive={true} animationDuration={1000}/>
                </BarChart>
            </ResponsiveContainer>
        )
    }

    componentDidMount() {
        this.updateGeneralState()
    }

    render(){
        return (<div>
            <div className="charts-by-category">
                <div className="spending-menu">
                    <span><span className="period-selection">Select Period: </span>{this.renderPeriodMenu()}</span>
                    {this.state.period === "ytd" ? null : 
                        <span><span className="month-selection">Select Month: </span>{this.renderMonthMenu()}</span>}
                    <span><span className="type-selection">Select Type: </span>{this.renderTypeMenu()}</span>
                </div>
                <div>{this.state.titleType}: {this.state.titlePeriod}</div>
                {this.renderChart(this.getDataObjects(this.state.spending))}
            </div>
        </div>)
    }
}
    
export default CategoryCharts