import { getDictionary } from '@/lib/dictionaries';
import { i18n, type Locale } from '@/lib/i18n-config';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  const { site } = dictionary;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${params.locale}`,
      languages: Object.fromEntries(
        i18n.locales.map(loc => [loc, `/${loc}`])
      ),
    },
    openGraph: {
      title: site.name,
      description: site.description,
      url: `/${params.locale}`,
      siteName: site.name,
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: site.name,
      description: site.description,
      images: [site.ogImage],
    },
  };
}


export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const dictionary = await getDictionary(params.locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: dictionary.site.name,
    url: baseUrl,
    logo: `${baseUrl}/icon.png`, // Assuming you have an icon file
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@streamhubleads.com' // Replace with actual email
    }
  };


  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader dictionary={dictionary} locale={params.locale} />
        <main className="flex-1">{children}</main>
        <SiteFooter dictionary={dictionary} locale={params.locale} />
      </div>
    </>
  );
}
