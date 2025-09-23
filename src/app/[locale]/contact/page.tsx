import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail } from 'lucide-react';

type Props = {
  params: { locale: Locale };
};

const TelegramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.44 12.36a9.05 9.05 0 0 0-12.8-12.8A9.05 9.05 0 0 0 3.6 15.24l-1.6 5.8 5.9-1.56a9.05 9.05 0 0 0 13.54-7.12z" />
    </svg>
);


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

        <div className="mt-8 text-center">
          <p className="mb-4 text-muted-foreground">{dict.contact.altContact.title}</p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href={dict.contact.altContact.telegram.url} target="_blank" rel="noopener noreferrer">
                <TelegramIcon />
                {dict.contact.altContact.telegram.label}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={dict.contact.altContact.whatsapp.url} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {dict.contact.altContact.whatsapp.label}
              </Link>
            </Button>
             <Button asChild variant="outline">
              <Link href={`mailto:${dict.contact.altContact.email.address}`}>
                <Mail />
                {dict.contact.altContact.email.label}
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
