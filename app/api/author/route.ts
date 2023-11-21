import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { AuthorRegisterScheme } from "services/validations/author.scheme";

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const data = AuthorRegisterScheme.parse(body.data);

        const createdAuthor = await prisma.author.create({ data });

        return NextResponse.json({ createdAuthor }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}