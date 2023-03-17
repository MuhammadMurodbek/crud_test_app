import { useState } from 'react'
import { ModalAddProduct } from './add.modal'
import { TableConfigComponent, TableConfigItems } from './table.config.style'
import { Button, Select, Input } from 'antd'
import { useFilter } from '../../service/pagin.store/pagin'

export const TableConfig = ({ data }: { data: any[] }) => {
    const { Search } = Input
    const { filter, setFilter } = useFilter()
    const [addModal, setAddModal] = useState(false)
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
                    options={data}
                    onSelect={(e) => setFilter({ ...filter, category: e })}
                />
            </TableConfigItems>
            <ModalAddProduct
                addModal={addModal}
                setAddModal={setAddModal}
                categories={data}
            />
        </TableConfigComponent>
    )
}
