import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useQuery } from 'react-query'
import { TableData } from './components/datatable'
import { Navbar } from './components/navbar'
import { TableConfig } from './components/table-config'
import { useFilter } from './service/pagin.store/pagin'
import { getCategories, getProducts } from './service/queries/api.get.products'

interface IApiError {
    message: string
    description: string
    statusCode: string | number
}

function App() {
    const [modal, contextHolder] = Modal.useModal()
    const { filter, setFilter } = useFilter()
    const { data: categories, refetch: refetchCategories } = useQuery(
        'getCategory',
        getCategories,
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            onError: (err: IApiError) => {
                modal.confirm({
                    title: 'Something went wrong.',
                    icon: <ExclamationCircleOutlined />,
                    content: `Could not load Products, Message:${err?.message}`,
                    okText: 'Retry',
                    cancelText: 'Cancel',
                    onOk: () => refetchCategories(),
                })
            },
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
        onError: (err: IApiError) => {
            modal.confirm({
                title: 'Something went wrong.',
                icon: <ExclamationCircleOutlined />,
                content: `Could not load Categories, Message:${err?.message}`,
                okText: 'Retry',
                cancelText: 'Cancel',
                onOk: () => refetchProducts(),
            })
        },
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
            {contextHolder}
        </div>
    )
}

export default App
