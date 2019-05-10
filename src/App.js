import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'

import Home from './components/Home'
import AddBudgetItem from './components/AddBudgetItem'
import CheckBudget from './components/CheckBudget'
import CreateBudget from './components/CreateBudget'

import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      budgetByCategory: [],
      spendingByCategory: [],
    }
  }

  updateTransactions = async () => {
    let itemsFromDB = await axios.get('http://localhost:3723/budget-items')
    await this.setState({
      transactions: itemsFromDB.data
    })
  }

  makeInput = async (transaction) => {
    await axios.post('http://localhost:3723/new', transaction)
    this.updateTransactions()
  }

  async componentDidMount() {
    await this.updateTransactions()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div id="nav-bar">
            <Link to='/' className="nav-button" id="home-button">Home</Link>
            <Link to='/add' className="nav-button" id="add-button">Add Items</Link>
            <Link to='/check' className="nav-button" id="check-button">Check Budget</Link>
            <Link to='/create' className="nav-button" id="new-button">New Budget</Link>
          </div>
          <Route exact path='/' render={() => <Home updateTransactions={this.updateTransactions} />}/>
          <Route exact path='/add' render={() => 
            <AddBudgetItem 
              makeInput={this.makeInput}
              transactions={this.state.transactions}
              updateTransactions={this.updateTransactions} 
            />}
          />
          <Route exact path='/check' component={CheckBudget}/>
          <Route exact path='/create' component={CreateBudget}/>
        </div>
      </Router>
    )
  }
}

export default App
