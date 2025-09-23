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
  Video,
  Laptop,
  Users,
  ShieldCheck,
  CircleDollarSign,
  Radio,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type Props = {
  params: { locale: Locale };
};

const iconMap: { [key: string]: LucideIcon } = {
  Radio,
  Video,
  Laptop,
  Users,
  ShieldCheck,
  CircleDollarSign,
};

export default async function Home({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-home');

  const testimonialImages = {
    'Alex Johnson': PlaceHolderImages.find(img => img.id === 'avatar-1'),
    'Maria Garcia': PlaceHolderImages.find(img => img.id === 'avatar-2'),
    'David Smith': PlaceHolderImages.find(img => img.id === 'avatar-3'),
  };

  const storyImages = [
    PlaceHolderImages.find(img => img.id === 'story-1'),
    PlaceHolderImages.find(img => img.id === 'story-2'),
    PlaceHolderImages.find(img => img.id === 'story-3'),
    PlaceHolderImages.find(img => img.id === 'story-4'),
    PlaceHolderImages.find(img => img.id === 'story-5'),
  ].filter(Boolean);

  const pricingPlans = dict.pricing.plans.flatMap(p => p.plans).slice(0, 4);

  const favoriteDevicesImage = PlaceHolderImages.find(img => img.id === 'favorite-devices');


  return (
    <div className="flex flex-col">
      
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
           <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.pricing.title}
            </h2>
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
                  {planGroup.plans.map(plan => (
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
                          <Link href={`/${locale}/checkout?plan=${plan.name.toLowerCase().replace(/ /g, '-')}-${planGroup.devices}-devices`}>{dict.pricing.orderNow}</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background text-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.homepage.whyChooseUs.title}
            </h2>
          </div>
          <div className="mt-12 grid gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
            {dict.homepage.whyChooseUs.items.map((feature) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <div key={feature.title} className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                    {Icon ? (
                       <Icon className="h-8 w-8 text-primary" />
                    ) : (
                      // Fallback for custom icons if needed
                      <span className="text-2xl">{feature.icon}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Our Clients</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Feedback from our customers
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto mt-12"
          >
            <CarouselContent>
              {storyImages.map((story, index) => (
                story && (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <Image
                            src={story.imageUrl}
                            alt={story.description}
                            width={300}
                            height={600}
                            className="w-full h-auto object-cover"
                            data-ai-hint={story.imageHint}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
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

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.homepage.favoriteDevices.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              {favoriteDevicesImage && (
                <Image
                  src={favoriteDevicesImage.imageUrl}
                  alt={favoriteDevicesImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg"
                  data-ai-hint={favoriteDevicesImage.imageHint}
                />
              )}
            </div>
            <div className="space-y-8">
              {dict.homepage.favoriteDevices.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-4 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
