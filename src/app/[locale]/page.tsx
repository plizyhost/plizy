import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Globe,
  MonitorUp,
  Smartphone,
  Clock,
  type LucideIcon,
  Check,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type Props = {
  params: { locale: Locale };
};

const iconMap: { [key: string]: LucideIcon } = {
  Globe,
  MonitorUp,
  Smartphone,
  Clock,
};

export default async function Home({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-home');

  const testimonialImages = {
    'Alex Johnson': PlaceHolderImages.find(img => img.id === 'avatar-1'),
    'Maria Garcia': PlaceHolderImages.find(img => img.id === 'avatar-2'),
    'David Smith': PlaceHolderImages.find(img => img.id === 'avatar-3'),
  };

  const pricingPlans = dict.pricing.plans.flatMap(p => p.plans).slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl font-headline">
              {dict.homepage.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {dict.homepage.hero.subtitle}
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href={`/${locale}/pricing`}>{dict.homepage.hero.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map(plan => (
              <Card key={plan.name} className={cn('flex flex-col border-2 relative', plan.popular ? 'border-primary' : 'border-transparent')}>
                {plan.badge && <Badge variant="destructive" className="absolute -top-3 right-4">{plan.badge}</Badge>}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="py-4">
                    <span className="text-5xl font-extrabold text-pink-500">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                   <ul className="space-y-3">
                      {plan.features.slice(0, 4).map(feature => (
                        <li key={feature} className="flex items-center justify-center text-center">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                </CardContent>
                <CardFooter>
                   <Button className="w-full" asChild>
                      <Link href={`/${locale}/checkout?plan=${plan.name.toLowerCase().replace(' ', '-')}`}>{dict.pricing.orderNow}</Link>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.homepage.features.title}
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dict.homepage.features.items.map(feature => {
              const Icon = iconMap[feature.icon];
              return (
                <div key={feature.title} className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <h3 className="mt-6 text-lg font-medium">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.homepage.testimonials.title}
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {dict.homepage.testimonials.items.map(testimonial => {
              const avatar =
                testimonialImages[
                  testimonial.name as keyof typeof testimonialImages
                ];
              return (
                <Card key={testimonial.name}>
                  <CardHeader>
                    <p className="text-lg italic">"{testimonial.quote}"</p>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <Avatar>
                      {avatar && (
                        <AvatarImage
                          src={avatar.imageUrl}
                          alt={testimonial.name}
                          data-ai-hint={avatar.imageHint}
                        />
                      )}
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 lg:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            {dict.homepage.cta.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {dict.homepage.cta.subtitle}
          </p>
          <Button size="lg" className="mt-8" asChild variant="accent">
            <Link href={`/${locale}/pricing`}>{dict.homepage.cta.button}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
