import axios from 'axios'
const baseUrl = import.meta.env.VITE_SERVER_URL
export const addProducts = (payload: any) =>
    axios.post(`${baseUrl}/products`, payload)

export const putProducts = (payload: any) =>
    axios.put(`${baseUrl}/products/${payload.id}`, payload)
