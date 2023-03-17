import { useQuery } from 'react-query'
import { TableData } from './components/datatable'
import { Navbar } from './components/navbar'
import { TableConfig } from './components/table-config'
import { useFilter } from './service/pagin.store/pagin'
import { getCategories, getProducts } from './service/queries/api.get.products'
function App() {
    const { filter, setFilter } = useFilter()
    const { data: categories, refetch: refetchCategories } = useQuery(
        'getCategory',
        getCategories,
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    )

    const {
        data: products,
        refetch: refetchProducts,
        isLoading: isLoadingProduct,
    } = useQuery(['products', filter], () => getProducts(filter), {
        enabled: !!filter,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
    const props = {
        filter,
        products,
        setFilter,
        refetchProducts,
        refetchCategories,
        isLoadingProduct,
        categories: categories?.data,
    }
    return (
        <div style={{ marginTop: 60 }}>
            <Navbar />
            <TableConfig {...props} />
            <TableData {...props} />
        </div>
    )
}

export default App
