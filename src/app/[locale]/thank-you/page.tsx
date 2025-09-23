import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.thankYou.title,
  };
}

export default async function ThankYouPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container text-center max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
          {dict.thankYou.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {dict.thankYou.message}
        </p>
        <div className="mt-8 border-t pt-8">
            <h2 className="text-lg font-semibold">{dict.thankYou.nextSteps}</h2>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="outline">
                    <Link href={`/${locale}/tutorials`}>{dict.thankYou.links.tutorials}</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href={`/${locale}/contact`}>{dict.thankYou.links.contact}</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
