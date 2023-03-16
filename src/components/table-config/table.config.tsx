import { useState } from 'react'
import { ModalAddProduct } from './add.modal'
import { ModalFilterProduct } from './filter.modal'
import { TableConfigComponent, TableConfigItems } from './table.config.style'
import { Button, Select, Input } from 'antd'
import { useFilter } from '../../service/pagin.store/pagin'
import { useQuery } from 'react-query'
import { getCategories } from '../../service/queries/api.get.products'

export const TableConfig = () => {
    const { Search } = Input
    const { filter, setFilter } = useFilter()
    const { data: categories } = useQuery('getCategory', getCategories)
    const [addModal, setAddModal] = useState(false)
    const [filterModal, setFilterModal] = useState(false)
    const onSearch = (value: string) =>
        setFilter({ ...filter, name_like: value })
    return (
        <TableConfigComponent>
            <div>Products</div>
            <TableConfigItems>
                <Button>refresh</Button>
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    enterButton
                />
                <Button onClick={() => setAddModal(true)}>Add</Button>
                <Select
                    defaultValue={{ value: 'all', label: 'All' }}
                    style={{ width: 150 }}
                    options={categories?.data}
                    onSelect={(e) => setFilter({ ...filter, category: e })}
                />
            </TableConfigItems>
            <ModalAddProduct addModal={addModal} setAddModal={setAddModal} />
            <ModalFilterProduct
                filterModal={filterModal}
                setFilterModal={setFilterModal}
            />
        </TableConfigComponent>
    )
}
