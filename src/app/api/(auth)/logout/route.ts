import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const options = {
            name: "session",
            value: "",
            maxAge: -1,
        };

        cookies().set(options);
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong when logging out' }, { status: 400 });
    }
};