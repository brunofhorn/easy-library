"use client";

import { Input, Button, Form, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormPublishingCompanyPageProps } from "@interfaces/pages";
import { PublishingCompanyRegisterForm, PublishingCompanyRegisterScheme } from "@services/validations/publishingCompany.scheme";
import { api } from "@/lib/api";
import Iconify from "@/components/shared/iconify";
import Typography from "@/components/shared/typography";

export default function FormPublishingCompany({ onHandlePublishingCompanyRegister, onHandlePublishingCompanyUpdate, publishingCompany, setPublishingCompany }: IFormPublishingCompanyPageProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<PublishingCompanyRegisterForm>({
        resolver: zodResolver(PublishingCompanyRegisterScheme),
    });

    const onSubmit = async (data: PublishingCompanyRegisterForm) => {
        if (publishingCompany) {
            try {
                const response = await api.put(`publishingCompany/${publishingCompany.id}`, { publishingCompany });

                if (response.status == 200) {
                    reset();
                    onHandlePublishingCompanyUpdate(publishingCompany);
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Ocorreu um erro ao tentar editar a editora.',
                });
            }
        } else {
            try {
                const response = await api.post("publishingCompany", { data });

                if (response.status === 201) {
                    reset();
                    onHandlePublishingCompanyRegister(response.data.createdPublishingCompany);
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Ocorreu um erro ao tentar cadastrar a editora.',
                });
            }
        }
    };

    const onCancel = () => {
        if (setPublishingCompany) {
            setPublishingCompany((prevPublishingCompany) => null);
        }
    };


    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                <div className="flex flex-row gap-4">
                    <Form.Item
                        label="Nome da Editora"
                        hasFeedback
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name?.message}
                        className="w-full"
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <Input
                                    placeholder="Digite o nome da editora"
                                    size="large"
                                    value={publishingCompany?.name ?? value ?? undefined}
                                    onChange={(e) => {
                                        if (setPublishingCompany && publishingCompany) {
                                            setPublishingCompany((publishingCompany) => {
                                                if (publishingCompany) {
                                                    return { ...publishingCompany, name: e.target.value };
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
                </div>
                <div className="flex gap-4">
                    <Form.Item className="flex flex-row gap-2">
                        <Button type="default" htmlType="submit" className="flex flex-row gap-2 items-center justify-center">
                            <Iconify icon={publishingCompany?.id ? "material-symbols-light:check" : "uiw:user-add"} />
                            <Typography variant="span">{publishingCompany?.id ? "Salvar Alteração" : "Cadastrar Editora"}</Typography>
                        </Button>
                    </Form.Item>
                    {publishingCompany?.id && (
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