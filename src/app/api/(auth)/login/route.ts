import { customInitApp } from "@/firebase/admin-config";
import { getAuth, inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { cookies, headers } from "next/headers";
import { auth as authProvider } from "firebase-admin";

import { NextResponse } from "next/server"

customInitApp();


export async function POST(
    request: Request, response: NextResponse
) {
    const res = await request.json();
    console.log('req body i login', res)
    try { //TODO lägg till try catch för att fånga exception från databasen när användaren inte finns. Gör detta på de andra endpointsen också
        const userCredential = await signInWithEmailAndPassword(auth, res.email, res.password);
        console.log('user', userCredential.user);
        if (userCredential) {
            const idToken = await userCredential.user.getIdToken();
            const expiresInSec = 60 * 60 * 24 * 5; //seconds for nextjs
            const expiresInMsec = expiresInSec * 1000; //milliseconds for db
            const sessionCookie = await authProvider().createSessionCookie(idToken, {
                expiresIn: expiresInMsec,
            });
            const options = {
                name: "session",
                value: sessionCookie,
                maxAge: expiresInSec,
                httpOnly: true,
                secure: true,
            };
            console.log('sessionCookie i login route', sessionCookie)
            //Add the cookie to the browser
            cookies().set(options);
            return NextResponse.json(userCredential.user, {
                status: 200
            })
        } else {
            return NextResponse.json({ message: 'Something went wrong in login' }, {
                status: 400
            })
        }
    } catch (error) {
        console.log('error i try catch i login route', error);
        return NextResponse.json({ message: 'Something went wrong with credentials' }, { status: 401 });
    }
}