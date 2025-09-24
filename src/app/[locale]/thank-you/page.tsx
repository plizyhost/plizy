import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

type Props = {
    params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: "Thank You for Your Purchase",
  };
}

export default async function ThankYouPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    // Full-screen, centered layout with the app's dark background
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.14))] bg-background p-4">
      <div className="container text-center max-w-xl">
        
        {/* A semi-transparent card to match the design */}
        <Card className="bg-card/50 border-border/30 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-8 sm:p-12 space-y-5">
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground bg-primary/20 px-4 py-2 rounded-md inline-block">
              {dict.thankYou.title}
            </h1>

            {/* A small green dot as a "success" indicator */}
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full mx-auto animate-pulse"></div>

            {/* The main informational text block */}
            <div className="bg-muted/40 p-6 rounded-lg space-y-4 text-center text-muted-foreground text-base">
                <p>
                    {dict.thankYou.processing_time}
                </p>
                <p className="opacity-80">
                    {dict.thankYou.busy_day_notice}
                </p>
                <p>
                    {dict.thankYou.confirmation_email_notice}
                </p>
            </div>
            
            <p className="text-base text-muted-foreground pt-2">
              {dict.thankYou.subtitle_part1}{' '}
              <Link 
                href={dict.contact.altContact.whatsapp.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-green-400 hover:text-green-500 transition-colors underline"
              >
                {dict.thankYou.whatsapp_link_text}
              </Link>
            </p>

          </CardContent>
        </Card>

        <div className="mt-8">
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Link href={`/${locale}`}>
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    {dict.thankYou.home_button}
                </Link>
            </Button>
        </div>
        
      </div>
    </div>
  );
}
