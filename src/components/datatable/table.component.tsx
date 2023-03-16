import React, { useState } from 'react'
import { Space, Table, Tag, Button, Image } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { TableComponent } from './table.style'
import { useQuery } from 'react-query'
import { getProducts } from '../../service/queries/api.get.products'
import { ModalAddProduct } from '../table-config/add.modal'
import { useFilter } from '../../service/pagin.store/pagin'
import type { FilterValue } from 'antd/es/table/interface'
interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}
const data: DataType[] = []

export const TableData = () => {
    const { filter, setFilter } = useFilter()
    const { data: products } = useQuery(
        ['products', filter],
        () => getProducts(filter),
        {
            enabled: !!filter,
        }
    )
    console.log(products)
    const [addModal, setAddModal] = useState<boolean>(false)
    const [idProduct, setIdProduct] = useState<number>(0)
    const columns: ColumnsType<DataType> = [
        {
            title: 'Image',
            dataIndex: 'imageSrc',
            key: 'imageSrc',
            render: (src) => <Image src={src} alt="image" />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: 'category',
            render: (_, { tags }) => (
                <>
                    <Tag color="blue">oops</Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="small" style={{ width: 10 }}>
                    <Button
                        onClick={() => {
                            setIdProduct(record?.id)
                            setAddModal(true)
                        }}
                    >
                        update
                    </Button>
                    <Button>remove</Button>
                </Space>
            ),
        },
    ]
    return (
        <>
            <TableComponent>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={products?.data}
                    pagination={{
                        current: filter?._page,
                        pageSize: filter?._limit,
                        total: products?.headers['x-total-count'],
                        onChange: (e) => setFilter({ ...filter, _page: e }),
                    }}
                />
            </TableComponent>
            <ModalAddProduct
                edit={true}
                id={idProduct}
                addModal={addModal}
                setAddModal={setAddModal}
            />
        </>
    )
}
