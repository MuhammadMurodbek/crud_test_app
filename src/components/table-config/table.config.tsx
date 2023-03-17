import { useState } from 'react'
import { ModalAddProduct } from './add.modal'
import {
    TableConfigComponent,
    TableConfigItems,
    TableLabel,
} from './table.config.style'
import { Button, Select, Input } from 'antd'
import { useFilter } from '../../service/pagin.store/pagin'

export const TableConfig = ({
    categories,
    refetchCategories,
    refetchProducts,
}: any) => {
    const { Search } = Input
    const { filter, setFilter } = useFilter()
    const [addModal, setAddModal] = useState<boolean>(false)
    const onSearch = (value: string) =>
        setFilter({ ...filter, name_like: value })
    return (
        <TableConfigComponent>
            <TableLabel>Products</TableLabel>
            <TableConfigItems>
                <Button
                    onClick={() => {
                        setFilter({
                            ...filter,
                            name_like: null,
                            category: null,
                        })
                    }}
                >
                    refresh
                </Button>
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    enterButton
                />
                <Button onClick={() => setAddModal(true)}>Add</Button>
                <Select
                    defaultValue={{ value: 'all', label: 'All' }}
                    style={{ width: 150 }}
                    options={categories || [{}]}
                    onSelect={(e) => setFilter({ ...filter, category: e })}
                />
            </TableConfigItems>
            <ModalAddProduct
                addModal={addModal}
                setAddModal={setAddModal}
                categories={categories}
                refetch={() => refetchProducts()}
            />
        </TableConfigComponent>
    )
}
