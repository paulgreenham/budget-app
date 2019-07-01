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
            spending: {},
            chartTitle: "Expenses, Year-to-Date"
        }
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    renderPeriodMenu = () => {
        return(<select className="period-menu" name="period" value={this.state.period} onChange={this.handleInput}>
            <option defaultValue={true} value="ytd">Year to Date</option>
            <option value="byMonth">By Month</option>
        </select>)
    }

    renderMonthMenu = () => {
        return(<select className="month-menu" name="currentMonth" value={this.state.currentMonth} onChange={this.handleInput}>
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
        return(<select className="type-menu" name="type" value={this.state.type} onChange={this.handleInput}>
            <option defaultValue={true} value="expense">Expenses</option>
            <option value="income">Income</option>
        </select>)
    }

    getMonth = month => new Date(2019, month).toDateString().slice(4, 7)

    getSpending = () => {
        if (this.state.period === "ytd") {
            this.props.currentBudget.getSpendingByCategory(this.state.type)
            this.setState({ chartTitle: `${this.state.type === "expense" ? "Expenses" : "Income"}: Year-to-Date`})
            return this.props.currentBudget.spendingByCategory
        }
        else {
            this.props.currentBudget.changeMonth(this.state.currentMonth)
            this.props.currentBudget.getSpendingByCategory(this.state.type, this.state.period)
            this.setState({ chartTitle: `${this.state.type === "expense" ? "Expenses" : "Income"}: ${this.getMonth()}`})
            return this.props.currentBudget.currentMonthSpending
        }
    }

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
        this.setState({
            spending: this.getSpending()
        })
    }

    render(){
        return (<div>
            <div className="charts-by-category">
                <div className="spending-menu">
                    <div><span className="period-selection">Select Period: </span>{this.renderPeriodMenu()}</div>
                    {this.state.period === "ytd" ? null : 
                        <div><span className="month-selection">Select Month: </span>{this.renderMonthMenu()}</div>}
                    <div><span className="type-selection">Select Type: </span>{this.renderTypeMenu()}</div>
                </div>
                <div>{this.state.chartTitle}</div>
                {this.renderChart(this.getDataObjects(this.state.spending))}
            </div>
        </div>)
    }
}
    
export default CategoryCharts