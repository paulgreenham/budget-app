import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'

// import './style/categorycharts.css'

@inject("currentBudget")
@observer
class CategoryCharts extends Component {

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
                    <Bar dataKey="amount" legendType="none"
                        isAnimationActive={true} animationDuration={1000}/>
                </BarChart>
            </ResponsiveContainer>
        )
    }

    render(){
        const spending = this.props.currentBudget.spendingByCategory
        const categories = Object.keys(spending)
        return (<div>
            {categories.map( (c, i) => <div key={i}>{c} : {spending[c]}</div>)}
            <div className="charts-by-category">
                {this.renderChart(this.getDataObjects(spending))}
            </div>
        </div>)
    }
}
    
export default CategoryCharts