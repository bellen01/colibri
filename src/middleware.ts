import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './app/posters/fetchFunctions';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log('nuvarande path', path);
    //client
    const isPublicPath = path === '/login' || path === '/register';
    //api
    const isNotPublicAPI = path === '/api/getuserdata' || path === '/api/getorderhistory' || path === '/api/updateuser'
        || path === '/api/getFavorites' || path === '/api/updateFavorites' || path === '/api/addFavorite'
        || path === '/api/getFavoritePostersIds' || path === '/api/getcartitems' || path === '/api/addcartitem'
        || path === '/api/deletecartitem' || path === '/api/decreasecartitem' || path === '/api/updatecartitems'
        || path === '/api/saveorder';

    const token = request.cookies.get('session')?.value || '';

    let verifiedToken = undefined;

    // if (!isPublicPath || isNotPublicAPI) {
    //     console.log('verifySession');
    verifiedToken = await verifySession(token);
    // }
    console.log('isPublicPath isNotPublicAPI', isPublicPath, isNotPublicAPI);


    if (isNotPublicAPI) {
        console.log('hej i if isnotpublicapi');
        if (verifiedToken?.status === 200) {
            console.log('hej2')
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
        console.log('hej i else i middleware');
        if (!isPublicPath && !token) {
            console.log('isPublicPath token', isPublicPath, token);
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        } else if (isPublicPath && verifiedToken?.status === 200) {
            console.log('isPublicPath', isPublicPath);
            console.log('verifiedtoken status', verifiedToken.status);
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
        '/api/updateuser',
        '/api/getFavorites',
        '/api/updateFavorites',
        '/api/addFavorite',
        '/api/getFavoritePostersIds',
        '/api/getcartitems',
        '/api/addcartitem',
        '/api/deletecartitem',
        '/api/decreasecartitem',
        '/api/updatecartitems',
        '/api/saveorder',
    ]
}