"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BorrowForm, BorrowScheme } from "@services/validations/borrow.scheme";
import { Button, DatePicker, Form, Select, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import locale from 'antd/lib/date-picker/locale/pt_BR';
import Typography from "@/components/shared/typography";
import { IFormBorrow } from "@interfaces/pages";
import Iconify from "@/components/shared/iconify";
import { api } from "@/lib/api";
import { useState } from "react";

export default function FormBorrow({ readers, itemId }: IFormBorrow) {
    const [messageApi, contextHolder] = message.useMessage();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<BorrowForm>({
        resolver: zodResolver(BorrowScheme),
        defaultValues: {
            itemId
        }
    });
    const [isPreviewOpen, setPreviewOpen] = useState(true);

    const closePreview = () => {
        setPreviewOpen(false);
    };

    if (!isPreviewOpen) {
        // Se o preview estiver fechado, retorne null ou qualquer coisa que indique que o componente não deve ser renderizado
        return null;
    }

    const onSubmit = async (data: BorrowForm) => {
        try {
            const response = await api.post("item", { data });

            if (response.status === 201) {
                reset();
                closePreview();
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Ocorreu um erro ao tentar cadastrar a obra.',
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                <div className="flex flex-row justify-between gap-4">
                    <Form.Item
                        label={<Typography variant="span" className="text-xs">Data de Empréstimo</Typography>}
                        hasFeedback
                        validateStatus={errors.date ? 'error' : ''}
                        help={errors.date?.message}
                    >
                        <Controller
                            name="date"
                            control={control}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <DatePicker
                                    placeholder="Empréstimo"
                                    value={undefined}
                                    size="middle"
                                    className="w-full"
                                    locale={locale}
                                    format={['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY', 'YYYY-MM-DD']}
                                    onChange={(date, dateString: string) => {
                                        onChange(dateString);
                                    }}
                                    {...rest}
                                />
                            )} />
                    </Form.Item>
                    <Form.Item
                        label={<Typography variant="span" className="text-xs">Data de Devolução</Typography>}
                        hasFeedback
                        validateStatus={errors.returnDate ? 'error' : ''}
                        help={errors.returnDate?.message}
                    >
                        <Controller
                            name="returnDate"
                            control={control}
                            render={({ field: { value, onChange, ...rest } }) => (
                                <DatePicker
                                    placeholder="Devolução"
                                    value={undefined}
                                    size="middle"
                                    className="w-full"
                                    locale={locale}
                                    format={['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY', 'YYYY-MM-DD']}
                                    onChange={(date, dateString: string) => {
                                        onChange(dateString);
                                    }}
                                    {...rest}
                                />
                            )} />
                    </Form.Item>
                    <Form.Item
                        label={<Typography variant="span" className="text-xs">Leitor</Typography>}
                        hasFeedback
                        validateStatus={errors.borrower ? 'error' : ""}
                        help={errors.borrower?.message}
                    >
                        <Controller
                            name="borrower"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder="Selecione o Leitor"
                                    options={readers}
                                    size="middle"
                                    {...field}
                                />
                            )} />
                    </Form.Item>
                </div>
                <div className="flex flex-row">
                    <Button onClick={() => closePreview()}>FECHAR MODAL</Button>
                    <Button type="default" htmlType="submit" className="flex flex-row gap-2 justify-center items-center">
                        <Iconify icon={"cil:book"} />
                        <Typography variant="span">Realizar Empréstimo</Typography>
                    </Button>
                </div>
            </Form>
        </>
    );
}