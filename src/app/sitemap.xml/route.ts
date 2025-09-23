import { i18n } from '@/lib/i18n-config';

function generateSitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const pages = ['', '/pricing', '/faqs', '/tutorials', '/reseller-pricing', '/contact'];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    pages.forEach(page => {
        i18n.locales.forEach(locale => {
            xml += `
            <url>
                <loc>${baseUrl}/${locale}${page}</loc>
                <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                ${i18n.locales.map(l => `<xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}${page}"/>`).join('')}
            </url>
            `;
        });
    });

    xml += `</urlset>`;
    return xml;
}

export async function GET() {
    const body = generateSitemap();

    return new Response(body, {
        status: 200,
        headers: {
            'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
            'content-type': 'application/xml',
        },
    });
}
