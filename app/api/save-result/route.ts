import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FlamesResult from "@/models/FlamesResult";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const { name1, name2, result } = body;

        const savedResult = await FlamesResult.create({
            name1,
            name2,
            letter: result.letter,
            meaning: result.meaning,
            totalRemaining: result.totalRemaining,
        });

        return NextResponse.json({ success: true, data: savedResult });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
