import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ReaderRegisterScheme } from "services/validations/reader.scheme";

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const data = ReaderRegisterScheme.parse(body.data);

        const createdReader = await prisma.reader.create({
            data: {
                name: data.name,
                password: "",
                username: data.username,
                birthDate: data.birthDate,
                email: data.email,
            }
        });

        return NextResponse.json({ createdReader }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}