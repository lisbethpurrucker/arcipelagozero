import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'site-preview'

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== 'true') return NextResponse.next()

  const secret = process.env.PREVIEW_SECRET

  // Bypass cookie present → let through
  if (secret && request.cookies.get(COOKIE_NAME)?.value === secret) {
    return NextResponse.next()
  }

  // Secret in query param → set cookie and redirect to same path without param
  const paramSecret = request.nextUrl.searchParams.get('preview')
  if (secret && paramSecret === secret) {
    const url = request.nextUrl.clone()
    url.searchParams.delete('preview')
    const response = NextResponse.redirect(url)
    response.cookies.set(COOKIE_NAME, secret, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
    return response
  }

  // Coming soon page
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coming Soon</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Manrope', sans-serif;
      background-color: #d8c2a6;
      color: #005769;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }
    h1 {
      font-size: clamp(2rem, 6vw, 4rem);
      font-weight: 300;
      letter-spacing: 0.04em;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      font-weight: 300;
      opacity: 0.75;
      letter-spacing: 0.02em;
    }
    .bar {
      width: 2.5rem;
      height: 2px;
      background-color: #005769;
      margin: 1.5rem auto;
      opacity: 0.4;
    }
  </style>
</head>
<body>
  <h1>Coming Soon</h1>
  <div class="bar"></div>
  <p>Something beautiful is on its way.</p>
</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
