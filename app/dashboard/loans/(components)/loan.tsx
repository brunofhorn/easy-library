"use client";

import { Card, message } from "antd";
import { ITransaction } from "@interfaces/common";
import ListLoans from "./list";

type LoanProps = {
    data: ITransaction[];
};


export default function Loan({ data }: LoanProps) {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <Card className='min-h-full'>
                <ListLoans data={data} />
            </Card>
        </>
    );
}