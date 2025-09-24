import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Star, MessageSquare } from 'lucide-react'; // Using MessageSquare for WhatsApp
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
  
  // Extract the base WhatsApp URL from your dictionary for easy access
  const whatsappBaseUrl = dict.contact.altContact.whatsapp.url;

  return (
    // Set the full page to the dark background color for a consistent theme
    <div className="bg-background">
        <div className="py-12 sm:py-24">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-foreground">
                        {dict.reseller.title}
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {dict.reseller.subtitle}
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {dict.reseller.plans.map(plan => {
                        // Create a pre-filled message for WhatsApp
                        const prefilledMessage = `Hello, I'm interested in the "${plan.name}" reseller plan. Please provide me with more details.`;
                        // URL-encode the message to make it safe for a URL
                        const encodedMessage = encodeURIComponent(prefilledMessage);
                        // Construct the final WhatsApp link
                        const whatsappLink = `${whatsappBaseUrl}?text=${encodedMessage}`;

                        const [integerPart, decimalPart] = plan.price.replace('€', '').split('.');

                        return (
                            <Card
                                key={plan.name}
                                className={cn(
                                    'flex flex-col relative bg-card/50 border border-border/30 shadow-lg hover:border-primary/50 transition-all',
                                    plan.popular ? 'border-primary' : 'border-transparent'
                                )}
                            >
                                {plan.popular && (
                                    <Badge
                                    variant="default"
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground flex items-center gap-1 shadow-md"
                                    >
                                    <Star className="h-3 w-3" />
                                    {dict.reseller.mostPopular}
                                    </Badge>
                                )}
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                    <CardDescription className="text-muted-foreground pt-1">{plan.description}</CardDescription>
                                    <div className="py-4">
                                        <span className="text-5xl font-extrabold text-primary">
                                            €{integerPart}
                                        </span>
                                        <span className="text-xl font-bold text-muted-foreground">
                                            .{decimalPart}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-4 text-sm">
                                    <ul className="space-y-2">
                                    {plan.creditInfo.map((info, index) => (
                                        <li key={index} className="flex justify-between">
                                        <span className="text-foreground">{info.credits}</span>
                                        <span className="text-muted-foreground">{info.duration}</span>
                                        </li>
                                    ))}
                                    </ul>
                                    <hr className="border-border/50" />
                                    <ul className="space-y-3">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-start">
                                        <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    {/* The button now links directly to WhatsApp */}
                                    <Button className="w-full" asChild size="lg">
                                        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                            <MessageSquare className="mr-2 h-5 w-5" />
                                            Contact Us
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  );
}