import TitlePage from "@/components/layout/title-page";
import { api } from "@/lib/api";
import Author from "./(components)/author";

async function getAuthors() {
    const { data } = await api.get("authors");
    return data.authors;
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