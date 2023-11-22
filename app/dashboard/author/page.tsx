import TitlePage from "@/components/layout/title-page";
import Author from "./(components)/author";
import { getAuthors } from "@services/getAuthors";

export default async function CatalogAuthor() {
    const data = await getAuthors();

    return (
        <div>
            <TitlePage title={"Autores"} />
            <Author data={data} />
        </div>
    );
}