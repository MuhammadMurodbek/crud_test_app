import React from 'react'
import { Space, Table, Tag, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableComponent } from './table.style'
import { useQuery } from 'react-query'
import { getProducts } from '../../service/queries/api.get.products'

interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Image',
        dataIndex: 'imageSrc',
        key: 'imageSrc',
        render: (src) => <img src={src} alt="image" />,
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
        render: (_, record) => (
            <Space size="small" style={{ width: 10 }}>
                <Button>update</Button>
                <Button>remove</Button>
            </Space>
        ),
    },
]

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
]

export const TableData = () => {
    const { data: products } = useQuery('products', getProducts)
    console.log(products)
    return (
        <TableComponent>
            <Table columns={columns} dataSource={products?.data} />
        </TableComponent>
    )
}
