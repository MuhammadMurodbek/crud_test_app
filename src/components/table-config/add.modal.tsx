import React, { useState } from 'react'
import ImageUploader, { FileObjectType } from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import { Modal, Input, Button, Image } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import {
    addProducts,
    putProducts,
} from '../../service/queries/api.add.products'
import { getProductsById } from '../../service/queries/api.get.products'
import { UploadOutlined } from '@ant-design/icons'

type TModalProps = {
    edit?: boolean
    id?: number
    addModal: boolean
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalAddProduct: React.FC<TModalProps> = ({
    edit,
    id,
    addModal,
    setAddModal,
}) => {
    const [imageUrl, setImageUrl] = useState<{
        image: string
        edited: boolean
    }>({ image: '', edited: false })
    const { mutateAsync } = useMutation(addProducts)
    const { mutateAsync: updateAsync } = useMutation(putProducts)
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

        if (!imageUrl?.image) return alert('image not defined')
        if (edit) updateAsync(postData)
        else mutateAsync(postData)
    }

    const handleOk = () => {
        setAddModal(false)
    }

    const handleCancel = () => {
        setAddModal(false)
    }
    const getImageFileObject = (imageFile: any) => {
        setImageUrl({ image: imageFile.file, edited: true })
    }
    const runAfterImageDelete = (img: FileObjectType): any => {
        setImageUrl({ image: '', edited: true })
    }
    return (
        <>
            <Modal
                title="Basic Modal"
                open={addModal}
                footer={null}
                onCancel={handleCancel}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        control={control}
                        render={({ field }: any) => <Input {...field} />}
                    />
                    <Controller
                        name="description"
                        defaultValue=""
                        control={control}
                        render={({ field }: any) => <Input {...field} />}
                    />
                    <Controller
                        name="price"
                        defaultValue=""
                        control={control}
                        render={({ field }: any) => (
                            <Input type="number" {...field} />
                        )}
                    />
                    <Controller
                        name="category"
                        defaultValue=""
                        control={control}
                        render={({ field }: any) => <Input {...field} />}
                    />
                    <Button htmlType="submit">submit</Button>
                </form>
            </Modal>
        </>
    )
}
