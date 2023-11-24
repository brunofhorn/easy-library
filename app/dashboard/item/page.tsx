import TitlePage from "@/components/layout/title-page";
import { api } from "@/lib/api";
import Item from "./(components)/item";
import { IReader } from "@interfaces/common";

async function getItems() {
    try {
        const { data } = await api.get("items?take=10");

        return data.items;
    } catch (error) {
        return [];
    }
}

async function getReaders() {
    try {
        const { data } = await api.get(`readers`);

        return data?.readers?.map((reader: IReader) => {
            return { key: reader.id, label: reader.name, value: reader.id };
        });
    } catch (error) {
        return [];
    }
}


export default async function ItemPage() {
    const data = await getItems();
    const readers = await getReaders();

    return (
        <div>
            <TitlePage title={"Obras"} />
            <Item data={data} readers={readers} />
        </div>
    );
}