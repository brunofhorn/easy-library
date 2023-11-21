import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;

    const publishingCompany = await prisma.publishingCompany.findUnique({
        where: { id },
    });

    return NextResponse.json({ publishingCompany });
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;
    const body = await request.json();
    const { publishingCompany } = body;

    try {
        const updatedPublishingCompany = await prisma.publishingCompany.update({
            data: {
                name: publishingCompany.name,
            },
            where: { id }
        });

        return NextResponse.json({ updatedPublishingCompany }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;

    try {
        const deletedPublishingCompany = await prisma.publishingCompany.delete({ where: { id } });

        return NextResponse.json({ deletedPublishingCompany }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}

