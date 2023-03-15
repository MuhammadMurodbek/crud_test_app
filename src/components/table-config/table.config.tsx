import { useState } from 'react'
import { TableConfigComponent, TableConfigItems } from './table.config.style'

export const TableConfig = () => {
    const [addModal, setAddModal] = useState(false)

    const showModal = () => {
        setAddModal(true)
    }

    const handleOk = () => {
        setAddModal(false)
    }

    const handleCancel = () => {
        setAddModal(false)
    }
    return (
        <TableConfigComponent>
            <div>Products</div>
            <TableConfigItems>
                <div>refresh</div>
                <div>add</div>
                <div>filter</div>
            </TableConfigItems>
        </TableConfigComponent>
    )
}
