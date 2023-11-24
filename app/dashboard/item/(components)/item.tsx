"use client";

import { api } from "@/lib/api";
import { ISelect } from "@interfaces/components";
import { IItem } from "@interfaces/common";
import { Button, Card, Divider, Input, message } from "antd";
import { useState } from "react";
import { FormItem } from "./form";
import Iconify from "@/components/shared/iconify";
import Typography from "@/components/shared/typography";
import ListItems from "./list";

type ItemProps = {
    data: IItem[];
    readers: ISelect[];
};

export default function Item({ data, readers }: ItemProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const [item, setItem] = useState<IItem | null>(null);
    const [items, setItems] = useState<IItem[]>(data ?? []);
    const [formVisible, setFormVisible] = useState(false);
    const [search, setSearch] = useState("");

    const handleItemRegister = (newItem: IItem) => {
        setItems([...items, newItem]);

        messageApi.open({
            type: 'success',
            content: 'A obra foi cadastrada com sucesso.',
        });
    };

    const handleItemDelete = (id: string) => {
        let remainingItems = items.filter((item: IItem) => item.id !== id);

        setItems(remainingItems);

        messageApi.open({
            type: 'success',
            content: 'A obra foi excluída com sucesso.',
        });
    };

    const handleItemUpdate = (updatedItem: IItem) => {
        const itemIndex = items.findIndex((a) => a.id === updatedItem.id);

        if (itemIndex !== -1) {
            setItems((prevItemsArray) => {
                const newArray = [...prevItemsArray];
                newArray[itemIndex] = updatedItem;
                return newArray;
            });
        }

        setItem(null);

        messageApi.open({
            type: 'success',
            content: 'A obra foi atualizada com sucesso.',
        });
    };

    const handleItemEdit = async (id: string) => {
        const { data } = await api.get(`item/${id}`);

        setItem(data.item);
    };

    const handleSearch = async (value: string) => {
        const { data } = await api.get(`items?filter=${value}`);

        setItems(data.items);
    };

    return (
        <>
            {contextHolder}
            <Card className={`${formVisible ? "min-h-full visible transition ease-linear duration-75" : "h-0 invisible transition ease-linear duration-75"}`}>
                <FormItem
                    onHandleItemRegister={handleItemRegister}
                    onHandleItemUpdate={handleItemUpdate}
                    item={item}
                    setItem={setItem}
                    setFormVisible={setFormVisible}
                />
            </Card>
            {formVisible && <Divider />}
            <Card className='min-h-full'>
                <div className="flex flex-row gap-1">
                    <Input.Search
                        size="large"
                        placeholder="Digite o título da obra / ISBN / Autor / Editora"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        onSearch={(value) => handleSearch(value)}
                    />
                    <Button size="large" className="flex flex-row gap-1 justify-center items-center" onClick={() => setFormVisible(!formVisible)}>
                        <Iconify icon={formVisible ? "iconamoon:sign-times-thin" : "tdesign:book"} />
                        <Typography variant="span">{formVisible ? "Cancelar Cadastro" : "Cadastrar Obra"}</Typography>
                    </Button>
                </div>
                <div className="mt-5">
                    <ListItems data={items} onHandleDelete={handleItemDelete} readers={readers} />
                </div>
            </Card>
        </>
    );
}