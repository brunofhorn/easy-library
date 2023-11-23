import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string; }; }) {
    const id = params.slug;

    try {
        const deletedItem = await prisma.item.delete({ where: { id } });

        return NextResponse.json({ deletedItem }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}