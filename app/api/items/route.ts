import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const take = url.searchParams.get("take");
    const filter = url.searchParams.get("filter");

    try {
        const items = await prisma.item.findMany({
            orderBy: {
                title: "asc"
            },
            select: { id: true, title: true, synopsis: true, authors: { select: { id: true, name: true, nationality: true, avatar: true } }, numberPages: true, publicationYear: true, coverImage: true, itemType: true, publishingCompany: true },
            take: take ? Number(take) : undefined,
            where:
            {
                OR: [
                    {
                        id: filter ? { equals: filter } : undefined,
                    },
                    {
                        title: filter ? { contains: filter } : undefined,
                    },
                    {
                        authors: {
                            some: {
                                name: filter ? { contains: filter } : undefined
                            }
                        },
                    },
                    {
                        publishingCompany: {
                            name: filter ? { contains: filter } : undefined
                        }
                    }
                ]
            }
        });

        return NextResponse.json({ items }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}