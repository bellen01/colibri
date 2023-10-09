import { NextRequest, NextResponse } from "next/server";
import { auth } from "firebase-admin";
// import { auth } from "@/firebase/config";
import { customInitApp } from "@/firebase/admin-config";

customInitApp();


export async function GET(request: NextRequest) {
    const token = request.cookies.get('session')?.value || '';
    // console.log('token i verifycookie route', token);

    const verifiedCookie = await auth().verifySessionCookie(token, true);
    // console.log('verifiedcookie i verifycookie route', verifiedCookie);

    if (!token || !verifiedCookie) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    };

    return NextResponse.json(verifiedCookie, {
        status: 200
    })
}