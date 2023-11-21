import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const users = await prisma.reader.findMany({
            orderBy: {
                name: "asc"
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                birthDate: true,
                transactions: {
                    select: {
                        id: true,
                        date: true,
                        item: {
                            select: {
                                id: true,
                                title: true,
                                synopsis: true,
                                publicationYear: true,
                                numberPages: true,
                                coverImage: true,
                                itemType: {
                                    select: {
                                        id: true,
                                        description: true
                                    }
                                },
                                publishingCompany: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                                authors: {
                                    select: {
                                        id: true,
                                        name: true,
                                        nationality: true,
                                        avatar: true
                                    }
                                }
                            }
                        },
                        returnDate: true,
                        transactionType: {
                            select: {
                                id: true,
                                description: true
                            }
                        }
                    }
                },
            },
        });

        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.errors }, { status: 500 });
    }
}