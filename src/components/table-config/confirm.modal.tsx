import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'

const App: React.FC = () => {
    const [modal, contextHolder] = Modal.useModal()

    const confirm = () => {
        modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {},
        })
    }

    return (
        <>
            <Space>
                <Button onClick={confirm}>Confirm</Button>
            </Space>
            {contextHolder}
        </>
    )
}
