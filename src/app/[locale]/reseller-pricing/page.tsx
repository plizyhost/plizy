import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.navigation.reseller,
  };
}

export default async function ResellerPricingPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            {dict.reseller.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict.reseller.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {dict.reseller.plans.map(plan => (
            <Card
              key={plan.name}
              className={cn(
                'flex flex-col relative bg-card/80 border-2',
                plan.popular ? 'border-primary' : 'border-transparent'
              )}
            >
              {plan.popular && (
                <Badge
                  variant="default"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white flex items-center gap-1"
                >
                  <Star className="h-3 w-3" />
                  {dict.reseller.mostPopular}
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground pt-2">{plan.description}</CardDescription>
                <div className="py-4">
                  <span className="text-5xl font-extrabold text-primary">
                    {plan.price.split('.')[0]}
                  </span>
                  <span className="text-xl font-bold text-muted-foreground">
                    .{plan.price.split('.')[1]}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 text-sm">
                <ul className="space-y-2">
                  {plan.creditInfo.map((info, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{info.credits}</span>
                      <span className="text-muted-foreground">{info.duration}</span>
                    </li>
                  ))}
                </ul>
                <hr className="border-border" />
                <ul className="space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button className="w-full" asChild size="lg">
                  <Link href={`/${locale}/checkout`}>{dict.pricing.orderNow}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
