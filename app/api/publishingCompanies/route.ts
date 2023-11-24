import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const publishingCompanies = await prisma.publishingCompany.findMany({
            orderBy: {
                name: "asc"
            },
            select: { id: true, name: true },
        });

        return NextResponse.json({ publishingCompanies: publishingCompanies ?? [] }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ itemTypes: [], error }, { status: 500 });
    }
}