import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.footer.legal.privacy,
  };
}

export default async function PrivacyPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
          {dict.footer.legal.privacy}
        </h1>
        <p className="mt-8">Privacy Policy content coming soon.</p>
      </div>
    </div>
  );
}
