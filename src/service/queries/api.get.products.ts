import axios from 'axios'

export const getProducts = () => axios.get('http://localhost:2288/products')
