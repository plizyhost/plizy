import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.navigation.pricing,
  };
}


export default async function PricingPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const productSchema = dict.pricing.plans.map(plan => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": plan.name,
    "description": plan.description,
    "image": `${baseUrl}/og-image.png`,
    "brand": {
      "@type": "Brand",
      "name": dict.site.name
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/${locale}/checkout?plan=${plan.name.toLowerCase()}`,
      "priceCurrency": "USD",
      "price": plan.price.replace('$', ''),
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": plan.price.replace('$', ''),
        "priceCurrency": "USD",
        "valueAddedTaxIncluded": "true"
      }
    },
     "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "125"
    }
  }));

  return (
    <>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="py-12 sm:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.pricing.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.pricing.subtitle}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dict.pricing.plans.map(plan => (
              <Card key={plan.name} className={cn('flex flex-col', plan.popular ? 'border-primary ring-2 ring-primary' : '')}>
                {plan.popular && (
                  <div className="py-1 text-center text-sm font-semibold text-primary-foreground bg-primary rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="flex items-baseline pt-4">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="ml-1 text-xl font-semibold text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/${locale}/checkout?plan=${plan.name.toLowerCase()}`}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
