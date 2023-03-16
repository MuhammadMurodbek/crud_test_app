import axios from 'axios'

export const addProducts = (payload: any) =>
    axios.post('http://localhost:2288/products', payload)

export const putProducts = (payload: any) =>
    axios.put(`http://localhost:2288/products/${payload.id}`, payload)
