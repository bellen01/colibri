// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         const response = NextResponse.json({
//             message: "Logout successful",
//             success: true,
//         })
//         response.cookies.set("token", "", {
//             httpOnly: true,
//             expires: new Date(0)
//         });
//         return response;
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message}, {
//             status: 500
//         });
//     }
// }

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const options = {
        name: "session",
        value: "",
        maxAge: -1,
    };

    cookies().set(options);
    return NextResponse.json({}, { status: 200 });
};