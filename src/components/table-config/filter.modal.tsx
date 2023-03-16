import React, { useState } from 'react'
import { Button, Modal } from 'antd'

type TModalProps = {
    filterModal: boolean
    setFilterModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalFilterProduct: React.FC<TModalProps> = ({
    filterModal,
    setFilterModal,
}) => {
    const showModal = () => {
        setFilterModal(true)
    }

    const handleOk = () => {
        setFilterModal(false)
    }

    const handleCancel = () => {
        setFilterModal(false)
    }

    return (
        <>
            <Modal
                title="Basic Modal"
                open={filterModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}
