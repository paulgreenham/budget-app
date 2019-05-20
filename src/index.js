import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Budget } from './stores/Budget'
import { AllBudgets } from './stores/AllBudgets'
import { Provider } from 'mobx-react'
import { GeneralStore } from './stores/GeneralStore';

const budgets = new AllBudgets()
budgets.addBudget(new Budget(2019))
const currentBudget = budgets.getBudget(2019)
const generalStore = new GeneralStore()
const stores = {generalStore, currentBudget}

ReactDOM.render(
<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'))

serviceWorker.unregister()