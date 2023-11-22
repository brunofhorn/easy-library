"use client";

import { useState } from "react";
import { Card, Divider, message } from "antd";
import { IPublishingCompany } from "@interfaces/common";
import { api } from "@/lib/api";
import FormPublishingCompany from "./form";
import { ListPublishingCompanies } from "./list";

type PublishingCompanyProps = {
    data: IPublishingCompany[];
};

async function getPublishingCompany(id: string) {
    const { data } = await api.get(`publishingCompany/${id}`);
    return data.publishingCompany;
}


export default function PublishingCompany({ data }: PublishingCompanyProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const [publishingCompany, setPublishingCompany] = useState<IPublishingCompany | null>(null);
    const [publishingCompanies, setPublishingCompanies] = useState<IPublishingCompany[]>(data ?? []);

    const handlePublishingCompanyRegister = (newPublishingCompany: IPublishingCompany) => {
        setPublishingCompanies([...publishingCompanies, newPublishingCompany]);

        messageApi.open({
            type: 'success',
            content: 'A editora foi cadastrada com sucesso.',
        });
    };

    const handlePublishingCompanyDelete = (id: string) => {
        let remainingPublishingCompanies = publishingCompanies.filter((publishingCompany: IPublishingCompany) => publishingCompany.id !== id);

        setPublishingCompanies(remainingPublishingCompanies);

        messageApi.open({
            type: 'success',
            content: 'A editora foi excluída com sucesso.',
        });
    };

    const handlePublishingCompanyUpdate = (updatedPublishingCompany: IPublishingCompany) => {
        const publishingCompanyIndex = publishingCompanies.findIndex((a) => a.id === updatedPublishingCompany.id);

        if (publishingCompanyIndex !== -1) {
            setPublishingCompanies((prevPublishingCompaniesArray) => {
                const newArray = [...prevPublishingCompaniesArray];
                newArray[publishingCompanyIndex] = updatedPublishingCompany;
                return newArray;
            });
        }

        setPublishingCompany(null);

        messageApi.open({
            type: 'success',
            content: 'A editora foi atualizada com sucesso.',
        });
    };

    const handlePublishingCompanyEdit = async (id: string) => {
        const publishingCompanySelected = await getPublishingCompany(id);

        setPublishingCompany(publishingCompanySelected);
    };

    return (
        <>
            {contextHolder}
            <Card className='min-h-full'>
                <FormPublishingCompany
                    onHandlePublishingCompanyRegister={handlePublishingCompanyRegister}
                    onHandlePublishingCompanyUpdate={handlePublishingCompanyUpdate}
                    publishingCompany={publishingCompany}
                    setPublishingCompany={setPublishingCompany}
                />
            </Card>
            <Divider />
            <Card className='min-h-full'>
                <ListPublishingCompanies
                    data={publishingCompanies}
                    onHandleDelete={handlePublishingCompanyDelete}
                    onHandleEdit={handlePublishingCompanyEdit}
                />
            </Card>
        </>
    );
}