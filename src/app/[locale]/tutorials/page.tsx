import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.navigation.tutorials,
  };
}

export default async function TutorialsPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": dict.tutorials.title,
    "author": {
      "@type": "Organization",
      "name": dict.site.name
    },
    "publisher": {
      "@type": "Organization",
      "name": dict.site.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon.png`
      }
    },
    "datePublished": new Date().toISOString(),
    "image": `${baseUrl}/og-image.png`
  };

  const placeholderTutorials = [
    { id: 1, title: 'How to set up IPTV on your Smart TV', description: 'A step-by-step guide for Samsung, LG, and other smart TVs.' },
    { id: 2, title: 'Using Amazon Fire Stick for IPTV', description: 'Unlock the full potential of your Fire Stick with our easy setup tutorial.' },
    { id: 3, title: 'IPTV on Android Devices', description: 'Install and configure our service on your Android box or smartphone.' },
    { id: 4, title: 'Getting started with MAG devices', description: 'A complete walkthrough for MAG box users.' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="py-12 sm:py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.tutorials.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.tutorials.subtitle}
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {placeholderTutorials.map(tutorial => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>
                    <Link href="#" className="hover:underline">
                      {tutorial.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{tutorial.description} (Coming Soon)</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
