import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ItemRegisterScheme } from "services/validations/item.scheme";

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const data = ItemRegisterScheme.parse(body.data);

        const createdItem = await prisma.item.create({
            data: {
                title: data.title,
                publishingCompanyId: data.publishingCompanyId,
                itemTypeId: data.itemTypeId,
                authors: {
                    connect: {
                        id: data.author
                    }
                },
                publicationYear: data.publicationYear,
                numberPages: data.numberPages,
                coverImage: data.coverImage,
                synopsis: data.synopsis
            }
        });

        return NextResponse.json({ createdItem }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}