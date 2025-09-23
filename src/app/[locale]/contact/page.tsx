import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.navigation.contact,
  };
}

export default async function ContactPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container max-w-2xl">
        <Card>
           <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.contact.title}
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              {dict.contact.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm dict={dict.contact.form} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
