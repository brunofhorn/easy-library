"use client";

import { Input, Button, Form, Select, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormAuthorPageProps } from "@interfaces/pages";
import { AuthorRegisterForm, AuthorRegisterScheme } from "@services/validations/author.scheme";
import { api } from "@/lib/api";
import { nationalities } from "@data/nationality";
import Iconify from "@/components/shared/iconify";
import Typography from "@/components/shared/typography";

export default function FormAuthor({ onHandleAuthorRegister, onHandleAuthorUpdate, author, setAuthor }: IFormAuthorPageProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<AuthorRegisterForm>({
        resolver: zodResolver(AuthorRegisterScheme),
    });

    const onSubmit = async (data: AuthorRegisterForm) => {
        if (author) {
            try {
                const response = await api.put(`author/${author.id}`, { author });

                if (response.status == 200) {
                    reset();
                    onHandleAuthorUpdate(author);
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Ocorreu um erro ao tentar editar o autor.',
                });
            }
        } else {
            try {
                const response = await api.post("author", { data });

                if (response.status === 201) {
                    reset();
                    onHandleAuthorRegister(response.data.createdAuthor);
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Ocorreu um erro ao tentar cadastrar o autor.',
                });
            }
        }
    };

    const onCancel = () => {
        if (setAuthor) {
            setAuthor((prevAuthor) => null);
        }
    };


    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                <div className="flex flex-row gap-4">
                    <Form.Item
                        label="Nome do Autor"
                        hasFeedback
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name?.message}
                        className="w-9/12"
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <Input
                                    placeholder="Digite o nome do autor"
                                    size="large"
                                    value={author?.name ?? value ?? undefined}
                                    onChange={(e) => {
                                        if (setAuthor && author) {
                                            setAuthor((prevAuthor) => {
                                                if (prevAuthor) {
                                                    return { ...prevAuthor, name: e.target.value };
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
                        label="Nacionalidade"
                        hasFeedback
                        validateStatus={errors.nationality ? 'error' : ""}
                        help={errors.nationality?.message}
                        className="w-3/12"
                    >
                        <Controller
                            name="nationality"
                            control={control}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <Select
                                    placeholder="Selecione a nacionalidade"
                                    options={nationalities}
                                    size="large"
                                    value={author ? author?.nationality : value ? value : undefined}
                                    onChange={(selectedValue) => {
                                        onChange(selectedValue);

                                        if (setAuthor && author) {
                                            setAuthor((prevAuthor) => {
                                                if (prevAuthor) {
                                                    return { ...prevAuthor, nationality: selectedValue };
                                                }
                                                return null;
                                            });
                                        }

                                    }}
                                    {...rest}
                                />
                            )} />
                    </Form.Item>
                </div>
                <div className="flex gap-4">
                    <Form.Item className="flex flex-row gap-2">
                        <Button type="default" htmlType="submit" className="flex flex-row gap-2 items-center justify-center">
                            <Iconify icon={author?.id ? "material-symbols-light:check" : "uiw:user-add"} />
                            <Typography variant="span">{author?.id ? "Salvar Alteração" : "Cadastrar Autor"}</Typography>
                        </Button>
                    </Form.Item>
                    {author?.id && (
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