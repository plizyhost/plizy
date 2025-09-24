import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';


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

  const productSchema = dict.pricing.plans.flatMap(planGroup => 
    planGroup.plans.map(plan => ({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${plan.name} - ${planGroup.devices} Devices`,
      "description": plan.description,
      "image": `${baseUrl}/og-image.png`,
      "brand": {
        "@type": "Brand",
        "name": dict.site.name
      },
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}/${locale}/checkout?plan=${plan.name.toLowerCase().replace(' ', '-')}`,
        "priceCurrency": "EUR",
        "price": plan.price.replace('€', ''),
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": plan.price.replace('€', ''),
          "priceCurrency": "EUR",
          "valueAddedTaxIncluded": "true"
        }
      },
       "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "125"
      }
    }))
  );

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

          <Tabs defaultValue={dict.pricing.plans[0].devices} className="mt-12">
            <TabsList className="grid w-full grid-cols-3 md:w-1/2 mx-auto">
              {dict.pricing.plans.map(planGroup => (
                 <TabsTrigger key={planGroup.devices} value={planGroup.devices}>
                   {planGroup.devices} {planGroup.devices === "1" ? dict.pricing.deviceLabel : dict.pricing.devicesLabel}
                 </TabsTrigger>
              ))}
            </TabsList>

            {dict.pricing.plans.map(planGroup => (
              <TabsContent key={planGroup.devices} value={planGroup.devices}>
                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {planGroup.plans.map(plan => {
                    const priceValue = plan.price.replace('€', '').replace('$', '');
                    const queryParams = new URLSearchParams({
                      planName: plan.name,
                      devices: planGroup.devices,
                      price: priceValue,
                      currency: plan.price.includes('€') ? '€' : '$',
                    }).toString();

                    return (
                      <Card key={plan.name} className={cn('flex flex-col relative border-2', plan.popular ? 'border-primary' : 'border-transparent')}>
                        {plan.badge && <Badge variant="destructive" className="absolute -top-3 right-4">{plan.badge}</Badge>}
                        <CardHeader className="text-center">
                          <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                          <div className="py-4">
                            <span className="text-5xl font-extrabold text-pink-500">{plan.price}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="space-y-3">
                            {plan.features.map(feature => (
                              <li key={feature} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" asChild size="lg">
                            <Link href={`/${locale}/checkout?${queryParams}`}>{dict.pricing.orderNow}</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

        </div>
      </div>
    </>
  );
}