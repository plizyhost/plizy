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

  const icons = {
    apple: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
        <path d="M10 2c1 .5 2 2 2 5" />
      </svg>
    ),
    android: (
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M14 8.5V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2.5" />
        <path d="M6 15.5V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.5" />
        <path d="M8 12h8" />
        <path d="M9 4.5l1.5 1.5" />
        <path d="M13.5 4.5L15 6" />
        <path d="M9 19.5l1.5-1.5" />
        <path d="M13.5 19.5L15 18" />
      </svg>
    ),
    windows: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="m2 5 10.5-2L22 5" />
        <path d="m2 19 10.5 2L22 19" />
        <path d="M2.5 5.25v13.5" />
        <path d="M21.5 5.25v13.5" />
        <path d="m12.5 3-1 16" />
      </svg>
    ),
    tv: (
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
  };

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
                <div className="flex items-center gap-4 text-muted-foreground">
                  {icons.apple}
                  {icons.android}
                  {icons.windows}
                  {icons.tv}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
