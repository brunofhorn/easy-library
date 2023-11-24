import prisma from "@/lib/prisma";
import { BorrowScheme } from "@services/validations/borrow.scheme";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const data = BorrowScheme.parse(body.data);

        const transactionType = await prisma.transactionType.findMany({
            where: {
                description: {
                    equals: "empréstimo",
                    mode: "insensitive"
                }
            }
        });

        const createdTransaction = await prisma.transaction.create({
            data: {
                date: new Date(data.date),
                returnDate: new Date(data.returnDate),
                itemId: data.itemId,
                borrowerId: data.borrower,
                transactionTypeId: transactionType[0].id ?? ""
            }
        });

        return NextResponse.json({ createdTransaction }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}