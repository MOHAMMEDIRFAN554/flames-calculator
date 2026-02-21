import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FlamesResult from "@/models/FlamesResult";

export async function POST(request: Request) {
    try {
        console.log("API: Handling POST request...");
        console.log("API: MONGODB_URI defined?", !!process.env.MONGODB_URI);
        await dbConnect();
        console.log("API: DB Connected.");

        const body = await request.json();
        console.log("API: Received Body:", body);

        const { name1, name2, result } = body;

        if (!name1 || !name2 || !result) {
            console.log("API: Missing fields", { name1, name2, result });
            return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
        }

        const savedResult = await FlamesResult.create({
            name1,
            name2,
            letter: result.letter,
            meaning: result.meaning,
            totalRemaining: result.totalRemaining,
        });

        console.log("API: Result saved successfully:", savedResult._id);
        return NextResponse.json({ success: true, data: savedResult });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
