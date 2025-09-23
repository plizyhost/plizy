import {NextResponse} from 'next/server';

export function GET(request: Request) {
  const {host} = new URL(request.url);
  const text = `
User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`.trim();

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
