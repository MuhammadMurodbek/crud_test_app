import axios from 'axios'
const baseUrl = import.meta.env.VITE_SERVER_URL
export const deleteProduct = (id: number) =>
    axios.delete(`${baseUrl}/products/${id}`)
