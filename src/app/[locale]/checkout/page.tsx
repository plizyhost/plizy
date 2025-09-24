import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/checkout-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

// --- Helper Components for Logos and Testimonials ---

const PaymentIcons = () => (
  <div className="flex items-center justify-center space-x-4 mt-4">
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-6" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
  </div>
);

const TrustpilotRating = () => (
  <div className="text-center mt-12">
    <div className="flex items-center justify-center">
      <Star className="w-6 h-6 text-green-500 fill-green-500" />
      <p className="ml-2 font-bold text-lg">Trustpilot</p>
    </div>
    <div className="flex items-center justify-center mt-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-green-500 fill-green-500" />
      ))}
    </div>
    <p className="text-muted-foreground text-sm mt-1">Rated Excellent 5.0 from 1400+ reviews</p>
  </div>
);

// --- Main Checkout Page Component ---

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
  
  const { planName, devices, price, currency } = searchParams;

  const testimonials = [
    { name: 'Yorkshire Nan', reviews: 52, rating: 5, content: "I've been using... for a few months now, and it's been very reliable. The channels load quickly, and I..." },
    { name: 'John Cartwright', reviews: 12, rating: 5, content: "Was skeptical at first but... Was skeptical at first but gave it a try, and it's been working well. The picture quality is clear, and I get..." },
    { name: 'John_Widnes', reviews: 57, rating: 5, content: "Tiviplay has been a... Tiviplay has been the best setup for me so far. It's perfect for me. The support team responds quickly if..." },
  ];

  return (
    <div className="bg-muted">
      <div className="container max-w-2xl py-8">
        <p className="text-center text-muted-foreground mb-6">{dict.checkout.header_note}</p>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-lg uppercase">{planName ? `${planName} SUBSCRIPTION` : 'Order Summary'}</h2>
                <p className="text-sm text-muted-foreground">Devices: {devices || '1'}</p>
                {/* The "Extra free Months" line has been removed from here */}
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{dict.checkout.order_summary.total_amount}</p>
                <p className="text-3xl font-bold">{currency || '$'}{price || '0.00'}</p>
              </div>
            </div>
            
            <CheckoutForm locale={locale} dict={dict.checkout} searchParams={searchParams} />
            
            <p className="text-center text-xs font-semibold text-muted-foreground mt-4 tracking-wider">{dict.checkout.payment_guarantee}</p>
            <PaymentIcons />
          </CardContent>
        </Card>
      </div>

      <div className="py-12 bg-background">
        <div className="container">
          <TrustpilotRating />
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold">{dict.testimonials.title}</h2>
            <p className="text-lg text-green-500 font-semibold mt-2">{dict.testimonials.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.reviews} reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-green-500 fill-green-500" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}