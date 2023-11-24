import TitlePage from "@/components/layout/title-page";
import { api } from "@/lib/api";
import Reader from "./(components)/reader";

async function getReaders() {
    try {
        const { data } = await api.get("readers");

        return data.readers;
    } catch (error) {
        return [];
    }
}

export default async function ReaderPage() {
    const data = await getReaders();

    return (
        <div>
            <TitlePage title={"Leitores"} />
            <Reader data={data} />
        </div>
    );
}