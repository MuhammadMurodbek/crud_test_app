import axios from 'axios'

export const getProducts = ({ category, name_like }: any) => {
    let params = {
        category: null,
        name_like: null,
    }
    return axios.get('http://localhost:2288/products', { params: params })
}
export const getProductsById = (id: number | undefined) =>
    axios.get('http://localhost:2288/products?id=' + id)

export const getCategories = () => axios.get('http://localhost:2288/categories')
