import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import Modify from './components/transactions/Modify'
import CheckBudget from './components/CheckBudget'
import CreateBudget from './components/CreateBudget'

import './App.css'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div id="nav-bar">
            <Link to='/' className="nav-button" id="home-button">Home</Link>
            <Link to='/modify' className="nav-button" id="add-button">Add/Edit</Link>
            <Link to='/check' className="nav-button" id="check-button">Check Budget</Link>
            <Link to='/create' className="nav-button" id="new-button">New Budget</Link>
          </div>
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/modify' render={() => <Modify />} />
          <Route exact path='/check' component={CheckBudget} />
          <Route exact path='/create' component={CreateBudget} />
        </div>
      </Router>
    )
  }
}

export default App
