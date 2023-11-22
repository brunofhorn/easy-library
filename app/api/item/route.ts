import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ItemRegisterScheme } from "services/validations/item.scheme";

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const data = ItemRegisterScheme.parse(body.data);

        console.log("DATA POST ITEM: ", data);

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

        console.log("CREATED: ", createdItem);

        return NextResponse.json({ createdItem }, { status: 201 });
    } catch (error: any) {
        console.log("ERRO AO CRIAR OBRA: ", error);
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}