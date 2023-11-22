"use client";

import { useState } from "react";
import { Card, Divider, message } from "antd";
import { IAuthor } from "@interfaces/common";
import { api } from "@/lib/api";

type AuthorProps = {
    data: IAuthor[];
};

async function getAuthor(id: string) {
    const { data } = await api.get(`author/${id}`);
    return data.author;
}

export default function Author({ data }: AuthorProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const [author, setAuthor] = useState<IAuthor | null>(null);
    const [authors, setAuthors] = useState<IAuthor[]>(data ?? []);

    const handleAuthorRegister = (newAuthor: IAuthor) => {
        setAuthors([...authors, newAuthor]);

        messageApi.open({
            type: 'success',
            content: 'O autor foi cadastrado com sucesso.',
        });
    };

    const handleAuthorDelete = (id: string) => {
        let remainingAuthors = authors.filter((author: IAuthor) => author.id !== id);

        setAuthors(remainingAuthors);

        messageApi.open({
            type: 'success',
            content: 'O autor foi excluído com sucesso.',
        });
    };

    const handleAuthorUpdate = (updatedAuthor: IAuthor) => {
        const authorIndex = authors.findIndex((a) => a.id === updatedAuthor.id);

        if (authorIndex !== -1) {
            setAuthors((prevAuthorsArray) => {
                const newArray = [...prevAuthorsArray];
                newArray[authorIndex] = updatedAuthor;
                return newArray;
            });
        }

        setAuthor(null);

        messageApi.open({
            type: 'success',
            content: 'O autor foi atualizado com sucesso.',
        });
    };

    const handleAuthorEdit = async (id: string) => {
        const authorSelected = await getAuthor(id);

        setAuthor(authorSelected);
    };

    return (
        <>
            {contextHolder}
            <Card className='min-h-full'>

            </Card>
            <Divider />
            <Card className='min-h-full'>

            </Card>
        </>
    );
}