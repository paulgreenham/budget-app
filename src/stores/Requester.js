import axios from 'axios'

const url = process.env.PORT ? "" : "http://localhost:3723"

export class Requester {
    getAllBudgetItems = async () => {
        let itemsFromDB = await axios.get(`${url}/transactions`)
        return itemsFromDB.data
    }

    postBudgetItem = async transaction => {
        await axios.post(`${url}/transaction`, transaction)
    }

    editBudgetItem = async transaction => {
        let updated = await axios.put(`${url}/transaction`, transaction)
        return updated
    }

    deleteBudgetItem = async id => {
        await axios.delete(`${url}/transaction/${id}`)
    }
}