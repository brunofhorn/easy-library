import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PublishingCompanyRegisterScheme } from "services/validations/publishingCompany.scheme";

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const data = PublishingCompanyRegisterScheme.parse(body.data);

        const createdPublishingCompany = await prisma.publishingCompany.create({ data });

        return NextResponse.json({ createdPublishingCompany }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}