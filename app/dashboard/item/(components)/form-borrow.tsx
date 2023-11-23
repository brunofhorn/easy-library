"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BorrowForm, BorrowScheme } from "@services/validations/borrow.scheme";
import { DatePicker, Form, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import locale from 'antd/lib/date-picker/locale/pt_BR';
import Typography from "@/components/shared/typography";
import { IFormBorrow } from "@interfaces/pages";

export default function FormBorrow({ readers }: IFormBorrow) {
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<BorrowForm>({
        resolver: zodResolver(BorrowScheme),
    });

    const onSubmit = async (data: BorrowForm) => {
        console.log(data);
    };

    return (
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
        </Form>
    );
}