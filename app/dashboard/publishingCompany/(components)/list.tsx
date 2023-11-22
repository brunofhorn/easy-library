"use client";

import Iconify from "@/components/shared/iconify";
import { api } from "@/lib/api";
import { IPublishingCompany } from "@interfaces/common";
import { ITable } from "@interfaces/pages";
import { Button, Input, InputRef, Modal, Skeleton, Space, Table, message } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import { Suspense, useRef, useState } from "react";

type DataIndex = keyof IPublishingCompany;

export const ListPublishingCompanies = ({ data, onHandleDelete, onHandleEdit }: ITable<IPublishingCompany>) => {
    const { confirm } = Modal;
    const [messageApi, contextHolder] = message.useMessage();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
    const dataSourceWithKey = data.map(item => ({
        ...item,
        key: item.id,
    }));

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IPublishingCompany> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="default"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<Iconify icon={"system-uicons:search"} />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button
                        type="default"
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Limpar
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filtrar
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Fechar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <Iconify icon="system-uicons:search" className={filtered ? "text-blue-700" : undefined} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <span className="highlight">{text ? text.toString() : ''}</span>
            ) : (
                text
            ),
    });

    const columns: ColumnsType<IPublishingCompany> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            width: '85%',
            ...getColumnSearchProps("name"),
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="default" onClick={() => handleDeletePublishingCompany(record.id, record.name)}>
                        <Iconify icon={"iconamoon:trash-thin"} width={15} />
                    </Button>
                    <Button type="default" onClick={() => handleEditPublishingCompany(record.id)}>
                        <Iconify icon={"tabler:edit"} width={15} />
                    </Button>
                </Space>
            ),
        },
    ];

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleDeletePublishingCompany = (id: string, name: string) => {
        confirm({
            title: "Excluir Editora",
            content: `Você realmente deseja excluir a editora ${name}?`,
            okText: "Excluir",
            okButtonProps: {
                className: "bg-red-400 hover:bg-red-800"
            },
            cancelText: "Cancelar",
            onOk() {
                deletePublishingCompany(id, name);
            },
            onCancel() {
                return false;
            },
        });
    };

    const deletePublishingCompany = async (id: string, name: string) => {
        const response = await api.delete(`publishingCompany/${id}`);

        if (response.status === 200) {
            onHandleDelete(id);
        } else {
            messageApi.open({
                type: "error",
                content: `Ocorreu um erro ao tentar excluir a editora.`
            });
        }
    };

    const handleEditPublishingCompany = (publishingCompanyId: string) => {
        onHandleEdit(publishingCompanyId);
    };

    return (
        <>
            {contextHolder}
            <Suspense fallback={<Skeleton />}>
                <Table bordered size="small" columns={columns} dataSource={dataSourceWithKey} />
            </Suspense>
        </>
    );
};