import axios from 'axios'

export const getProducts = () => axios.get('http://localhost:2288/products')
export const getProductsById = (id: number | undefined) =>
    axios.get('http://localhost:2288/products?id=' + id)
