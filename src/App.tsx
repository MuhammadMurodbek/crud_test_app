import { useQuery } from 'react-query'
import { TableData } from './components/datatable'
import { Navbar } from './components/navbar'
import { TableConfig } from './components/table-config'
import { getCategories } from './service/queries/api.get.products'
function App() {
    const { data: categories } = useQuery('getCategory', getCategories, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
    console.log(categories)
    return (
        <div style={{ marginTop: 60 }}>
            <Navbar />
            <TableConfig {...categories} />
            <TableData {...categories} />
        </div>
    )
}

export default App
