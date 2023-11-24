import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const itemTypes = await prisma.itemType.findMany({
        orderBy: {
            description: "asc"
        },
        select: { id: true, description: true },
    });

    return NextResponse.json({ itemTypes: itemTypes ?? [] });
}