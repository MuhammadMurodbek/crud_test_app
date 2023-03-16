import { useState } from 'react'
import { ModalAddProduct } from './add.modal'
import { ModalFilterProduct } from './filter.modal'
import { TableConfigComponent, TableConfigItems } from './table.config.style'
import { Button } from 'antd'

export const TableConfig = () => {
    const [addModal, setAddModal] = useState(false)
    const [filterModal, setFilterModal] = useState(false)
    return (
        <TableConfigComponent>
            <div>Products</div>
            <TableConfigItems>
                <Button>refresh</Button>
                <Button onClick={() => setAddModal(true)}>Add</Button>
                <Button onClick={() => setFilterModal(true)}>filter</Button>
            </TableConfigItems>
            <ModalAddProduct addModal={addModal} setAddModal={setAddModal} />
            <ModalFilterProduct
                filterModal={filterModal}
                setFilterModal={setFilterModal}
            />
        </TableConfigComponent>
    )
}
