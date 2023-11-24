import TitlePage from "@/components/layout/title-page";
import { api } from "@/lib/api";
import Author from "./(components)/author";

async function getAuthors() {
    try {
        const { data } = await api.get("authors");
        return data.authors;
    } catch (error) {
        return [];
    }
}

export default async function AuthorPage() {
    const data = await getAuthors();

    return (
        <div>
            <TitlePage title={"Autores"} />
            <Author data={data} />
        </div>
    );
}