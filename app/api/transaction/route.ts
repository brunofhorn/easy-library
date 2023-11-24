import prisma from "@/lib/prisma";
import { BorrowScheme } from "@services/validations/borrow.scheme";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const data = BorrowScheme.parse(body.data);

        const createdTransaction = await prisma.transaction.create({
            data: {
                date: data.date,
                returnDate: data.returnDate,
                itemId: data.itemId,
                borrowerId: data.borrower,
                transactionTypeId: "clpbynmm50004xjh4q5lla9j2"
            }
        });

        console.log(createdTransaction);

        return NextResponse.json({ createdTransaction }, { status: 201 });
    } catch (error: any) {
        console.log("ERROR: ", error);
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}