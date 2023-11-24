"use client";

import Iconify from "@/components/shared/iconify";
import { IAuthor, ITransaction } from "@interfaces/common";
import { ITable } from "@interfaces/pages";
import { Button, Input, InputRef, Modal, Skeleton, Space, Table, message } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import { Suspense, useRef, useState } from "react";

type DataIndex = keyof ITransaction;

export default function ListLoans({ data }: ITable<ITransaction>) {
    const { confirm } = Modal;
    const [messageApi, contextHolder] = message.useMessage();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
    const dataSourceWithKey = data.map(item => ({
        ...item,
        key: item.id,
    }));
    const filterNationality: { key: string; text: string; value: string; }[] = data
        .reduce<{ key: string; text: string; value: string; }[]>(
            (author, { id, item }) => {
                const exists = author.find((i) => i.text === item.title);
                if (!exists) {
                    author.push({ key: id, text: item.title, value: item.id });
                }
                return author;
            },
            []
        )
        .sort((a, b) => a.text.localeCompare(b.text));

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ITransaction> => ({
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

    const columns: ColumnsType<ITransaction> = [
        {
            title: 'Nome do Leitor',
            dataIndex: 'borrower.name',
            key: 'borrower.name',
            width: '70%',
            ...getColumnSearchProps("borrower"),
        },
        {
            title: 'Nacionalidade',
            dataIndex: 'nationality',
            key: 'nationality',
            width: '30%',
            // filters: [...filterNationality],
            // onFilter: (value, record: IAuthor) => record.nationality.startsWith(value.toString()),
            // filterSearch: true,
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

    return (
        <>
            {contextHolder}
            <Suspense fallback={<Skeleton />}>
                <Table bordered size="small" columns={columns} dataSource={dataSourceWithKey} />
            </Suspense>
        </>
    );
};