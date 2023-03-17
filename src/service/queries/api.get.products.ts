import axios from 'axios'
const baseUrl = import.meta.env.VITE_SERVER_URL
export const getProducts = ({ _limit, _page, category, name_like }: any) => {
    let params = {
        category: category,
        name_like: name_like,
        _page,
        _limit,
    }
    return axios.get(`${baseUrl}/products`, { params: params })
}
export const getProductsById = (id: number | undefined) =>
    axios.get(`${baseUrl}/products?id=` + id)

export const getCategories = () => axios.get(`${baseUrl}/categories`)
