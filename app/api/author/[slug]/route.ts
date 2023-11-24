import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { slug: string; }; }) {
    try {
        const id = params.slug;

        const author = await prisma.author.findUnique({
            where: { id },
        });

        return NextResponse.json({ author }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ author: null }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;
    const body = await request.json();
    const { author } = body;

    try {
        const updatedAuthor = await prisma.author.update({
            data: {
                name: author.name,
                avatar: author.avatar,
                nationality: author.nationality
            },
            where: { id }
        });

        return NextResponse.json({ updatedAuthor }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;

    try {
        const deletedAuthor = await prisma.author.delete({ where: { id } });

        return NextResponse.json({ deletedAuthor }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}

