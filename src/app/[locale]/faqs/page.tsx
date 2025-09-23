import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import { handleFaq } from '@/app/actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

type Props = {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.navigation.faqs,
  };
}


export default async function FaqsPage({ params: { locale }, searchParams }: Props) {
  const dict = await getDictionary(locale);
  const { q, a, error } = searchParams;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dict.faqs.staticQuestions.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="py-12 sm:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.faqs.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.faqs.subtitle}
            </p>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {dict.faqs.staticQuestions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center">
                {dict.faqs.dynamicQuestion.title}
              </h2>
              <form action={handleFaq} className="mt-6 max-w-xl mx-auto flex gap-2">
                <Input
                  name="question"
                  placeholder={dict.faqs.dynamicQuestion.placeholder}
                  required
                />
                <Button type="submit">{dict.faqs.dynamicQuestion.button}</Button>
              </form>

              {(q || error) && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>{dict.faqs.dynamicQuestion.yourQuestion}</CardTitle>
                    <CardDescription>{q}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{dict.faqs.dynamicQuestion.aiAnswer}</h3>
                    {error ? (
                       <p className="text-destructive">{error}</p>
                    ) : (
                      <p className="text-muted-foreground">{a}</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
