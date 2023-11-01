import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './app/posters/fetchFunctions';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    //client
    const isPublicPath = path === '/login' || path === '/register';
    //api
    const isNotPublicAPI = path === '/api/getuserdata' || path === '/api/getorderhistory' || path === '/api/updateuser'; //gör samma för api-routes

    const token = request.cookies.get('session')?.value || '';

    let verifiedToken = undefined;

    // if (!isPublicPath || isNotPublicAPI) {
    //     console.log('verifySession');
    verifiedToken = await verifySession(token);
    // }
    console.log('isPublicPath isNotPublicAPI', isPublicPath, isNotPublicAPI);

    if (isNotPublicAPI) {

        if (verifiedToken?.status === 200) {
            const tokenCredentials = await verifiedToken?.json(); //had to create an endpoint since using firebase directly in here won't work. Found this information when trying to find a solution: https://www.reddit.com/r/nextjs/comments/zosnth/unable_to_get_firebaseadmin_to_work_in_middleware/ and https://nextjs.org/docs/messages/node-module-in-edge-runtime
            // console.log('userid', tokenCredentials.user_id);
            const headers = new Headers(request.headers);
            // console.log('headers', headers);
            headers.append('userid', tokenCredentials.user_id)
            // console.log('headers after append', headers);

            return NextResponse.next({
                request: {
                    headers
                }
            });
        }

        return new NextResponse(
            JSON.stringify({ success: false, message: 'authentication failed' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        )
    } else {
        if (!isPublicPath && !token) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        } else if (isPublicPath && verifiedToken?.status === 200) {
            return NextResponse.redirect(new URL('/user', request.nextUrl));
        }
    }

}

export const config = {
    matcher: [
        '/user',
        '/user/:path*',
        '/login',
        '/register',
        '/api/getuserdata',
        '/api/getorderhistory',
        '/api/updateuser'
    ]
}