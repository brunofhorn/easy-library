import TitlePage from "@/components/layout/title-page";
import { api } from "@/lib/api";
import Item from "./(components)/item";

async function getItems() {
    const { data } = await api.get("items?take=10");

    return data.items;
}

export default async function ItemPage() {
    const data = await getItems();

    return (
        <div>
            <TitlePage title={"Obras"} />
            <Item data={data} />
        </div>
    );
}