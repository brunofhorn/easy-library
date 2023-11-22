"use client";

import { Input, Button, Form, Select, message, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { api } from "@/lib/api";
import { IAuthor, IItemType, IPublishingCompany } from "@interfaces/common";
import { IFormItemPageProps } from "@interfaces/pages";
import { ItemRegisterForm, ItemRegisterScheme } from "@services/validations/item.scheme";
import Iconify from "@/components/shared/iconify";
import Typography from "@/components/shared/typography";

async function getAuthors() {
    const { data } = await api.get("authors");
    return data.authors.map((author: IAuthor) => {
        return { key: author.id, label: author.name, value: author.id };
    });
}

async function getItemTypes() {
    const { data } = await api.get("itemTypes");
    return data.itemTypes.map((type: IItemType) => {
        return { key: type.id, label: type.description, value: type.id };
    });
}

async function getPublishingCompanies() {
    const { data } = await api.get("publishingCompanies");
    return data.publishingCompanies.map((publishingCompany: IPublishingCompany) => {
        return { key: publishingCompany.id, label: publishingCompany.name, value: publishingCompany.id };
    });
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const FormItem = ({ onHandleItemRegister, onHandleItemUpdate, item, setItem }: IFormItemPageProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [listAuthors, setListAuthors] = useState([]);
    const [listItemTypes, setListItemTypes] = useState([]);
    const [listPublishingCompanies, setListPublishingCompanies] = useState([]);
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<ItemRegisterForm>({
        resolver: zodResolver(ItemRegisterScheme),
    });
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [coverImage, setCoverImage] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setCoverImage(newFileList);
        setValue("coverImage", newFileList[0].thumbUrl?.toString() ?? "");
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleCancel = () => setPreviewOpen(false);

    const currentYear = new Date().getFullYear();
    const endYear = 1950;

    const publicationYears: { label: string; value: string; }[] = Array.from(
        { length: currentYear - endYear + 1 },
        (_, index) => {
            const year = currentYear - index;
            return { label: year.toString(), value: year.toString() };
        }
    );

    const onSubmit = async (data: ItemRegisterForm) => {
        if (item) {
            try {
                const response = await api.put(`item/${item.id}`, { item });

                if (response.status == 200) {
                    reset();
                    onHandleItemUpdate(item);
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Ocorreu um erro ao tentar editar a obra.',
                });
            }
        } else {
            try {
                if (coverImage) {
                    const response = await api.post("item", { data: { ...data, coverImage: coverImage[0].thumbUrl } });

                    if (response.status === 201) {
                        reset();
                        onHandleItemRegister(response.data.createdItem);
                    }
                } else {
                    messageApi.open({
                        type: 'warning',
                        content: 'A imagem da capa é obrigatória.',
                    });
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Ocorreu um erro ao tentar cadastrar a obra.',
                });
            }
        }
    };

    const onCancel = () => {
        if (setItem) {
            setItem((prevItem) => null);
        }
    };

    const getListAuthors = async () => {
        const authors = await getAuthors();
        setListAuthors(authors);
    };

    const getListTypes = async () => {
        const types = await getItemTypes();
        setListItemTypes(types);
    };

    const getListPublishingCompanies = async () => {
        const publishingCompanies = await getPublishingCompanies();
        setListPublishingCompanies(publishingCompanies);
    };

    useEffect(() => {
        getListAuthors();
        getListTypes();
        getListPublishingCompanies();
    }, []);


    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-col w-9/12">
                        <div className="flex flex-row gap-4">
                            <Form.Item
                                label="Título da Obra"
                                hasFeedback
                                validateStatus={errors.title ? 'error' : ''}
                                help={errors.title?.message}
                                className="w-9/12"
                            >
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field: { value, onChange, ...rest } }) => (
                                        <Input
                                            placeholder="Digite o título da obra"
                                            size="large"
                                            value={item?.title ?? value ?? undefined}
                                            onChange={(e) => {
                                                if (setItem && item) {
                                                    setItem((prevItem) => {
                                                        if (prevItem) {
                                                            return { ...prevItem, title: e.target.value };
                                                        }
                                                        return null;
                                                    });
                                                }

                                                onChange(e);
                                            }}
                                            {...rest}
                                        />
                                    )} />
                            </Form.Item>
                            <Form.Item
                                label="Autor"
                                hasFeedback
                                validateStatus={errors.author ? 'error' : ""}
                                help={errors.author?.message}
                                className="w-3/12"
                            >
                                <Controller
                                    name="author"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Selecione o Autor"
                                            options={listAuthors}
                                            size="large"
                                            {...field}
                                        />
                                    )} />
                            </Form.Item>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Form.Item
                                label="Ano de Publicação"
                                hasFeedback
                                validateStatus={errors.publicationYear ? 'error' : ''}
                                help={errors.publicationYear?.message}
                                className="w-3/12"
                            >
                                <Controller
                                    name="publicationYear"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Selecione o ano"
                                            options={publicationYears}
                                            size="large"
                                            {...field}
                                        />
                                    )} />
                            </Form.Item>
                            <Form.Item
                                label="Páginas"
                                hasFeedback
                                validateStatus={errors.numberPages ? 'error' : ""}
                                help={errors.numberPages?.message}
                                className="w-3/12"
                            >
                                <Controller
                                    name="numberPages"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Qtd de páginas"
                                            size="large"
                                            type="number"
                                            {...field}
                                        />
                                    )} />
                            </Form.Item>
                            <Form.Item
                                label="Editora"
                                hasFeedback
                                validateStatus={errors.publishingCompanyId ? 'error' : ""}
                                help={errors.publishingCompanyId?.message}
                                className="w-3/12"
                            >
                                <Controller
                                    name="publishingCompanyId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Selecione a editora"
                                            options={listPublishingCompanies}
                                            size="large"
                                            {...field}
                                        />
                                    )} />
                            </Form.Item>
                            <Form.Item
                                label="Tipo"
                                hasFeedback
                                validateStatus={errors.itemTypeId ? 'error' : ""}
                                help={errors.itemTypeId?.message}
                                className="w-3/12"
                            >
                                <Controller
                                    name="itemTypeId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Selecione o Tipo"
                                            options={listItemTypes}
                                            size="large"
                                            {...field}
                                        />
                                    )} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="flex flex-col w-3/12">
                        <Form.Item
                            label="Imagem da Capa"
                            hasFeedback
                            validateStatus={errors.coverImage ? 'error' : ""}
                            help={errors.coverImage?.message}
                            className="w-12/12"
                        >
                            <ImgCrop aspect={9 / 16} cropShape="rect" modalTitle="Cortar Imagem" modalOk="Confirmar Corte">
                                <>
                                    <Upload
                                        accept=".jpg,.jpeg,.png"
                                        listType="picture-card"
                                        fileList={coverImage}
                                        maxCount={1}
                                        multiple={false}
                                        name="coverImage"
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                    >
                                        {coverImage.length < 5 && 'Selecionar Imagem'}
                                    </Upload>
                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </>
                            </ImgCrop>
                        </Form.Item>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Form.Item className="flex flex-row gap-2">
                        <Button type="default" htmlType="submit" className="flex flex-row gap-2 items-center justify-center">
                            <Iconify icon={item?.id ? "material-symbols-light:check" : "uiw:user-add"} />
                            <Typography variant="span">{item?.id ? "Salvar Alteração" : "Cadastrar Obra"}</Typography>
                        </Button>
                    </Form.Item>
                    {item?.id && (
                        <Form.Item className="flex flex-row gap-2">
                            <Button type="default" htmlType="button" onClick={() => onCancel()} className="flex flex-row gap-2 items-center justify-center">
                                <Iconify icon={"iconoir:cancel"} />
                                <Typography variant="span">Cancelar Edição</Typography>
                            </Button>
                        </Form.Item>
                    )}
                </div>
            </Form>
        </>
    );
};