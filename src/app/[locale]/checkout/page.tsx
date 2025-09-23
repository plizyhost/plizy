import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/checkout-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.navigation.checkout,
  };
}

export default async function CheckoutPage({ params: { locale }, searchParams }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.checkout.title}
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              {dict.checkout.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutForm locale={locale} dict={dict.checkout} searchParams={searchParams} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
