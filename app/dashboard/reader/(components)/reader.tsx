"use client";

import { api } from "@/lib/api";
import { IReader } from "@interfaces/common";
import { Card, Divider, message } from "antd";
import { useState } from "react";
import FormReader from "./form";
import { ListReaders } from "./list";

type ReaderProps = {
    data: IReader[];
};

async function getReader(id: string) {
    const { data } = await api.get(`reader/${id}`);
    return data.user;
}

export default function Reader({ data }: ReaderProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const [reader, setReader] = useState<IReader | null>(null);
    const [readers, setReaders] = useState<IReader[]>(data ?? []);

    const handleReaderRegister = (newReader: IReader) => {
        setReaders([...readers, newReader]);

        messageApi.open({
            type: 'success',
            content: 'O leitor foi cadastrado com sucesso.',
        });
    };

    const handleReaderDelete = (id: string) => {
        let remainingReaders = readers.filter((reader: IReader) => reader.id !== id);

        setReaders(remainingReaders);

        messageApi.open({
            type: 'success',
            content: 'O leitor foi excluído com sucesso.',
        });
    };

    const handleReaderUpdate = (updatedReader: IReader) => {
        const readerIndex = readers.findIndex((a) => a.id === updatedReader.id);

        if (readerIndex !== -1) {
            setReaders((prevReadersArray) => {
                const newArray = [...prevReadersArray];
                newArray[readerIndex] = updatedReader;
                return newArray;
            });
        }

        setReader(null);

        messageApi.open({
            type: 'success',
            content: 'O leitor foi atualizado com sucesso.',
        });
    };

    const handleReaderEdit = async (id: string) => {
        const readerSelected = await getReader(id);

        setReader(readerSelected);
    };

    return (
        <>
            {contextHolder}
            <Card className='min-h-full'>
                <FormReader
                    onHandleReaderRegister={handleReaderRegister}
                    onHandleReaderUpdate={handleReaderUpdate}
                    reader={reader}
                    setReader={setReader}
                />
            </Card>
            <Divider />
            <Card className='min-h-full'>
                <ListReaders
                    data={readers}
                    onHandleDelete={handleReaderDelete}
                    onHandleEdit={handleReaderEdit}
                />
            </Card>
        </>
    );
}