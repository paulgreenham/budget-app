import { observable, action } from 'mobx'
import { Requester } from './Requester'

const requester = new Requester()

export class Budget {
    @observable year = ""
    @observable currentMonth = new Date().getMonth()
    @observable transactions = []
    @observable currentMonthTransactions = []
    @observable categories = []
    @observable budgetByCategory = {}

    @action updateTransactions = async () => {
        let transactions = await requester.getAllBudgetItems()
        this.transactions = transactions
        this.getTransactionsByMonth()
    }

    @action makeInput = async transaction => {
        await requester.postBudgetItem(transaction)
        this.updateTransactions()
    }

    @action editTransaction = async transaction => {
        let updated = await requester.editBudgetItem(transaction)
        this.updateTransactions()
        return updated
    }

    @action changeMonth = month => {
        this.currentMonth = month
        this.getTransactionsByMonth()
    }

    @action getTransactionsByMonth = () => {
        this.currentMonthTransactions = this.transactions.filter(t => new Date(t.date).getMonth() === this.currentMonth)
    }

    @action getSpendingByCategory = () => {
        //return object with current expenditure totals in each category
    }

    constructor(year) {
        this.year = year
    }
}