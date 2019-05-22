import { observable, action } from 'mobx'

export class GeneralStore {
    @observable budgetItem = {
        category: "",
        amount: 0,
        date: this.formatDate(new Date()),
        description: ""
    }

    @observable isEditMode = false

    @action changeEditMode = bool => this.isEditMode = bool

    @action getInput = (key, value) => {
        this.budgetItem[key] = value
    }

    @action resetItem = () => {
        this.budgetItem = {
            category: "",
            amount: 0,
            date: this.formatDate(new Date()),
            description: ""
        }
    }

    @action setItem = item => {
        this.budgetItem = {
            _id: item._id,
            category: item.category,
            amount: item.amount,
            date: this.formatDate(item.date),
            description: item.description,
            type: item.type
        }
    }

    @action addItemType = isExpense => {
        this.budgetItem.type = isExpense ? "expense" : "income"
    }

    @action isBudgetItemEmpty = () => {
        for (let key of Object.keys(this.budgetItem)) {
            if (this.budgetItem[key] === "") {
                return true
            }
        }
        return false
    }

    formatDate(dateStamp) {
        let date = new Date(dateStamp)
        let monthNum = (new Date(date).getMonth() + 1).toString()
        let monthPref = monthNum.length < 2 ? "0" : ""
        return new Date(date).getFullYear() + "-" + monthPref + monthNum + "-" + new Date(date).getDate()
    }
}