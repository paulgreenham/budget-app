import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../style/home.css'

class Home extends Component {

  render() {
    return (<div id="main-container">
      <div id="content-container">
        <div id="main-content">
          <h1>Money Logger</h1>
          <p>What would you like to do today?</p>
        </div>
      </div>
      <div id="selections-container">
        <Link to='/modify' className="selection" id="add">Add or Change budget items</Link>
        <Link to='/check' className="selection" id="check">Check budget</Link>
        <Link to='/create' className="selection" id="create">Create new budget</Link>
      </div>
    </div>)
  }
}

export default Home