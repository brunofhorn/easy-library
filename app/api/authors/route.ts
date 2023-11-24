import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const authors = await prisma.author.findMany({
            orderBy: {
                name: "asc"
            },
            select: { id: true, name: true, nationality: true, avatar: true },
        });

        return NextResponse.json({ authors: authors ?? [] });
    } catch (error) {
        return NextResponse.json({ authors: [], error });
    }
}