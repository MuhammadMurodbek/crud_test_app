import React, { useState } from 'react'
import ImageUploader, { FileObjectType } from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import { Modal, Input, Button, Image, Switch, Select } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import {
    addProducts,
    putProducts,
} from '../../service/queries/api.add.products'
import { getProductsById } from '../../service/queries/api.get.products'
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { ErrorField, FlexButtons, ModalForm } from './modal.style'
import TextArea from 'antd/es/input/TextArea'

type TModalProps = {
    refetch: () => void
    edit?: boolean
    id?: number
    addModal: boolean
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>
    categories: any[]
}
interface IApiError {
    message: string
    description: string
    statusCode: string | number
}

export const ModalAddProduct: React.FC<TModalProps> = ({
    refetch,
    edit,
    id,
    addModal,
    setAddModal,
    categories,
}) => {
    const [modal, contextHolder] = Modal.useModal()
    const [imageUrl, setImageUrl] = useState<{
        image: string
        edited: boolean
    }>({ image: '', edited: false })
    const { mutateAsync, isLoading: isLoadingAdd } = useMutation(addProducts, {
        onSuccess: () => {
            refetch()
            handleCancel()
        },
        onError: (err: IApiError) => {
            modal.confirm({
                title: 'Something went wrong.',
                icon: <ExclamationCircleOutlined />,
                content: `Could not add product, Message:${err?.message}`,
                okText: 'Ok',
                cancelText: 'Cancel',
            })
        },
    })
    const { mutateAsync: updateAsync, isLoading: isLoadingUpdate } =
        useMutation(putProducts, {
            onSuccess: () => {
                refetch()
                handleCancel()
            },
        })
    const { data } = useQuery(
        ['getGroupPupil', id],
        () => getProductsById(id),
        {
            onSuccess: (res: any) => {
                reset(res?.data?.at(0))
                setImageUrl({
                    ...imageUrl,
                    image: res?.data?.at(0)?.imageSrc,
                })
            },
            onError: (err: IApiError) => {
                modal.confirm({
                    title: 'Something went wrong.',
                    icon: <ExclamationCircleOutlined />,
                    content: `Could not update product, Message:${err?.message}`,
                    okText: 'Ok',
                    cancelText: 'Cancel',
                })
            },
            enabled: !!id,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchInterval: false,
            retry: false,
        }
    )
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data: any) => {
        if (!imageUrl?.image) return alert('image not defined')
        const toBase64 = (file: any) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
            })
        let postData = {
            ...data,
            imageSrc: imageUrl?.edited
                ? await toBase64(imageUrl.image)
                : imageUrl?.image,
        }

        if (edit) updateAsync(postData)
        else mutateAsync(postData)
    }

    const handleCancel = () => {
        reset({})
        setImageUrl({ image: '', edited: false })
        setAddModal(false)
    }
    const getImageFileObject = (imageFile: any) => {
        setImageUrl({ image: imageFile.file, edited: true })
    }
    const runAfterImageDelete = (img: FileObjectType): any => {
        setImageUrl({ image: '', edited: true })
    }
    console.log(categories)
    return (
        <>
            <Modal
                title="Basic Modal"
                open={addModal}
                footer={null}
                width={450}
                onCancel={handleCancel}
            >
                <ModalForm onSubmit={handleSubmit(onSubmit)}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            position: 'relative',
                        }}
                    >
                        <ImageUploader
                            uploadIcon={
                                <>
                                    <UploadOutlined
                                        style={{
                                            fontSize: '16px',
                                            color: '#fff',
                                            background: '#3337',
                                            borderRadius: '50%',
                                            padding: 10,
                                        }}
                                    />
                                </>
                            }
                            style={{ background: 'transparent' }}
                            onFileAdded={(img) => getImageFileObject(img)}
                            onFileRemoved={(img) => runAfterImageDelete(img)}
                        />
                        {imageUrl?.edited ? null : (
                            <Image
                                style={{
                                    position: 'absolute',
                                    width: 100,
                                    height: 100,
                                    top: -50,
                                    left: -100,
                                }}
                                src={imageUrl?.image}
                                alt="image"
                            />
                        )}
                    </div>

                    <Controller
                        name="name"
                        defaultValue=""
                        rules={{ required: true }}
                        control={control}
                        render={({ field }: any) => (
                            <>
                                <Input {...field} placeholder="Name" />
                                {errors?.name && (
                                    <ErrorField>name is required</ErrorField>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name="price"
                        defaultValue=""
                        rules={{ required: true }}
                        control={control}
                        render={({ field }: any) => (
                            <>
                                <Input
                                    type="number"
                                    {...field}
                                    placeholder="Price"
                                />
                                {errors?.price && (
                                    <ErrorField>Price is required</ErrorField>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name="category"
                        rules={{ required: true }}
                        control={control}
                        render={({ field }: any) => (
                            <>
                                <Select
                                    {...field}
                                    options={categories}
                                    placeholder="Category"
                                />
                                {errors?.category && (
                                    <ErrorField>
                                        category is required
                                    </ErrorField>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name="description"
                        defaultValue=""
                        rules={{ required: true }}
                        control={control}
                        render={({ field }: any) => (
                            <>
                                <TextArea
                                    {...field}
                                    placeholder="Description"
                                    style={{ minHeight: 100 }}
                                />
                                {errors?.description && (
                                    <ErrorField>
                                        description is required
                                    </ErrorField>
                                )}
                            </>
                        )}
                    />
                    <FlexButtons>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            loading={isLoadingAdd || isLoadingUpdate}
                        >
                            Save
                        </Button>
                    </FlexButtons>
                </ModalForm>
                {contextHolder}
            </Modal>
        </>
    )
}
