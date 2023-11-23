import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;

    const reader = await prisma.reader.findUnique({
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            birthDate: true,
        },
        where: { id },
    });

    return NextResponse.json({ reader });
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;
    const body = await request.json();
    const { reader } = body;

    try {
        const updatedReader = await prisma.reader.update({
            data: {
                name: reader.name,
                username: reader.username,
                birthDate: reader.birthDate,
                email: reader.email
            },
            where: { id }
        });

        return NextResponse.json({ updatedReader }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;

    try {
        const deletedReader = await prisma.reader.delete({ where: { id } });

        return NextResponse.json({ deletedReader }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}

