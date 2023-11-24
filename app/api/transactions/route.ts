import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        const loans = await prisma.transaction.findMany({
            orderBy: {
                date: "asc"
            },
            select: {
                id: true,
                borrower: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                date: true,
                returnDate: true,
                transactionType: {
                    select: {
                        id: true,
                        description: true
                    }
                },
                item: {
                    select: {
                        id: true,
                        title: true,
                        coverImage: true
                    }
                }
            },
        });

        return NextResponse.json({ loans: loans ?? [] }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ loans: [], error }, { status: 500 });
    }
}