import axios from 'axios'

export const deleteProduct = (id: number) =>
    axios.delete(`http://localhost:2288/products/${id}`)
