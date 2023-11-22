"use client";

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Form, Input, message } from "antd";
import locale from 'antd/lib/date-picker/locale/pt_BR';
import dayjs from "dayjs";
import moment from "moment";
import { useEffect } from "react";
import { IFormReaderPageProps } from '@interfaces/pages';
import { ReaderRegisterForm, ReaderRegisterScheme } from '@services/validations/reader.scheme';
import { api } from '@/lib/api';
import Iconify from '@/components/shared/iconify';
import Typography from '@/components/shared/typography';

export default function FormReader({ onHandleReaderRegister, onHandleReaderUpdate, reader, setReader }: IFormReaderPageProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<ReaderRegisterForm>({
        resolver: zodResolver(ReaderRegisterScheme),
        defaultValues: {
            name: reader?.name ?? "",
            username: reader?.username ?? "",
            email: reader?.email ?? "",
            birthDate: reader?.birthDate ?? ""
        }
    });

    const onSubmit = async (data: ReaderRegisterForm) => {
        if (reader) {
            try {
                const response = await api.put(`reader/${reader.id}`, { reader });

                if (response.status == 200) {
                    reset();
                    onHandleReaderUpdate(reader);
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Ocorreu um erro ao tentar editar o leitor.',
                });
            }
        } else {
            try {
                const response = await api.post("reader", { data: { ...data, birthDate: moment(data.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD') } });

                if (response.status === 201) {
                    reset();
                    setValue("birthDate", "");
                    onHandleReaderRegister(response.data.createdReader);
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Ocorreu um erro ao tentar cadastrar o leitor.',
                });
            }
        }
    };

    const onCancel = () => {
        if (setReader) {
            setReader((prevReader) => null);
        }
    };

    const handleBlurName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("username", e?.target?.value?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ".").replace(/'/g, '').trim().toLowerCase());
    };

    useEffect(() => {
        setValue("name", reader?.name ?? "");
        setValue("username", reader?.username ?? "");
        setValue("email", reader?.email ?? "");
        setValue("birthDate", reader?.birthDate ?? "");
    }, [reader, setValue]);

    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                <div className="flex flex-row gap-4">
                    <Form.Item
                        label="Nome do Leitor"
                        hasFeedback
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name?.message}
                        className="w-full"
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: { value, onChange, onBlur, ...rest } }) => (
                                <Input
                                    placeholder="Digite o nome do leitor"
                                    size="large"
                                    value={reader?.name ?? value ?? undefined}
                                    onChange={(e) => {
                                        if (setReader && reader) {
                                            setReader((prevReader) => {
                                                if (prevReader) {
                                                    return { ...prevReader, name: e.target.value };
                                                }
                                                return null;
                                            });
                                        }

                                        handleBlurName(e);
                                        onChange(e);
                                    }}
                                    onBlur={handleBlurName}
                                    {...rest}
                                />
                            )} />
                    </Form.Item>
                    <Form.Item
                        label="Nome de Usuário"
                        hasFeedback
                        validateStatus={errors.username ? 'error' : ''}
                        help={errors.username?.message}
                        className="w-3/12"
                    >
                        <Controller
                            name="username"
                            control={control}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <Input
                                    placeholder="Digite o nome para preencher o usuário"
                                    size="large"
                                    value={reader?.username ?? value ?? undefined}
                                    readOnly
                                    className="bg-[#f5f5f5] cursor-not-allowed text-black/20"
                                    styles={{ input: { backgroundColor: "#f5f5f5", cursor: "not-allowed" } }}
                                    {...rest}
                                />
                            )} />
                    </Form.Item>
                </div>
                <div className="flex flex-row gap-4">
                    <Form.Item
                        label="E-mail"
                        hasFeedback
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email?.message}
                        className="w-full"
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <Input
                                    placeholder="Digite o e-mail do leitor"
                                    size="large"
                                    type="email"
                                    value={reader?.email ?? value ?? undefined}
                                    onChange={(e) => {
                                        if (setReader && reader) {
                                            setReader((prevReader) => {
                                                if (prevReader) {
                                                    return { ...prevReader, email: e.target.value };
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
                        label="Data de Nascimento"
                        hasFeedback
                        validateStatus={errors.birthDate ? 'error' : ''}
                        help={errors.birthDate?.message}
                        className="w-3/12"
                    >
                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <DatePicker
                                    placeholder="Digite a data de nascimento do leitor"
                                    defaultValue={reader?.birthDate ? dayjs(reader.birthDate) : undefined}
                                    value={reader?.birthDate ? dayjs(reader.birthDate) : undefined}
                                    size="large"
                                    className="w-full"
                                    locale={locale}
                                    format={['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY', 'YYYY-MM-DD']}
                                    onChange={(date, dateString: string) => {
                                        if (setReader && reader) {
                                            setReader((prevReader) => {
                                                if (prevReader) {
                                                    return { ...prevReader, birthDate: dateString };
                                                }
                                                return null;
                                            });
                                        }
                                        onChange(dateString);
                                    }}
                                    {...rest}
                                />
                            )} />
                    </Form.Item>
                </div>
                <div className="flex gap-4">
                    <Form.Item className="flex flex-row gap-2">
                        <Button type="default" htmlType="submit" className="flex flex-row gap-2 items-center justify-center">
                            <Iconify icon={reader?.id ? "material-symbols-light:check" : "uiw:user-add"} />
                            <Typography variant="span">{reader?.id ? "Salvar Alteração" : "Cadastrar Leitor"}</Typography>
                        </Button>
                    </Form.Item>
                    {reader?.id && (
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