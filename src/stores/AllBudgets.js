import { observable, action } from 'mobx'

export class AllBudgets {
    @observable budgetList = []

    @action addBudget = budget => {
        this.budgetList.push(budget)
    }

    @action getBudget = year => {
        return this.budgetList.find(b => b.year === year)
    }
}