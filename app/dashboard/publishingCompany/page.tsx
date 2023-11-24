import TitlePage from "@/components/layout/title-page";
import { api } from "@/lib/api";
import PublishingCompany from "./(components)/publishingCompany";

async function getPublishingCompanies() {
    try {
        const { data } = await api.get("publishingCompanies");
        return data.publishingCompanies;
    } catch (error) {
        return [];
    }
}

export default async function PublishingCompanyPage() {
    const data = await getPublishingCompanies();

    return (
        <div>
            <TitlePage title={"Editoras"} />
            <PublishingCompany data={data} />
        </div>
    );
}