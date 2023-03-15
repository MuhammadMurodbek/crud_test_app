import { useState } from 'react'
import { TableData } from './components/datatable'
import { Navbar } from './components/navbar'
import { TableConfig } from './components/table-config'
function App() {
    return (
        <div style={{ marginTop: 60 }}>
            <Navbar />
            <TableConfig />
            <TableData />
        </div>
    )
}

export default App
