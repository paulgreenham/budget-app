import { observable, action } from 'mobx'
import { Requester } from './Requester'

const requester = new Requester()

export class Budget {
    @observable year = ""
    @observable currentMonth = new Date().getMonth()
    @observable transactions = []
    @observable currentMonthTransactions = []
    @observable categories = []
    @observable spendingByCategory = {}
    @observable budget = {}

    @action updateTransactions = async () => {
        let transactions = await requester.getAllBudgetItems()
        this.transactions = transactions
        this.getTransactionsByMonth()
    }

    @action postTransaction = async transaction => {
        await requester.postBudgetItem(transaction)
        this.updateTransactions()
    }

    @action editTransaction = async transaction => {
        let updated = await requester.editBudgetItem(transaction)
        this.updateTransactions()
        return updated
    }

    @action deleteTransaction = async id => {
        await requester.deleteBudgetItem(id)
        this.updateTransactions()
    }

    @action changeMonth = month => {
        this.currentMonth = month
        this.getTransactionsByMonth()
    }

    @action getTransactionsByMonth = () => {
        this.currentMonthTransactions = this.transactions.filter(t => new Date(t.date).getMonth() === this.currentMonth)
    }

    @action getSpendingByCategory = () => {
        this.setSpendingCategories()
        for(let item of this.transactions) {
            if(this.excludeType(item, "income")) { continue }
            this.spendingByCategory[item.category] += Number(item.amount)
        }        
    }

    @action updateCategories = async () => {
        await this.updateTransactions()
        this.getCurrentBudget()     //later will also be await for DB query
        this.getSpendingByCategory()
    }

    constructor(year) {
        this.year = year
    }

    getCurrentBudget = () => {  //this will eventually pull from the user's previous input in the database, for now it generates the object from the transactions
        for(let item of this.transactions) {
            if(this.budget[item.category]) { continue }
            else {
                this.budget[item.category] = {
                    type: item.type,
                    amount: 0
                }
            }
        }
    }

    excludeType = (transaction, type) => transaction.type === type

    setSpendingCategories = () => {
        for(let category of Object.keys(this.budget)) {
            if(this.excludeType(this.budget[category], "income")) { continue }
            this.spendingByCategory[category] = 0
        }
    }
}