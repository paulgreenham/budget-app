import axios from 'axios'

export class Requester {
    getAllBudgetItems = async () => {
        let itemsFromDB = await axios.get('http://localhost:3723/transactions')
        return itemsFromDB.data
    }

    postBudgetItem = async transaction => {
        await axios.post('http://localhost:3723/transaction', transaction)
    }

    editBudgetItem = async transaction => {
        let updated = await axios.put('http://localhost:3723/transaction', transaction)
        return updated
    }
}