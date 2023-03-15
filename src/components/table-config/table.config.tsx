import { TableConfigComponent, TableConfigItems } from './table.config.style'

export const TableConfig = () => {
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
