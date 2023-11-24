import TitlePage from "@/components/layout/title-page";
import { api } from "@/lib/api";
import Loan from "./(components)/loan";

async function getLoans() {
    const { data } = await api.get("transactions");

    return data.loans;
}

export default async function LoanPage() {
    const data = await getLoans();

    return (
        <div>
            <TitlePage title={"Empréstimos"} />
            <Loan data={data} />
        </div>
    );
}