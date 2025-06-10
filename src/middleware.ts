import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent)
    const response = NextResponse.next()

    // Set a cookie for device type (mobile or desktop)
    response.cookies.set('device', isMobile ? 'mobile' : 'desktop', {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
    })

    return response
}

// Optionally, limit middleware to certain paths
export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico).*)'],
}