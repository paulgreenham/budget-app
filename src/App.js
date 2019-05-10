import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import './App.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="main-container">
          <div id="nav-bar">
            <div class="nav-button" id="budgets">Budgets</div>
            <div class="nav-button" id="bank-statements">Bank Statements</div>
            <div class="nav-button" id="investments">Investments</div>
            <div class="nav-button" id="taxes">Taxes</div>
          </div>
          <div id="content-container">
            <div id="main-content">
                <h1>Money Logger</h1>
                <p>What would you like to do today?</p>
            </div>
          </div>
          <div id="selections-container">
            <div class="selection" id="add">Add budget item</div>
            <div class="selection" id="check">Check budget</div>
            <div class="selection" id="create">Create new budget</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
