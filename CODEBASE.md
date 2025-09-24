# .dockerignore

```
.git
node_modules
.next/cache
Dockerfile
docker-compose.yml
README.md

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

.genkit/*
.env*

# firebase
firebase-debug.log
firestore-debug.log
```

# .idx/dev.nix

```nix
# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.zulu
  ];
  # Sets environment variables in the workspace
  env = {};
  # This adds a file watcher to startup the firebase emulators. The emulators will only start if
  # a firebase.json file is written into the user's directory
  services.firebase.emulators = {
    # Disabling because we are using prod backends right now
    detect = false;
    projectId = "demo-app";
    services = ["auth" "firestore"];
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}

```

# .idx/icon.png

This is a binary file of the type: Image

# .modified

```

```

# apphosting.yaml

```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1

```

# captain-definition

```
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# Dockerfile

```
# Build & run a Next.js app on CapRover
FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source and build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runtime
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["npm","run","start"]

```

# docs/blueprint.md

```md
# **App Name**: StreamHub Leads

## Core Features:

- Multi-Language Support: Offers content in multiple languages (en, fr, pt, es, ja, nl, de) using URL-based routing and locale detection.
- No-JS Checkout Form Submission: A checkout form (lead capture) that works reliably even with JavaScript disabled, submitting data via standard POST requests.
- Google Sheets Integration: Automatically append checkout form submissions as new rows to a specified Google Sheets document, capturing all required fields and UTM parameters.
- Automatic Sitemap & Robots.txt Generation: Dynamically generate a sitemap.xml and robots.txt, including all locale-specific routes and SEO-friendly configurations.
- Dynamic FAQ Content: Generative AI is used as a tool to create relevant and helpful responses, for questions that do not already exist in the FAQ, improving user understanding of the application.
- Contact form with Spam Prevention: Fully functional contact form to handle any feedback/comments from the user, featuring both honeypot and rate-limiting to protect the inbox from bots or malicious users.
- Dynamic metadata and open graph data generation: Every time a page is loaded, open graph meta-data (including titles and descriptions) are programmatically populated with up-to-date information from the relevant locale.

## Style Guidelines:

- Primary color: A vibrant purple (#9D4EDD) to represent innovation and streaming content.
- Background color: A very light purple (#F5EEFF) to ensure legibility.
- Accent color: A deep blue-violet (#4361EE), for call-to-action elements, offering a clear visual distinction.
- Body and headline font: 'Inter', a sans-serif font that ensures modern, readable text and UI.
- Use clean, minimalist icons that correspond to content sections and actions; these will look good on multiple screen sizes.
- Implement a responsive grid layout that adapts to different screen sizes, maintaining content clarity and usability across devices.
- Use subtle transitions for page loads and form submissions, with no animations on key interactive UI elements, maintaining performance across devices.
```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

```

# package.json

```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "NODE_ENV=production next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p $PORT"
  },
  "dependencies": {
    "@formatjs/intl-localematcher": "^0.5.4",
    "@genkit-ai/googleai": "^1.14.1",
    "@genkit-ai/next": "^1.14.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.14.1",
    "lucide-react": "^0.475.0",
    "negotiator": "^0.6.3",
    "next": "15.3.3",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/negotiator": "^0.6.3",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "genkit-cli": "^1.14.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/images/wp1.webp

This is a binary file of the type: Image

# public/images/wp2.webp

This is a binary file of the type: Image

# public/images/wp3.webp

This is a binary file of the type: Image

# public/images/wp4.webp

This is a binary file of the type: Image

# public/images/wp5.webp

This is a binary file of the type: Image

# public/images/wp6.webp

This is a binary file of the type: Image

# README.md

```md
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

```

# readme.txt

```txt
hey
```

# src/ai/dev.ts

```ts
import { config } from 'dotenv';
config();

import '@/ai/flows/dynamic-faq-content.ts';
```

# src/ai/flows/dynamic-faq-content.ts

```ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for dynamically generating FAQ content using an LLM.
 *
 * It includes:
 * - `generateFaqContent`: An asynchronous function that takes a question string as input and returns a generated answer.
 * - `GenerateFaqContentInput`: The input type for the generateFaqContent function.
 * - `GenerateFaqContentOutput`: The output type for the generateFaqContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFaqContentInputSchema = z.object({
  question: z.string().describe('The question to generate an answer for.'),
});
export type GenerateFaqContentInput = z.infer<typeof GenerateFaqContentInputSchema>;

const GenerateFaqContentOutputSchema = z.object({
  answer: z.string().describe('The generated answer to the question.'),
});
export type GenerateFaqContentOutput = z.infer<typeof GenerateFaqContentOutputSchema>;

export async function generateFaqContent(input: GenerateFaqContentInput): Promise<GenerateFaqContentOutput> {
  return generateFaqContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFaqContentPrompt',
  input: {schema: GenerateFaqContentInputSchema},
  output: {schema: GenerateFaqContentOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about an IPTV service.\n\n  Question: {{{question}}}\n\n  Answer: `,
});

const generateFaqContentFlow = ai.defineFlow(
  {
    name: 'generateFaqContentFlow',
    inputSchema: GenerateFaqContentInputSchema,
    outputSchema: GenerateFaqContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

```

# src/ai/genkit.ts

```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

```

# src/app/[locale]/checkout/page.tsx

```tsx
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
```

# src/app/[locale]/contact/page.tsx

```tsx
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail } from 'lucide-react';

type Props = {
  params: { locale: Locale };
};

const TelegramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.44 12.36a9.05 9.05 0 0 0-12.8-12.8A9.05 9.05 0 0 0 3.6 15.24l-1.6 5.8 5.9-1.56a9.05 9.05 0 0 0 13.54-7.12z" />
    </svg>
);


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.navigation.contact,
  };
}

export default async function ContactPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container max-w-2xl">
        <Card>
           <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.contact.title}
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              {dict.contact.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm dict={dict.contact.form} />
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="mb-4 text-muted-foreground">{dict.contact.altContact.title}</p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href={dict.contact.altContact.telegram.url} target="_blank" rel="noopener noreferrer">
                <TelegramIcon />
                {dict.contact.altContact.telegram.label}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={dict.contact.altContact.whatsapp.url} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {dict.contact.altContact.whatsapp.label}
              </Link>
            </Button>
             <Button asChild variant="outline">
              <Link href={`mailto:${dict.contact.altContact.email.address}`}>
                <Mail />
                {dict.contact.altContact.email.label}
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

```

# src/app/[locale]/faqs/page.tsx

```tsx
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

```

# src/app/[locale]/layout.tsx

```tsx
import { getDictionary } from '@/lib/dictionaries';
import { i18n, type Locale } from '@/lib/i18n-config';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  const { site } = dictionary;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${params.locale}`,
      languages: Object.fromEntries(
        i18n.locales.map(loc => [loc, `/${loc}`])
      ),
    },
    openGraph: {
      title: site.name,
      description: site.description,
      url: `/${params.locale}`,
      siteName: site.name,
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: site.name,
      description: site.description,
      images: [site.ogImage],
    },
  };
}


export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const dictionary = await getDictionary(params.locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: dictionary.site.name,
    url: baseUrl,
    logo: `${baseUrl}/icon.png`, // Assuming you have an icon file
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@streamhubleads.com' // Replace with actual email
    }
  };


  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader dictionary={dictionary} locale={params.locale} />
        <main className="flex-1">{children}</main>
        <SiteFooter dictionary={dictionary} locale={params.locale} />
      </div>
    </>
  );
}

```

# src/app/[locale]/page.tsx

```tsx
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
  ArrowRight,
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
  const flawlessStreamingImage = PlaceHolderImages.find(img => img.id === 'flawless-streaming');


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
      </section>

      <section className="py-16 lg:py-24 bg-background text-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.homepage.howItWorks.title.split('work')[0]}
              <span className="text-primary">work</span>
              ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{dict.homepage.howItWorks.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.homepage.howItWorks.steps.map(step => (
              <Link key={step.number} href={`/${locale}/pricing`}>
                <Card className="bg-card/80 border border-border/50 p-6 flex items-start gap-6 h-full hover:border-primary transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 border-2 border-primary rounded-md flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
                  </div>
                  <ArrowRight className="text-muted-foreground mt-1" />
                </Card>
              </Link>
            ))}
          </div>
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
              {dict.homepage.flawlessStreaming.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {dict.homepage.flawlessStreaming.description1}
              </p>
              <p className="text-muted-foreground">
                {dict.homepage.flawlessStreaming.description2}
              </p>
              {flawlessStreamingImage && (
                  <Image
                    src={flawlessStreamingImage.imageUrl}
                    alt={flawlessStreamingImage.description}
                    width={600}
                    height={400}
                    className="rounded-lg mt-8"
                    data-ai-hint={flawlessStreamingImage.imageHint}
                  />
              )}
            </div>
            <div className="space-y-8">
              {dict.homepage.flawlessStreaming.features.map((item, index) => (
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
      
      <section className="py-16 lg:py-24 bg-muted">
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
```

# src/app/[locale]/pricing/page.tsx

```tsx
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
```

# src/app/[locale]/privacy/page.tsx

```tsx
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.footer.legal.privacy,
  };
}

export default async function PrivacyPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
          {dict.footer.legal.privacy}
        </h1>
        <p className="mt-8">Privacy Policy content coming soon.</p>
      </div>
    </div>
  );
}

```

# src/app/[locale]/refund-policy/page.tsx

```tsx
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.footer.legal.refund,
  };
}

export default async function RefundPolicyPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
          {dict.footer.legal.refund}
        </h1>
        <p className="mt-8">Refund Policy content coming soon.</p>
      </div>
    </div>
  );
}

```

# src/app/[locale]/reseller-pricing/page.tsx

```tsx
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
```

# src/app/[locale]/terms/page.tsx

```tsx
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.footer.legal.terms,
  };
}

export default async function TermsPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);

  return (
    <div className="py-12 sm:py-16">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
          {dict.footer.legal.terms}
        </h1>
        <p className="mt-8">Terms of Service content coming soon.</p>
      </div>
    </div>
  );
}

```

# src/app/[locale]/thank-you/page.tsx

```tsx
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

```

# src/app/[locale]/tutorials/page.tsx

```tsx
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.navigation.tutorials,
  };
}

export default async function TutorialsPage({ params: { locale } }: Props) {
  const dict = await getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": dict.tutorials.title,
    "author": {
      "@type": "Organization",
      "name": dict.site.name
    },
    "publisher": {
      "@type": "Organization",
      "name": dict.site.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon.png`
      }
    },
    "datePublished": new Date().toISOString(),
    "image": `${baseUrl}/og-image.png`
  };

  const placeholderTutorials = [
    { id: 1, title: 'How to set up IPTV on your Smart TV', description: 'A step-by-step guide for Samsung, LG, and other smart TVs.' },
    { id: 2, title: 'Using Amazon Fire Stick for IPTV', description: 'Unlock the full potential of your Fire Stick with our easy setup tutorial.' },
    { id: 3, title: 'IPTV on Android Devices', description: 'Install and configure our service on your Android box or smartphone.' },
    { id: 4, title: 'Getting started with MAG devices', description: 'A complete walkthrough for MAG box users.' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="py-12 sm:py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {dict.tutorials.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.tutorials.subtitle}
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {placeholderTutorials.map(tutorial => (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>
                    <Link href="#" className="hover:underline">
                      {tutorial.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{tutorial.description} (Coming Soon)</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

```

# src/app/actions.ts

```ts
'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { saveLead } from '@/lib/sheets';
import type { FormState } from '@/lib/form-state';
import { checkoutSchema, contactSchema } from '@/lib/schemas';
import { generateFaqContent } from '@/ai/flows/dynamic-faq-content';


export async function handleFaq(formData: FormData) {
  // ... (this function is unchanged)
}

export async function handleCheckout(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot check
  if (formData.get('honeypot')) {
    return {
      type: 'error',
      message: 'Spam detected.',
    };
  }

  const parsed = checkoutSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const issues = Object.entries(fieldErrors).map(([field, messages]) => `${field}: ${messages?.join(', ')}`);

    return {
      type: 'error',
      message: "Please correct the errors below.",
      fields: Object.fromEntries(formData.entries()),
      issues: issues,
    };
  }

  const headersList = headers();
  const orderNumber = `SH-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  
  // --- THIS IS THE FIX ---
  // Read the plan details directly from the formData object.
  const planName = formData.get('planName') as string;
  const devices = formData.get('devices') as string;
  const currency = formData.get('currency') as string;
  const price = formData.get('price') as string;

  // Construct the full plan name for the Google Sheet
  const fullPlanName = `${planName} (${devices} Device${devices !== '1' ? 's' : ''})`;
  
  const leadData = {
    timestamp: new Date().toISOString(),
    orderNumber: orderNumber,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    planName: fullPlanName,
    planPrice: `${currency || ''}${price || '0'}`,
    ip: headersList.get('x-forwarded-for') ?? headersList.get('x-real-ip') ?? 'IP Not Found',
  };
  
  try {
    await saveLead(leadData);
  } catch (error) {
    console.error('Failed to save lead to Google Sheets:', error);
    return {
      type: 'error',
      message: 'An unexpected error occurred. Please try again later.',
      fields: parsed.data,
    };
  }

  const locale = formData.get('locale') as string || 'en';
  redirect(`/${locale}/thank-you`);
}


export async function handleContact(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // ... (this function is unchanged)
}
```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: var(--font-body);
}

@layer base {
  :root {
    --background: 270 100% 97%;
    --foreground: 278 10% 20%;
    --card: 0 0% 100%;
    --card-foreground: 278 10% 20%;
    --popover: 0 0% 100%;
    --popover-foreground: 278 10% 20%;
    --primary: 278 69% 61%;
    --primary-foreground: 0 0% 98%;
    --secondary: 278 30% 90%;
    --secondary-foreground: 278 69% 61%;
    --muted: 278 30% 94%;
    --muted-foreground: 278 10% 45%;
    --accent: 229 84% 60%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 278 20% 85%;
    --input: 278 20% 90%;
    --ring: 229 84% 60%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 278 15% 10%;
    --foreground: 270 100% 97%;
    --card: 278 15% 12%;
    --card-foreground: 270 100% 97%;
    --popover: 278 15% 10%;
    --popover-foreground: 270 100% 97%;
    --primary: 278 69% 61%;
    --primary-foreground: 0 0% 98%;
    --secondary: 278 15% 20%;
    --secondary-foreground: 0 0% 98%;
    --muted: 278 15% 20%;
    --muted-foreground: 278 10% 60%;
    --accent: 229 84% 65%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 278 15% 25%;
    --input: 278 15% 25%;
    --ring: 229 84% 65%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

# src/app/layout.tsx

```tsx
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'StreamHub Leads',
  description: 'Generated by Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body text-foreground antialiased'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

```

# src/app/robots.txt/route.ts

```ts
import {NextResponse} from 'next/server';

export function GET(request: Request) {
  const {host} = new URL(request.url);
  const text = `
User-agent: *
Allow: /
Sitemap: https://${host}/sitemap.xml
`.trim();

  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

```

# src/app/sitemap.xml/route.ts

```ts
import { i18n } from '@/lib/i18n-config';

function generateSitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const pages = ['', '/pricing', '/faqs', '/tutorials', '/reseller-pricing', '/contact'];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    pages.forEach(page => {
        i18n.locales.forEach(locale => {
            xml += `
            <url>
                <loc>${baseUrl}/${locale}${page}</loc>
                <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                ${i18n.locales.map(l => `<xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}${page}"/>`).join('')}
            </url>
            `;
        });
    });

    xml += `</urlset>`;
    return xml;
}

export async function GET() {
    const body = generateSitemap();

    return new Response(body, {
        status: 200,
        headers: {
            'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
            'content-type': 'application/xml',
        },
    });
}

```

# src/components/checkout-form.tsx

```tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
// THE FIX: Import the useSearchParams hook
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal, ShoppingCart } from "lucide-react";

import { handleCheckout } from "@/app/actions";
import { checkoutSchema, type CheckoutSchema } from "@/lib/schemas";
import type { FormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CountryCodePicker } from "./country-code-picker";

// Props now only need locale and dict, not searchParams
type CheckoutFormProps = {
  locale: string;
  dict: any;
};

function SubmitButton({ text, price, currency }: { text: string; price?: string; currency?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold"
    >
      <ShoppingCart className="mr-2 h-6 w-6" />
      {pending ? "Processing..." : `${text} ${currency || ''}${price || ''}`}
    </Button>
  );
}

export function CheckoutForm({ locale, dict }: CheckoutFormProps) {
  // THE FIX: Read search params on the client with the hook
  const searchParams = useSearchParams();
  const planName = searchParams.get('planName') ?? 'N/A';
  const devices = searchParams.get('devices') ?? '1';
  const price = searchParams.get('price') ?? '0';
  const currency = searchParams.get('currency') ?? '';
  const planIdentifier = `${planName.toLowerCase().replace(/ /g, '-')}-${devices}-devices`;
  
  const [state, formAction] = useActionState<FormState, FormData>(handleCheckout, null);
  const [countryCode, setCountryCode] = useState("+1");
  const [localPhoneNumber, setLocalPhoneNumber] = useState(
    state?.fields?.phone?.startsWith(countryCode) 
      ? state.fields.phone.substring(countryCode.length) 
      : ""
  );

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    // Set defaultValues using the params we just read
    defaultValues: {
      plan: planIdentifier,
      name: state?.fields?.name || "",
      email: state?.fields?.email || "",
      phone: state?.fields?.phone || "",
    },
  });

  useEffect(() => {
    const combinedPhoneNumber = `${countryCode}${localPhoneNumber}`;
    form.setValue("phone", combinedPhoneNumber, { shouldValidate: true });
  }, [countryCode, localPhoneNumber, form]);

  useEffect(() => {
    if (state?.type === "error") {
      state.issues?.forEach((issue) => {
        if (typeof issue === 'string' && issue.includes(':')) {
          const [field, message] = issue.split(":");
          if (field && message) {
            form.setError(field.trim() as keyof CheckoutSchema, {
              type: "manual",
              message: message.trim(),
            });
          }
        }
      });
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6 mt-6">
        {state?.type === "error" && !state.issues && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {/* Hidden inputs now reliably get their values from the hook */}
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="plan" value={planIdentifier} />
        <input type="hidden" name="planName" value={planName} />
        <input type="hidden" name="price" value={price} />
        <input type="hidden" name="currency" value={currency} />
        <input type="hidden" name="devices" value={devices} />
        <input type="text" name="honeypot" className="hidden" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.name.label}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={dict.form.name.placeholder} 
                    {...field} 
                    defaultValue={state?.fields?.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.email.label}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={dict.form.email.placeholder} 
                    {...field} 
                    defaultValue={state?.fields?.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.form.phone.label}</FormLabel>
              <div className="flex gap-2">
                <CountryCodePicker value={countryCode} onChange={setCountryCode} />
                <FormControl>
                  <>
                    <input type="hidden" {...field} />
                    <Input
                      type="tel"
                      placeholder={dict.form.phone.placeholder}
                      value={localPhoneNumber}
                      onChange={(e) => setLocalPhoneNumber(e.target.value)}
                    />
                  </>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          text={dict.form.submit}
          price={price}
          currency={currency}
        />
      </form>
    </Form>
  );
}
```

# src/components/contact-form.tsx

```tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { handleContact } from "@/app/actions";
import { contactSchema, type ContactSchema } from "@/lib/schemas";
import type { FormState } from "@/lib/form-state";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Terminal } from "lucide-react";

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : text}
    </Button>
  );
}

export function ContactForm({ dict }: { dict: any }) {
  const [state, formAction] = useFormState<FormState, FormData>(
    handleContact,
    null
  );

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: (state?.fields?.name as string) || "",
      email: (state?.fields?.email as string) || "",
      message: (state?.fields?.message as string) || "",
    },
  });

  useEffect(() => {
    if (state?.type === "success") {
      form.reset();
    }
    if (state?.type === "error") {
      state.issues?.forEach((issue) => {
        const [field, message] = issue.split(":");
        form.setError(field.trim() as keyof ContactSchema, {
          type: "manual",
          message: message.trim(),
        });
      });
    }
  }, [state, form]);

  if (state?.type === "success") {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>{state.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        {state?.type === "error" && !state.issues && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        
        <input type="text" name="honeypot" className="hidden" />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.name.label}</FormLabel>
              <FormControl>
                <Input placeholder={dict.name.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.email.label}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={dict.email.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.message.label}</FormLabel>
              <FormControl>
                <Textarea placeholder={dict.message.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton text={dict.submit} />
      </form>
    </Form>
  );
}

```

# src/components/country-code-picker.tsx

```tsx
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { countries, Country } from "@/lib/country-codes";

interface CountryCodePickerProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CountryCodePicker({ value, onChange, className }: CountryCodePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const selectedCountry = countries.find((country) => country.dial_code === value) || countries.find(c => c.code === 'US');

  const filteredCountries = React.useMemo(() => {
    if (!search) return countries;
    return countries.filter((country) => {
      const searchLower = search.toLowerCase();
      return (
        country.name.toLowerCase().includes(searchLower) ||
        country.dial_code.includes(searchLower)
      );
    });
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[90px] justify-between rounded-r-none", className)}
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/${selectedCountry.code.toLowerCase()}.svg`}
                alt={selectedCountry.name}
                className="h-4 w-6"
              />
            </div>
          ) : (
            "Select"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <div className="p-2">
          <Input
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[300px]">
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              onClick={() => {
                onChange(country.dial_code);
                setOpen(false);
              }}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
            >
              <img
                src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                alt={country.name}
                className="h-4 w-6"
              />
              <span className="flex-1 text-sm">{country.name}</span>
              <span className="text-sm text-muted-foreground">{country.dial_code}</span>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
```

# src/components/green-checkmark.tsx

```tsx
"use client";

// This component is now a Client Component because it uses styled-jsx for the animation.

export const GreenCheckmark = () => (
  <svg className="h-16 w-16 text-green-500 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 12.5l3 3 6-6"
      className="path"
      style={{
        strokeDasharray: 20,
        strokeDashoffset: 20,
        animation: 'draw 0.5s ease-in-out forwards 0.2s',
      }}
    />
    <style jsx>{`
      @keyframes draw {
        to {
          stroke-dashoffset: 0;
        }
      }
    `}</style>
  </svg>
);
```

# src/components/locale-switcher.tsx

```tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n, type Locale } from '@/lib/i18n-config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

type LocaleSwitcherProps = {
  dictionary: {
    label: string;
    selected: string;
  };
};

export default function LocaleSwitcher({ dictionary }: LocaleSwitcherProps) {
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const currentLocale = pathName.split('/')[1] as Locale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{dictionary.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map(locale => {
          return (
            <DropdownMenuItem key={locale} asChild>
              <Link href={redirectedPathName(locale)}>
                {locale.toUpperCase()}
                {currentLocale === locale && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({dictionary.selected.replace('{locale}', locale.toUpperCase())})
                  </span>
                )}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

```

# src/components/site-footer.tsx

```tsx
import Link from 'next/link';
import { Tv2, Twitter, Facebook, Instagram } from 'lucide-react';
import type { getDictionary } from '@/lib/dictionaries';

type SiteFooterProps = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
};

export function SiteFooter({ dictionary, locale }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <Tv2 className="h-6 w-6 text-primary" />
              <span className="font-bold">{dictionary.site.name}</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {year} {dictionary.footer.company}. {dictionary.footer.rights}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 sm:text-left">
            <div>
              <h4 className="font-semibold">{dictionary.footer.legal.title}</h4>
              <ul className="mt-2 space-y-1">
                <li><Link href={`/${locale}/terms`} className="text-sm text-muted-foreground hover:text-foreground">{dictionary.footer.legal.terms}</Link></li>
                <li><Link href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:text-foreground">{dictionary.footer.legal.privacy}</Link></li>
                <li><Link href={`/${locale}/refund-policy`} className="text-sm text-muted-foreground hover:text-foreground">{dictionary.footer.legal.refund}</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold">{dictionary.navigation.home}</h4>
              <ul className="mt-2 space-y-1">
                <li><Link href={`/${locale}/pricing`} className="text-sm text-muted-foreground hover:text-foreground">{dictionary.navigation.pricing}</Link></li>
                <li><Link href={`/${locale}/faqs`} className="text-sm text-muted-foreground hover:text-foreground">{dictionary.navigation.faqs}</Link></li>
                <li><Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:text-foreground">{dictionary.navigation.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">{dictionary.footer.social.title}</h4>
              <div className="mt-2 flex justify-center space-x-4 sm:justify-start">
                <Link href="#" className="text-muted-foreground hover:text-foreground"><span className="sr-only">Twitter</span><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground"><span className="sr-only">Facebook</span><Facebook className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground"><span className="sr-only">Instagram</span><Instagram className="h-5 w-5" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

```

# src/components/site-header.tsx

```tsx
import Link from 'next/link';
import { Menu, Tv2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LocaleSwitcher from './locale-switcher';
import type { getDictionary } from '@/lib/dictionaries';

type SiteHeaderProps = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: string;
};

export function SiteHeader({ dictionary, locale }: SiteHeaderProps) {
  const navItems = [
    { href: `/${locale}/pricing`, label: dictionary.navigation.pricing },
    { href: `/${locale}/faqs`, label: dictionary.navigation.faqs },
    { href: `/${locale}/tutorials`, label: dictionary.navigation.tutorials },
    { href: `/${locale}/reseller-pricing`, label: dictionary.navigation.reseller },
    { href: `/${locale}/contact`, label: dictionary.navigation.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href={`/${locale}`} className="mr-6 flex items-center space-x-2">
            <Tv2 className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              {dictionary.site.name}
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navItems.map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex">
             <Button asChild>
                <Link href={`/${locale}/pricing`}>{dictionary.navigation.checkout}</Link>
             </Button>
          </div>
          <LocaleSwitcher dictionary={dictionary.localeSwitcher} />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link
                href={`/${locale}`}
                className="mb-6 flex items-center space-x-2"
              >
                <Tv2 className="h-6 w-6 text-primary" />
                <span className="font-bold">{dictionary.site.name}</span>
              </Link>
              <div className="flex flex-col space-y-3">
                {navItems.map(item => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

```

# src/components/ui/accordion.tsx

```tsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

# src/components/ui/alert-dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

# src/components/ui/alert.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

```

# src/components/ui/avatar.tsx

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

# src/components/ui/badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

# src/components/ui/calendar.tsx

```tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

```

# src/components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# src/components/ui/carousel.tsx

```tsx
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

# src/components/ui/chart.tsx

```tsx
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

```

# src/components/ui/checkbox.tsx

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

# src/components/ui/collapsible.tsx

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

# src/components/ui/dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

# src/components/ui/dropdown-menu.tsx

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

# src/components/ui/form.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

# src/components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

# src/components/ui/label.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

# src/components/ui/menubar.tsx

```tsx
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}

```

# src/components/ui/popover.tsx

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

```

# src/components/ui/progress.tsx

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

```

# src/components/ui/radio-group.tsx

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

```

# src/components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

```

# src/components/ui/select.tsx

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

# src/components/ui/separator.tsx

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

# src/components/ui/sheet.tsx

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

# src/components/ui/sidebar.tsx

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

# src/components/ui/skeleton.tsx

```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

# src/components/ui/slider.tsx

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

```

# src/components/ui/switch.tsx

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```

# src/components/ui/table.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

# src/components/ui/tabs.tsx

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

# src/components/ui/textarea.tsx

```tsx
import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};

```

# src/components/ui/toast.tsx

```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```

# src/components/ui/toaster.tsx

```tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

```

# src/components/ui/tooltip.tsx

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

# src/dictionaries/de.json

```json
{
  "site": {
    "name": "StreamHub Leads",
    "description": "Dein ultimativer Ort für IPTV-Streaming. Entdecke unsere Pläne und werde Teil der Streaming-Revolution.",
    "ogImage": "/og-image.png"
  },
  "navigation": {
    "home": "Startseite",
    "pricing": "Preise",
    "faqs": "FAQs",
    "tutorials": "Anleitungen",
    "reseller": "Reseller",
    "contact": "Kontakt",
    "checkout": "Zur Kasse"
  },
  "localeSwitcher": {
    "label": "Sprache ändern",
    "selected": "Ausgewählt: {locale}"
  },
  "homepage": {
    "hero": {
      "title": "Erlebe die Zukunft des Fernsehens",
      "subtitle": "Streaming in hoher Qualität, tausende Kanäle und unvergleichlicher Support. Alles an einem Ort.",
      "cta": "Pläne & Preise ansehen"
    },
    "features": {
      "title": "Warum StreamHub wählen?",
      "items": [
        {
          "icon": "Globe",
          "title": "Globaler Zugriff",
          "description": "Schaue deine Lieblingsinhalte von überall auf der Welt. Alles, was du brauchst, ist eine Internetverbindung."
        },
        {
          "icon": "MonitorUp",
          "title": "4K & HD-Qualität",
          "description": "Genieße gestochen scharfe Bildqualität mit unserer umfangreichen Bibliothek an 4K- und HD-Kanälen."
        },
        {
          "icon": "Smartphone",
          "title": "Multi-Geräte-Support",
          "description": "Streame auf Fernseher, Computer, Tablet oder Smartphone. Wir unterstützen alle gängigen Geräte."
        },
        {
          "icon": "Clock",
          "title": "99,9 % Verfügbarkeit",
          "description": "Unsere robuste Infrastruktur garantiert ein stabiles, zuverlässiges Erlebnis – rund um die Uhr."
        }
      ]
    },
    "howItWorks": {
      "title": "Wie funktioniert es?",
      "subtitle": "So funktioniert unser bester IPTV-Service.",
      "steps": [
        {
          "number": "01",
          "title": "Bestellung aufgeben",
          "description": "Wähle in der Preistabelle deinen gewünschten Abo-Zeitraum und gib deine Bestellung auf."
        },
        {
          "number": "02",
          "title": "Zugang erhalten",
          "description": "Dieser Prozess dauert 5–15 Minuten. Prüfe dein Postfach und den Spam-Ordner. Für eine schnellere Abwicklung kontaktiere uns per WhatsApp."
        },
        {
          "number": "03",
          "title": "Genieße deinen IPTV-Service!",
          "description": "Nutze sofort alle Kanäle, Filme und Serien. Endloses Entertainment mit unserem IPTV-Service."
        }
      ]
    },
    "whyChooseUs": {
      "title": "Warum unseren Server wählen?",
      "items": [
        {
          "icon": "Radio",
          "title": "Tausende Kanäle",
          "description": "Dein IPTV-Abo bietet internationale Kanäle aus aller Welt – inklusive aller großen Sender."
        },
        {
          "icon": "Video",
          "title": "Video on Demand",
          "description": "Streame komplette Staffeln, aktuelle Blockbuster, Kindersendungen und vieles mehr aus unserer VOD-Bibliothek."
        },
        {
          "icon": "Laptop",
          "title": "Auf jedem Gerät sehen",
          "description": "Funktioniert auf Smart-TVs, Android, Amazon Fire Stick, KODI, MAG und allen Geräten, die M3U oder Portale unterstützen."
        },
        {
          "icon": "Users",
          "title": "Support in Weltklasse",
          "description": "Ausführliche Anleitungen und Kundensupport machen Einrichtung und Streaming überall schnell und einfach."
        },
        {
          "icon": "ShieldCheck",
          "title": "Sichere & geschützte Zahlung",
          "description": "Sichere Zahlungen – keine komplizierten Abrechnungsprozesse."
        },
        {
          "icon": "CircleDollarSign",
          "title": "7-Tage Geld-zurück-Garantie",
          "description": "Wenn unser Service nicht passt, erstatten wir den vollen Betrag."
        }
      ]
    },
    "testimonials": {
      "title": "Das sagen unsere Kunden",
      "items": [
        {
          "name": "Alex Johnson",
          "role": "Filmfan",
          "quote": "Unglaubliche Senderauswahl und atemberaubende 4K-Qualität. So gutes Streaming hatte ich noch nie."
        },
        {
          "name": "Maria Garcia",
          "role": "Sportfan",
          "quote": "Ich sehe jedes Spiel aus jeder Liga live. Zuverlässiger Service und super hilfsbereiter Support."
        },
        {
          "name": "David Smith",
          "role": "Familienvater",
          "quote": "Für jeden ist etwas dabei. Die Kinder lieben die Cartoons, wir die Filmkanäle. Sehr empfehlenswert!"
        }
      ]
    },
    "cta": {
      "title": "Bereit loszulegen?",
      "subtitle": "Wähle einen Plan, der zu dir passt, und starte noch heute. Sofortige Aktivierung, keine versteckten Kosten.",
      "button": "Preise ansehen"
    },
    "favoriteDevices": {
      "title": "Unser IPTV-Service unterstützt all deine Lieblingsgeräte",
      "items": [
        {
          "title": "Smart-TV, Smartphone, Tablets, Android und TV-Box",
          "description": "Nutze unseren Service auf Smartphones, Smart-TVs, Android-Boxen und allen IPTV-fähigen Geräten (Android, iOS, Windows …)."
        },
        {
          "title": "MAG-Geräte & MAG-Simulatoren",
          "description": "Sende uns die MAC-Adresse deines MAG-Geräts oder Simulators (z. B. STB). Wir schicken dir das MAG-Portal und du erhältst Zugriff auf die größte Playlist."
        },
        {
          "title": "Laptops & Computer",
          "description": "Unser Service ist flexibel und funktioniert auf nahezu allen digitalen Geräten. Installiere einen IPTV-Player auf deinem PC und genieße IPTV."
        }
      ]
    },
    "flawlessStreaming": {
      "title": "Makelloses IPTV-Streaming ohne Buffering",
      "description1": "Mit unserer großen Senderauswahl verpasst du keine Spiele oder Shows mehr. Sei der Erste mit neuen Episoden deiner Lieblingsserie.",
      "description2": "Unsere TV-Kanäle und VODs decken alle Interessen ab: Sport, Nachrichten, Cartoons, Filme, Serien, Adult – alles in einem Konto!",
      "features": [
        {
          "title": "VOLLE 4K/HD/FHD-QUALITÄT",
          "description": "Die meisten Kanäle sind in HD, einige in 4K."
        },
        {
          "title": "Schnelles Zapping",
          "description": "Unglaublich kurze Umschaltzeit – ca. 0,5 Sekunden!"
        },
        {
          "title": "Tägliche Updates",
          "description": "Senderliste und VOD-Bibliothek werden täglich aktualisiert."
        },
        {
          "title": "Schnelle Lieferung",
          "description": "Dein Premium-Abo wird unmittelbar nach Zahlung aktiviert."
        }
      ]
    }
  },
  "pricing": {
    "title": "Finde den perfekten Plan",
    "subtitle": "Einfache, transparente Preise. Wähle deinen Plan und starte in wenigen Minuten.",
    "deviceLabel": "Gerät",
    "devicesLabel": "Geräte",
    "orderNow": "Jetzt bestellen",
    "plans": [
      {
        "devices": "1",
        "plans": [
          {
            "name": "1 Monat",
            "price": "€15",
            "description": "Ideal, um den Service auszuprobieren.",
            "features": [
              "20.000+ Kanäle",
              "1 Gerät gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "3 Monate",
            "price": "€30",
            "description": "Beliebt für saisonales Schauen.",
            "badge": "SPARE 20%",
            "features": [
              "20.000+ Kanäle",
              "1 Gerät gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "6 Monate",
            "price": "€50",
            "description": "Top Preis-Leistung für ein halbes Jahr.",
            "badge": "SPARE 30%",
            "features": [
              "20.000+ Kanäle",
              "1 Gerät gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "12 Monate",
            "price": "€80",
            "description": "Maximale Ersparnis für ein ganzes Jahr.",
            "features": [
              "20.000+ Kanäle",
              "1 Gerät gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "popular": true,
            "badge": "BESTES ANGEBOT",
            "cta": "Starten"
          }
        ]
      },
      {
        "devices": "2",
        "plans": [
          {
            "name": "1 Monat",
            "price": "€25",
            "description": "Ideal, um den Service auszuprobieren.",
            "features": [
              "20.000+ Kanäle",
              "2 Geräte gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "3 Monate",
            "price": "€45",
            "description": "Beliebt für saisonales Schauen.",
            "badge": "SPARE 20%",
            "features": [
              "20.000+ Kanäle",
              "2 Geräte gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "6 Monate",
            "price": "€70",
            "description": "Top Preis-Leistung für ein halbes Jahr.",
            "badge": "SPARE 30%",
            "features": [
              "20.000+ Kanäle",
              "2 Geräte gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "12 Monate",
            "price": "€110",
            "description": "Maximale Ersparnis für ein ganzes Jahr.",
            "features": [
              "20.000+ Kanäle",
              "2 Geräte gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "popular": true,
            "badge": "BESTES ANGEBOT",
            "cta": "Starten"
          }
        ]
      },
      {
        "devices": "3",
        "plans": [
          {
            "name": "1 Monat",
            "price": "€35",
            "description": "Ideal, um den Service auszuprobieren.",
            "features": [
              "20.000+ Kanäle",
              "3 Geräte gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "3 Monate",
            "price": "€60",
            "description": "Beliebt für saisonales Schauen.",
            "badge": "SPARE 20%",
            "features": [
              "20.000+ Kanäle",
              "3 Geräte gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "6 Monate",
            "price": "€90",
            "description": "Top Preis-Leistung für ein halbes Jahr.",
            "badge": "SPARE 30%",
            "features": [
              "20.000+ Kanäle",
              "3 Geräte gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "cta": "Starten"
          },
          {
            "name": "12 Monate",
            "price": "€140",
            "description": "Maximale Ersparnis für ein ganzes Jahr.",
            "features": [
              "20.000+ Kanäle",
              "3 Geräte gleichzeitig",
              "100% kein Buffering / kein Einfrieren",
              "+150.000 Filme & Serien",
              "Sofortige Aktivierung",
              "Alle 24/7-Kanäle",
              "8K/4K/FHD/HD-Qualität",
              "Alle PPV- und Premium-Kanäle",
              "TV-Programm (EPG)",
              "99,9% Performance",
              "Catch-up",
              "24/7 Kundensupport"
            ],
            "popular": true,
            "badge": "BESTES ANGEBOT",
            "cta": "Starten"
          }
        ]
      }
    ]
  },
  "faqs": {
    "title": "Häufig gestellte Fragen",
    "subtitle": "Du hast Fragen? Wir haben Antworten. Wenn du nicht fündig wirst, frag uns gerne.",
    "staticQuestions": [
      {
        "question": "Was ist IPTV?",
        "answer": "IPTV steht für Internet Protocol Television. Dabei wird TV-Inhalt über das Internet statt über Satellit oder Kabel übertragen."
      },
      {
        "question": "Welche Geräte werden unterstützt?",
        "answer": "Unterstützt werden u. a. Smart-TVs, Android-Boxen, Amazon Fire Stick, MAG-Geräte, PC/Mac sowie Smartphones (iOS/Android)."
      },
      {
        "question": "Kann ich auf mehreren Geräten gleichzeitig schauen?",
        "answer": "Ja, abhängig von deinem Plan. Jeder Plan hat eine Anzahl gleichzeitiger Verbindungen. Das Standard-Paket erlaubt z. B. 3 Verbindungen."
      },
      {
        "question": "Gibt es eine kostenlose Testphase?",
        "answer": "Gelegentlich ja. Kontaktiere unseren Support für die aktuelle Verfügbarkeit."
      },
      {
        "question": "Empfohlene Internetgeschwindigkeit?",
        "answer": "Mit mindestens 30 Mbit/s Download läuft alles flüssig in höchster Qualität. Bei Unsicherheit empfiehlt sich ein 1-Tages-Test."
      },
      {
        "question": "Welche Zahlungsmethoden sind verfügbar?",
        "answer": "PayPal sowie Debit-/Kreditkarten (Visa, Mastercard, American Express, Discover)."
      },
      {
        "question": "Welche IPTV-Apps empfehlt ihr?",
        "answer": "Für unseren 8K-Dienst benötigst du eine IPTV-App. Empfohlen: UNSERE 8K VIP APP, OTT Navigator, Flix IPTV, IPTV Smarters Lite/Pro (Smarters Player Lite), TiviMate, Ibo Player. Vorsicht vor Fake-Apps, die Zugangsdaten stehlen."
      },
      {
        "question": "Wie lange dauert es, bis ich meine Bestellung erhalte?",
        "answer": "Wir senden innerhalb von 10 Minuten bis max. 1 Stunde nach dem Kauf eine E-Mail. In Stoßzeiten (abends/wochenends) kann es bis zu 1 Stunde dauern."
      },
      {
        "question": "Welche Gerätetypen werden unterstützt?",
        "answer": "Unser Dienst funktioniert auf den meisten Geräten: Smart-TVs, Kodi, VLC, PC, Vu+, DreamBox, Firestick, Enigma, Android-Boxen, Android-Smartphones u. v. m."
      },
      {
        "question": "Was erhalte ich mit einem IPTV-Abo?",
        "answer": "Mehr als 35.000 Sender, sehr kurze Ladezeiten, stabile Verbindung, viele Full-HD-Kanäle und eine große Mediathek für Filme & Serien."
      },
      {
        "question": "Was ist ein IPTV-Abonnement genau?",
        "answer": "Eine kostengünstige Alternative zu Kabel-TV, die Inhalte über das Internet liefert und auf vielen modernen Geräten funktioniert."
      },
      {
        "question": "Kann ich mein Abo auf mehreren Geräten nutzen?",
        "answer": "Ja, innerhalb der im Plan erlaubten gleichzeitigen Verbindungen."
      },
      {
        "question": "Welche Geräte kann ich für IPTV nutzen?",
        "answer": "Z. B. Smart-TVs (Samsung, Sony, LG …), Android-Geräte, Apple TV, iPhone, Google Chromecast, MAG (per STB-Emulator) und FireStick."
      },
      {
        "question": "Was bieten wir an?",
        "answer": "TV-Abo über das Internet für Smart TV Samsung & LG, PC, Mac, iPhone, iPad, Apple TV 4 & 5, Firestick, IPTV-Box, Android-Smartphones, Tablets, Android Box, MAG und STB-Emulator – Zugang zu 35.000 Sendern und 150.000+ 8K/4K/Ultra-HD Filmen & Serien."
      }
    ],
    "dynamicQuestion": {
      "title": "Noch eine Frage?",
      "placeholder": "Gib deine Frage hier ein …",
      "button": "KI-Assistent fragen",
      "loading": "Antwort wird generiert …",
      "yourQuestion": "Deine Frage:",
      "aiAnswer": "Antwort des KI-Assistenten:"
    }
  },
  "footer": {
    "company": "StreamHub Leads",
    "rights": "Alle Rechte vorbehalten.",
    "legal": {
      "title": "Rechtliches",
      "terms": "Nutzungsbedingungen",
      "privacy": "Datenschutz",
      "refund": "Rückerstattungsrichtlinie"
    },
    "social": {
      "title": "Soziale Medien"
    }
  },
  "contact": {
    "title": "Kontaktiere uns",
    "subtitle": "Wir helfen dir gerne. Sende uns eine Nachricht und wir melden uns so schnell wie möglich.",
    "form": {
      "name": {
        "label": "Name",
        "placeholder": "Dein Name"
      },
      "email": {
        "label": "E-Mail",
        "placeholder": "du@beispiel.com"
      },
      "message": {
        "label": "Nachricht",
        "placeholder": "Deine Nachricht …"
      },
      "submit": "Nachricht senden",
      "success": "Danke für deine Nachricht! Wir melden uns in Kürze."
    },
    "altContact": {
      "title": "Oder kontaktiere uns direkt:",
      "telegram": {
        "label": "Telegram",
        "url": "https://t.me/your-telegram-username"
      },
      "whatsapp": {
        "label": "WhatsApp",
        "url": "https://wa.me/your-whatsapp-number"
      },
      "email": {
        "label": "E-Mail",
        "address": "support@streamhubleads.com"
      }
    }
  },
  "checkout": {
    "title": "Zur Kasse",
    "subtitle": "Nur noch ein Schritt bis zum besten Streaming-Erlebnis. Fülle das Formular aus, um deine Abodaten zu erhalten.",
    "form": {
      "name": {
        "label": "Name",
        "placeholder": "Max Mustermann"
      },
      "email": {
        "label": "E-Mail-Adresse",
        "placeholder": "du@beispiel.com"
      },
      "phone": {
        "label": "Telefonnummer",
        "placeholder": "+49 170 1234567"
      },
      "submit": "Mein Abo erhalten"
    }
  },
  "thankYou": {
    "title": "Danke!",
    "message": "Deine Anfrage ist eingegangen. Wir melden uns in Kürze per E-Mail mit deinen Abo-Details und den nächsten Schritten.",
    "nextSteps": "Wie geht es weiter?",
    "links": {
      "tutorials": "Unsere Anleitungen ansehen",
      "contact": "Bei Fragen Kontakt aufnehmen"
    }
  },
  "reseller": {
    "title": "Reseller-Preise",
    "subtitle": "Werde Reseller und starte noch heute dein eigenes IPTV-Business.",
    "mostPopular": "Am beliebtesten",
    "plans": [
      {
        "name": "120 Credits",
        "description": "Reseller-Panel",
        "price": "€249.99",
        "creditInfo": [
          { "credits": "1 Credit", "duration": "1-Monats-Abo" },
          { "credits": "3 Credits", "duration": "3 Monate" },
          { "credits": "6 Credits", "duration": "6 Monate" },
          { "credits": "12 Credits", "duration": "12 Monate" }
        ],
        "features": [
          "Credits verfallen nie",
          "EPG in Echtzeit (TV-Guide)",
          "Catch-Up-TV unterstützt",
          "Vollautomatisiert via API",
          "Schneller 24/7 Reseller-Support"
        ],
        "popular": false
      },
      {
        "name": "240 Credits",
        "description": "Reseller-Panel",
        "price": "€489.99",
        "creditInfo": [
          { "credits": "1 Credit", "duration": "1-Monats-Abo" },
          { "credits": "3 Credits", "duration": "3 Monate" },
          { "credits": "6 Credits", "duration": "6 Monate" },
          { "credits": "12 Credits", "duration": "12 Monate" }
        ],
        "features": [
          "Credits verfallen nie",
          "EPG in Echtzeit (TV-Guide)",
          "Catch-Up-TV unterstützt",
          "Vollautomatisiert via API",
          "Schneller 24/7 Reseller-Support"
        ],
        "popular": false
      },
      {
        "name": "360 Credits",
        "description": "Reseller-Panel",
        "price": "€719.99",
        "creditInfo": [
          { "credits": "1 Credit", "duration": "1-Monats-Abo" },
          { "credits": "3 Credits", "duration": "3 Monate" },
          { "credits": "6 Credits", "duration": "6 Monate" },
          { "credits": "12 Credits", "duration": "12 Monate" }
        ],
        "features": [
          "Credits verfallen nie",
          "EPG in Echtzeit (TV-Guide)",
          "Catch-Up-TV unterstützt",
          "Vollautomatisiert via API",
          "Schneller 24/7 Reseller-Support"
        ],
        "popular": true
      },
      {
        "name": "480 Credits",
        "description": "Reseller-Panel",
        "price": "€899.99",
        "creditInfo": [
          { "credits": "1 Credit", "duration": "1-Monats-Abo" },
          { "credits": "3 Credits", "duration": "3 Monate" },
          { "credits": "6 Credits", "duration": "6 Monate" },
          { "credits": "12 Credits", "duration": "12 Monate" }
        ],
        "features": [
          "Credits verfallen nie",
          "EPG in Echtzeit (TV-Guide)",
          "Catch-Up-TV unterstützt",
          "Vollautomatisiert via API",
          "Schneller 24/7 Reseller-Support"
        ],
        "popular": false
      }
    ]
  },
  "tutorials": {
    "title": "Anleitungen",
    "subtitle": "Schritt-für-Schritt-Guides zur Einrichtung deines IPTV-Dienstes auf jedem Gerät."
  }
}

```

# src/dictionaries/en.json

```json
{
  "site": {
    "name": "StreamHub Leads",
    "description": "Your ultimate destination for IPTV streaming. Explore our plans and join the streaming revolution.",
    "ogImage": "/og-image.png"
  },
  "navigation": {
    "home": "Home",
    "pricing": "Pricing",
    "faqs": "FAQs",
    "tutorials": "Tutorials",
    "reseller": "Reseller",
    "contact": "Contact",
    "checkout": "Checkout"
  },
  "localeSwitcher": {
    "label": "Change language",
    "selected": "Selected: {locale}"
  },
  "homepage": {
    "hero": {
      "title": "Experience the Future of Television",
      "subtitle": "High-quality streaming, thousands of channels, and unparalleled support. All in one place.",
      "cta": "See Plans & Pricing"
    },
    "features": {
      "title": "Why Choose StreamHub?",
      "items": [
        { "icon": "Globe", "title": "Global Access", "description": "Watch your favorite content from anywhere in the world. All you need is an internet connection." },
        { "icon": "MonitorUp", "title": "4K & HD Quality", "description": "Enjoy crystal-clear picture quality with our extensive library of 4K and HD channels." },
        { "icon": "Smartphone", "title": "Multi-Device Support", "description": "Stream on your TV, computer, tablet, or smartphone. We support all major devices." },
        { "icon": "Clock", "title": "99.9% Uptime", "description": "Our robust infrastructure ensures you have a stable and reliable viewing experience, 24/7." }
      ]
    },
    "howItWorks": {
      "title": "How its work?",
      "subtitle": "How does our best IPTV service works? .",
      "steps": [
        { "number": "01", "title": "Place your order", "description": "Place your order in pricing table by choosing your preferred subscription period." },
        { "number": "02", "title": "Get your account", "description": "This process can take 5 to 15 minutes.Please check your inbox and your spam folder.To speed up the process, please contact us via Whatsapp." },
        { "number": "03", "title": "Enjoy your IPTV service!", "description": "Enjoy all channels, films, and series now. Immerse yourself in endless entertainment with our IPTV service." }
      ]
    },
    "whyChooseUs": {
      "title": "Why Choose Our Server",
      "items": [
        { "icon": "Radio", "title": "Thousands of Channels", "description": "Your IPTV subscription offers you international IPTV channels from around the world, including all major worldwide channels." },
        { "icon": "Video", "title": "Video On Demand", "description": "Stream full seasons of the top TV shows, the latest hit movies, children's shows and everything else you want from the comprehensive VOD library." },
        { "icon": "Laptop", "title": "Watch on Any Device", "description": "Our IPTV streaming works on devices such as Smart TVs, Android, Amazon Fire Stick, KODI, MAG and anything else that supports M3U or portals." },
        { "icon": "Users", "title": "World Class Support", "description": "We offer in-depth tutorials and client support to make installation, and streaming amazingly quick and simple, no matter where you are in the world." },
        { "icon": "ShieldCheck", "title": "Safe & Secure Payment", "description": "Secure Payments - No complicated billing processes required." },
        { "icon": "CircleDollarSign", "title": "7-Day Money-Back Guarantee", "description": "If you feel our services is not a good fit, we will grant you a full refund." }
      ]
    },
    "testimonials": {
      "title": "What Our Customers Say",
      "items": [
        { "name": "Alex Johnson", "role": "Movie Buff", "quote": "The channel selection is incredible, and the 4K quality is breathtaking. I've never had a better streaming experience." },
        { "name": "Maria Garcia", "role": "Sports Fanatic", "quote": "I can watch every game, from any league, live. The service is reliable and the support team is super helpful." },
        { "name": "David Smith", "role": "Family Man", "quote": "There's something for everyone in the family. The kids love the cartoons, and we love the movie channels. Highly recommended!" }
      ]
    },
    "cta": {
      "title": "Ready to Get Started?",
      "subtitle": "Choose a plan that fits your needs and start streaming today. Instant activation, no hidden fees.",
      "button": "View Pricing"
    },
    "favoriteDevices": {
      "title": "Our IPTV service supports all your favorite devices",
      "items": [
        { "title": "Smart TV, Smart Phone, Tablets, Android and TV BOX", "description": "You can use Our Server services on all Smart Phones & TVs, Android Box, and all devices that can play IPTV powered with different OS (Android, iOS, Windows & ...)" },
        { "title": "Mag Devices & Mag simulators", "description": "Just send us your Mac Address related to your MAG Device or your Mag simulator (like STB). We send you Mag portal and you have access to the biggest playlist ever!" },
        { "title": "Laptop & Computers", "description": "Our Server service is flexible and you can play line on almost all digital devices. You can install an IPTV player on your computer and enjoy watching IPTV." }
      ]
    },
    "flawlessStreaming": {
      "title": "Enjoy Flawless IPTV streaming with no buffering",
      "description1": "With our complete and large collection of TV channels, never miss your favorite sport games and TV shows. You can be the first one to see your new episode of your favorite TV series.",
      "description2": "Our Server TV Channels and VODs are nice for any type of interest. Sports, News, Cartoon, Movie, Series, Adult and ... all in one account!",
      "features": [
        { "title": "FULL 4K/HD/FHD QUALITY", "description": "Most our TV channels are available in HD quality and some of them are in 4K." },
        { "title": "Fast Zapping", "description": "Our IPTV service has an incredible channel zapping time, roughly 0.5 seconds!" },
        { "title": "Daily Updates", "description": "Our channel list and VOD library are updated daily to bring you the latest content." },
        { "title": "Fast Order Delivery", "description": "We Deliver Your Premium IPTV subscription A immediately After Payment Is Made." }
      ]
    }
  },
  "pricing": {
    "title": "Find the Perfect Plan",
    "subtitle": "Simple, transparent pricing. Choose your plan and start watching in minutes.",
    "deviceLabel": "Device",
    "devicesLabel": "Devices",
    "orderNow": "Order Now",
    "plans": [
      {
        "devices": "1",
        "plans": [
          { "name": "1 Month", "price": "€15", "description": "Ideal for trying out the service.", "features": ["20,000+ Channels", "1 Device At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "3 Months", "price": "€30", "description": "A popular choice for seasonal viewers.", "badge": "SAVE 20%", "features": ["20,000+ Channels", "1 Device At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "6 Months", "price": "€50", "description": "Great value for half a year of entertainment.", "badge": "SAVE 30%", "features": ["20,000+ Channels", "1 Device At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "12 Months", "price": "€80", "description": "Maximum savings for a full year of streaming.", "features": ["20,000+ Channels", "1 Device At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "popular": true, "badge": "BEST DEAL", "cta": "Get Started" }
        ]
      },
      {
        "devices": "2",
        "plans": [
          { "name": "1 Month", "price": "€25", "description": "Ideal for trying out the service.", "features": ["20,000+ Channels", "2 Devices At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "3 Months", "price": "€45", "description": "A popular choice for seasonal viewers.", "badge": "SAVE 20%", "features": ["20,000+ Channels", "2 Devices At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "6 Months", "price": "€70", "description": "Great value for half a year of entertainment.", "badge": "SAVE 30%", "features": ["20,000+ Channels", "2 Devices At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "12 Months", "price": "€110", "description": "Maximum savings for a full year of streaming.", "features": ["20,000+ Channels", "2 Devices At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "popular": true, "badge": "BEST DEAL", "cta": "Get Started" }
        ]
      },
      {
        "devices": "3",
        "plans": [
          { "name": "1 Month", "price": "€35", "description": "Ideal for trying out the service.", "features": ["20,000+ Channels", "3 Devices At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "3 Months", "price": "€60", "description": "A popular choice for seasonal viewers.", "badge": "SAVE 20%", "features": ["20,000+ Channels", "3 Devices At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "6 Months", "price": "€90", "description": "Great value for half a year of entertainment.", "badge": "SAVE 30%", "features": ["20,000+ Channels", "3 Devices At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "cta": "Get Started" },
          { "name": "12 Months", "price": "€140", "description": "Maximum savings for a full year of streaming.", "features": ["20,000+ Channels", "3 Devices At The Same Time", "100% No Buffering / No Freezing", "+150,000 Movies, Series", "Instant Activation!", "All 24/7 Channels", "8K/4k/FHD/HD Quality", "All PPV and Premium Channels", "TV Guide (EPG)", "99.9% Performance", "Catch-up", "24/7 Customer Support"], "popular": true, "badge": "BEST DEAL", "cta": "Get Started" }
        ]
      }
    ]
  },
  "faqs": {
    "title": "Frequently Asked Questions",
    "subtitle": "Do you have questions? We have answers. If you can’t find what you’re looking for, feel free to ask us.",
    "staticQuestions": [
      {
        "question": "What is IPTV?",
        "answer": "IPTV stands for Internet Protocol Television. TV content is transmitted over the internet instead of via satellite or cable."
      },
      {
        "question": "Which devices are supported?",
        "answer": "Supported devices include Smart TVs, Android boxes, Amazon Fire Stick, MAG devices, PC/Mac, as well as smartphones (iOS/Android)."
      },
      {
        "question": "Can I watch on multiple devices at the same time?",
        "answer": "Yes, depending on your plan. Each plan has a set number of simultaneous connections. The standard package, for example, allows 3 connections."
      },
      {
        "question": "Is there a free trial?",
        "answer": "Occasionally yes. Contact our support to check current availability."
      },
      {
        "question": "Recommended internet speed?",
        "answer": "With at least 30 Mbps download speed, everything runs smoothly in top quality. If unsure, we recommend a 1-day test."
      },
      {
        "question": "Which payment methods are available?",
        "answer": "PayPal as well as debit/credit cards (Visa, Mastercard, American Express, Discover)."
      },
      {
        "question": "Which IPTV apps do you recommend?",
        "answer": "For our 8K service, you need an IPTV app. Recommended: OUR 8K VIP APP, OTT Navigator, Flix IPTV, IPTV Smarters Lite/Pro (Smarters Player Lite), TiviMate, Ibo Player. Beware of fake apps that steal login credentials."
      },
      {
        "question": "How long does it take to receive my order?",
        "answer": "We send an email within 10 minutes to a maximum of 1 hour after purchase. During peak times (evenings/weekends), it may take up to 1 hour."
      },
      {
        "question": "Which types of devices are supported?",
        "answer": "Our service works on most devices: Smart TVs, Kodi, VLC, PC, Vu+, DreamBox, Firestick, Enigma, Android boxes, Android smartphones, and more."
      },
      {
        "question": "What do I get with an IPTV subscription?",
        "answer": "More than 35,000 channels, very short loading times, stable connection, many Full HD channels, and a large media library of movies & series."
      },
      {
        "question": "What exactly is an IPTV subscription?",
        "answer": "An affordable alternative to cable TV that delivers content over the internet and works on many modern devices."
      },
      {
        "question": "Can I use my subscription on multiple devices?",
        "answer": "Yes, within the simultaneous connections allowed by your plan."
      },
      {
        "question": "Which devices can I use for IPTV?",
        "answer": "For example, Smart TVs (Samsung, Sony, LG …), Android devices, Apple TV, iPhone, Google Chromecast, MAG (via STB Emulator), and FireStick."
      },
      {
        "question": "What do we offer?",
        "answer": "TV subscription over the internet for Samsung & LG Smart TVs, PC, Mac, iPhone, iPad, Apple TV 4 & 5, Firestick, IPTV box, Android smartphones, tablets, Android Box, MAG, and STB Emulator – access to 35,000 channels and 150,000+ 8K/4K/Ultra HD movies & series."
      }
    ],
    "dynamicQuestion": {
      "title": "Still have a question?",
      "placeholder": "Type your question here...",
      "button": "Ask AI Assistant",
      "loading": "Generating answer...",
      "yourQuestion": "Your Question:",
      "aiAnswer": "AI Assistant's Answer:"
    }
  },
  "footer": {
    "company": "StreamHub Leads",
    "rights": "All rights reserved.",
    "legal": {
      "title": "Legal",
      "terms": "Terms of Service",
      "privacy": "Privacy Policy",
      "refund": "Refund Policy"
    },
    "social": {
      "title": "Social"
    }
  },
  "contact": {
    "title": "Contact Us",
    "subtitle": "We're here to help. Send us a message and we'll get back to you as soon as possible.",
    "form": {
      "name": { "label": "Name", "placeholder": "Your Name" },
      "email": { "label": "Email", "placeholder": "you@example.com" },
      "message": { "label": "Message", "placeholder": "Your message..." },
      "submit": "Send Message",
      "success": "Thank you for your message! We will get back to you shortly."
    },
    "altContact": {
        "title": "Or contact us directly:",
        "telegram": { "label": "Telegram", "url": "https://t.me/your-telegram-username" },
        "whatsapp": { "label": "WhatsApp", "url": "https://wa.me/your-whatsapp-number" },
        "email": { "label": "Email", "address": "support@streamhubleads.com" }
    }
  },
  "checkout": {
    "title": "Checkout",
    "subtitle": "You're just one step away from the best streaming experience.",
    "header_note": "Please use a valid email address, You will receive your activation details via this email.",
    "order_summary": {
      "title": "{planName} SUBSCRIPTION",
      "devices": "Devices: {devices}",
      "extra_months": "Extra free Months: 1",
      "total_amount": "Total amount"
    },
    "form": {
      "name": { "label": "Your Name *", "placeholder": "Full name" },
      "email": { "label": "Email Address *", "placeholder": "name@example.com" },
      "phone": { "label": "Phone Number *", "placeholder": "For live support" },
      "submit": "Place Order Now"
    },
    "payment_guarantee": "Guaranteed Safe Checkout"
  },
  "testimonials": {
    "title": "Read What Our Clients Say About Us",
    "subtitle": "Trusted by over 25,000+ viewers"
  },
  "thankYou": {
    "title": "Thank You!",
    "message": "Your request has been received. We will contact you shortly via email with your subscription details and next steps.",
    "nextSteps": "What's next?",
    "links": {
      "tutorials": "Check out our tutorials",
      "contact": "Contact us with any questions"
    }
  },
  "reseller": {
    "title": "Reseller Pricing",
  "subtitle": "Join our reseller program and start your own IPTV business today.",
  "mostPopular": "Most Popular",
  "plans": [
    {
      "name": "120 Credits",
      "description": "Reseller Panel",
      "price": "€249.99",
      "creditInfo": [
        { "credits": "1 Credit", "duration": "1 Month Subscription" },
        { "credits": "3 Credits", "duration": "3 Months" },
        { "credits": "6 Credits", "duration": "6 Months" },
        { "credits": "12 Credits", "duration": "12 Months" }
      ],
      "features": [
        "Credits Never Expire",
        "Real-Time EPG (TV Guide)",
        "Catch-Up TV Supported",
        "Fully Automated via API",
        "24/7 Fast Reseller Support"
      ],
      "popular": false
    },
    {
      "name": "240 Credits",
      "description": "Reseller Panel",
      "price": "€489.99",
      "creditInfo": [
        { "credits": "1 Credit", "duration": "1 Month Subscription" },
        { "credits": "3 Credits", "duration": "3 Months" },
        { "credits": "6 Credits", "duration": "6 Months" },
        { "credits": "12 Credits", "duration": "12 Months" }
      ],
      "features": [
        "Credits Never Expire",
        "Real-Time EPG (TV Guide)",
        "Catch-Up TV Supported",
        "Fully Automated via API",
        "24/7 Fast Reseller Support"
      ],
      "popular": false
    },
    {
      "name": "360 Credits",
      "description": "Reseller Panel",
      "price": "€719.99",
      "creditInfo": [
        { "credits": "1 Credit", "duration": "1 Month Subscription" },
        { "credits": "3 Credits", "duration": "3 Months" },
        { "credits": "6 Credits", "duration": "6 Months" },
        { "credits": "12 Credits", "duration": "12 Months" }
      ],
      "features": [
        "Credits Never Expire",
        "Real-Time EPG (TV Guide)",
        "Catch-Up TV Supported",
        "Fully Automated via API",
        "24/7 Fast Reseller Support"
      ],
      "popular": true
    },
    {
      "name": "480 Credits",
      "description": "Reseller Panel",
      "price": "€899.99",
      "creditInfo": [
        { "credits": "1 Credit", "duration": "1 Month Subscription" },
        { "credits": "3 Credits", "duration": "3 Months" },
        { "credits": "6 Credits", "duration": "6 Months" },
        { "credits": "12 Credits", "duration": "12 Months" }
      ],
      "features": [
        "Credits Never Expire",
        "Real-Time EPG (TV Guide)",
        "Catch-Up TV Supported",
        "Fully Automated via API",
        "24/7 Fast Reseller Support"
      ],
      "popular": false
    }
  ]
  },
  "tutorials": {
    "title": "Tutorials",
    "subtitle": "Step-by-step guides to help you set up your IPTV service on any device."
  },
  "thankYou": {
    "title": "Thank You!",
    "subtitle_part1": "You can reach us anytime via",
    "whatsapp_link_text": "Whatsapp.",
    "processing_time": "We are currently processing your request and will set up your plan within the next 5 to 15 minutes.",
    "busy_day_notice": "However, on the busiest days, it may take up to 6 hours.",
    "confirmation_email_notice": "You will receive a confirmation email (check your SPAM inbox) once your setup is complete.",
    "home_button": "Go to Home Page"
  }
  
}


```

# src/dictionaries/es.json

```json
{
  "site": {
    "name": "StreamHub Leads",
    "description": "Tu destino definitivo para el streaming IPTV. Explora nuestros planes y únete a la revolución del streaming.",
    "ogImage": "/og-image.png"
  },
  "navigation": {
    "home": "Inicio",
    "pricing": "Precios",
    "faqs": "Preguntas Frecuentes",
    "tutorials": "Tutoriales",
    "reseller": "Revendedor",
    "contact": "Contacto",
    "checkout": "Finalizar Pedido"
  },
  "localeSwitcher": {
    "label": "Cambiar idioma",
    "selected": "Seleccionado: {locale}"
  },
  "homepage": {
    "hero": {
      "title": "Vive el Futuro de la Televisión",
      "subtitle": "Streaming de alta calidad, miles de canales y soporte inigualable. Todo en un solo lugar.",
      "cta": "Ver Planes y Precios"
    },
    "features": {
      "title": "¿Por qué elegir StreamHub?",
      "items": [
        {
          "icon": "Globe",
          "title": "Acceso Global",
          "description": "Mira tu contenido favorito desde cualquier lugar del mundo. Solo necesitas conexión a internet."
        },
        {
          "icon": "MonitorUp",
          "title": "Calidad 4K y HD",
          "description": "Disfruta de una imagen nítida con nuestra amplia biblioteca de canales 4K y HD."
        },
        {
          "icon": "Smartphone",
          "title": "Multidispositivo",
          "description": "Transmite en tu TV, ordenador, tablet o smartphone. Compatible con los principales dispositivos."
        },
        {
          "icon": "Clock",
          "title": "99,9% de Uptime",
          "description": "Nuestra infraestructura robusta garantiza una experiencia estable y confiable, 24/7."
        }
      ]
    },
    "howItWorks": {
      "title": "¿Cómo funciona?",
      "subtitle": "Así funciona nuestro mejor servicio IPTV.",
      "steps": [
        {
          "number": "01",
          "title": "Realiza tu pedido",
          "description": "Haz tu pedido en la tabla de precios eligiendo el período de suscripción que prefieras."
        },
        {
          "number": "02",
          "title": "Recibe tu cuenta",
          "description": "Este proceso tarda de 5 a 15 minutos. Revisa tu bandeja de entrada y la carpeta de spam. Para agilizarlo, contáctanos por WhatsApp."
        },
        {
          "number": "03",
          "title": "¡Disfruta tu IPTV!",
          "description": "Disfruta ahora de todos los canales, películas y series. Entretenimiento sin fin con nuestro servicio IPTV."
        }
      ]
    },
    "whyChooseUs": {
      "title": "Por qué elegir nuestro servidor",
      "items": [
        {
          "icon": "Radio",
          "title": "Miles de Canales",
          "description": "Tu suscripción IPTV ofrece canales internacionales de todo el mundo, incluidos los principales canales globales."
        },
        {
          "icon": "Video",
          "title": "Video Bajo Demanda",
          "description": "Transmite temporadas completas de las mejores series, los estrenos más recientes, programas infantiles y mucho más con nuestra biblioteca VOD."
        },
        {
          "icon": "Laptop",
          "title": "Mira en Cualquier Dispositivo",
          "description": "Funciona en Smart TVs, Android, Amazon Fire Stick, KODI, MAG y cualquier dispositivo que soporte M3U o portales."
        },
        {
          "icon": "Users",
          "title": "Soporte de Clase Mundial",
          "description": "Ofrecemos tutoriales detallados y atención al cliente para que la instalación y el streaming sean rápidos y sencillos en cualquier lugar."
        },
        {
          "icon": "ShieldCheck",
          "title": "Pago Seguro",
          "description": "Pagos protegidos—sin procesos de facturación complicados."
        },
        {
          "icon": "CircleDollarSign",
          "title": "Garantía de 7 Días",
          "description": "Si nuestro servicio no es para ti, te devolvemos el dinero."
        }
      ]
    },
    "testimonials": {
      "title": "Lo que dicen nuestros clientes",
      "items": [
        {
          "name": "Alex Johnson",
          "role": "Amante del Cine",
          "quote": "La selección de canales es increíble y la calidad 4K es espectacular. Nunca tuve una mejor experiencia de streaming."
        },
        {
          "name": "Maria Garcia",
          "role": "Aficionada al Deporte",
          "quote": "Puedo ver todos los partidos de cualquier liga en vivo. El servicio es fiable y el soporte súper útil."
        },
        {
          "name": "David Smith",
          "role": "Padre de Familia",
          "quote": "Hay algo para todos. A los niños les encantan los dibujos y a nosotros los canales de cine. ¡Muy recomendado!"
        }
      ]
    },
    "cta": {
      "title": "¿Listo para empezar?",
      "subtitle": "Elige un plan que se adapte a ti y comienza a transmitir hoy. Activación instantánea, sin costos ocultos.",
      "button": "Ver Precios"
    },
    "favoriteDevices": {
      "title": "Nuestro IPTV funciona en todos tus dispositivos favoritos",
      "items": [
        {
          "title": "Smart TV, Smartphone, Tablets, Android y TV BOX",
          "description": "Usa nuestros servicios en Smartphones, Smart TVs, Android Box y dispositivos compatibles con IPTV (Android, iOS, Windows...)."
        },
        {
          "title": "Dispositivos MAG y Simuladores MAG",
          "description": "Envíanos la dirección MAC de tu dispositivo MAG o simulador (como STB). Te enviaremos el portal MAG y tendrás acceso a la mayor playlist."
        },
        {
          "title": "Portátiles y Ordenadores",
          "description": "Nuestro servicio es flexible y funciona en casi todos los dispositivos digitales. Instala un reproductor IPTV en tu ordenador y disfruta."
        }
      ]
    },
    "flawlessStreaming": {
      "title": "Streaming IPTV impecable, sin cortes",
      "description1": "Con nuestra gran colección de canales, no te perderás tus deportes o programas favoritos. Sé el primero en ver el nuevo episodio de tu serie.",
      "description2": "Nuestros canales y VOD cubren todos los gustos: deportes, noticias, dibujos, películas, series, adulto… ¡todo en una sola cuenta!",
      "features": [
        {
          "title": "CALIDAD COMPLETA 4K/HD/FHD",
          "description": "La mayoría de los canales están en HD y algunos en 4K."
        },
        {
          "title": "Zapping Rápido",
          "description": "Cambio de canal increíblemente rápido—aprox. 0,5 segundos."
        },
        {
          "title": "Actualizaciones Diarias",
          "description": "Lista de canales y biblioteca VOD actualizadas a diario."
        },
        {
          "title": "Entrega Rápida del Pedido",
          "description": "Tu suscripción premium se entrega inmediatamente tras el pago."
        }
      ]
    }
  },
  "pricing": {
    "title": "Encuentra el Plan Perfecto",
    "subtitle": "Precios simples y transparentes. Elige tu plan y comienza a ver en minutos.",
    "deviceLabel": "Dispositivo",
    "devicesLabel": "Dispositivos",
    "orderNow": "Hacer Pedido",
    "plans": [
      {
        "devices": "1",
        "plans": [
          {
            "name": "1 Mes",
            "price": "€15",
            "description": "Ideal para probar el servicio.",
            "features": [
              "Más de 20.000 Canales",
              "1 Dispositivo a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "3 Meses",
            "price": "€30",
            "description": "Opción popular para ver por temporadas.",
            "badge": "AHORRA 20%",
            "features": [
              "Más de 20.000 Canales",
              "1 Dispositivo a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "6 Meses",
            "price": "€50",
            "description": "Gran valor durante medio año.",
            "badge": "AHORRA 30%",
            "features": [
              "Más de 20.000 Canales",
              "1 Dispositivo a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "12 Meses",
            "price": "€80",
            "description": "Máximo ahorro durante un año completo.",
            "features": [
              "Más de 20.000 Canales",
              "1 Dispositivo a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "popular": true,
            "badge": "MEJOR OFERTA",
            "cta": "Empezar"
          }
        ]
      },
      {
        "devices": "2",
        "plans": [
          {
            "name": "1 Mes",
            "price": "€25",
            "description": "Ideal para probar el servicio.",
            "features": [
              "Más de 20.000 Canales",
              "2 Dispositivos a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "3 Meses",
            "price": "€45",
            "description": "Opción popular para ver por temporadas.",
            "badge": "AHORRA 20%",
            "features": [
              "Más de 20.000 Canales",
              "2 Dispositivos a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "6 Meses",
            "price": "€70",
            "description": "Gran valor durante medio año.",
            "badge": "AHORRA 30%",
            "features": [
              "Más de 20.000 Canales",
              "2 Dispositivos a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "12 Meses",
            "price": "€110",
            "description": "Máximo ahorro durante un año completo.",
            "features": [
              "Más de 20.000 Canales",
              "2 Dispositivos a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "popular": true,
            "badge": "MEJOR OFERTA",
            "cta": "Empezar"
          }
        ]
      },
      {
        "devices": "3",
        "plans": [
          {
            "name": "1 Mes",
            "price": "€35",
            "description": "Ideal para probar el servicio.",
            "features": [
              "Más de 20.000 Canales",
              "3 Dispositivos a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "3 Meses",
            "price": "€60",
            "description": "Opción popular para ver por temporadas.",
            "badge": "AHORRA 20%",
            "features": [
              "Más de 20.000 Canales",
              "3 Dispositivos a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "6 Meses",
            "price": "€90",
            "description": "Gran valor durante medio año.",
            "badge": "AHORRA 30%",
            "features": [
              "Más de 20.000 Canales",
              "3 Dispositivos a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "cta": "Empezar"
          },
          {
            "name": "12 Meses",
            "price": "€140",
            "description": "Máximo ahorro durante un año completo.",
            "features": [
              "Más de 20.000 Canales",
              "3 Dispositivos a la Vez",
              "100% Sin Buffering/Cortes",
              "Más de 150.000 Películas y Series",
              "¡Activación Instantánea!",
              "Canales 24/7",
              "Calidad 8K/4K/FHD/HD",
              "Todos los Canales PPV y Premium",
              "Guía de TV (EPG)",
              "Rendimiento 99,9%",
              "Catch-up",
              "Atención 24/7"
            ],
            "popular": true,
            "badge": "MEJOR OFERTA",
            "cta": "Empezar"
          }
        ]
      }
    ]
  },
  "faqs": {
    "title": "Preguntas Frecuentes",
    "subtitle": "¿Tienes dudas? Nosotros tenemos respuestas. Si no encuentras lo que buscas, pregúntanos.",
    "staticQuestions": [
      {
        "question": "¿Qué es IPTV?",
        "answer": "IPTV significa Televisión por Protocolo de Internet. Es un servicio que entrega contenido televisivo por internet en lugar de satélite o cable tradicionales."
      },
      {
        "question": "¿Qué dispositivos son compatibles?",
        "answer": "Compatibles: Smart TVs, cajas Android, Amazon Fire Stick, dispositivos MAG, PC/Mac y smartphones (iOS/Android)."
      },
      {
        "question": "¿Puedo ver en varios dispositivos a la vez?",
        "answer": "Sí, depende de tu plan. Cada plan tiene un número de conexiones simultáneas. Por ejemplo, el plan Estándar permite 3 conexiones."
      },
      {
        "question": "¿Hay prueba gratuita?",
        "answer": "A veces ofrecemos periodos de prueba. Consulta al soporte para saber la disponibilidad actual."
      },
      {
        "question": "¿Velocidad de internet recomendada?",
        "answer": "Con al menos 30 Mbps de descarga todo funcionará fluido en la máxima calidad. Si dudas, pide una prueba de 1 día."
      },
      {
        "question": "¿Métodos de pago disponibles?",
        "answer": "PayPal y tarjetas de débito/crédito (Visa, Mastercard, American Express y Discover)."
      },
      {
        "question": "¿Qué apps IPTV recomiendan?",
        "answer": "Para usar nuestro servicio 8K IPTV necesitas una app IPTV. Recomendamos: NUESTRA APP 8K VIP, OTT Navigator, Flix IPTV, IPTV Smarters Lite/Pro (Smarters Player Lite), TiviMate, Ibo Player. Cuidado con apps falsas que roban credenciales. Si no sabes cuál usar, contáctanos."
      },
      {
        "question": "¿Cuánto tardaré en recibir mi pedido?",
        "answer": "Enviamos un correo entre 10 minutos y 1 hora tras la compra. En horas pico (noches/fines de semana) puede tardar hasta 1 hora."
      },
      {
        "question": "¿Qué tipos de dispositivos se soportan?",
        "answer": "Funciona en la mayoría: Smart TVs, Kodi, VLC, PC, Vu+, DreamBox, Firestick, Enigma, cajas Android, smartphones Android y más."
      },
      {
        "question": "¿Qué obtengo con una suscripción IPTV?",
        "answer": "Más de 35.000 canales, carga rápida, conexión estable, muchos canales en Full HD y una gran biblioteca de películas y series bajo demanda."
      },
      {
        "question": "¿Qué es exactamente una suscripción IPTV?",
        "answer": "Una alternativa económica a la TV por cable que entrega el contenido por internet y funciona en muchos dispositivos modernos."
      },
      {
        "question": "¿Puedo usar mi suscripción en varios dispositivos?",
        "answer": "Puedes usarla en varios dispositivos dentro del límite de conexiones simultáneas de tu plan."
      },
      {
        "question": "¿Qué dispositivos puedo usar para IPTV?",
        "answer": "Acceso en Smart TVs (Samsung, Sony, LG…), dispositivos Android, Apple TV, iPhone, Google Chromecast, MAG (con STB emulator) y FireStick."
      },
      {
        "question": "¿Qué ofrecemos?",
        "answer": "Suscripción de TV por internet para Smart TV Samsung y LG, PC, Mac, iPhone, iPad, Apple TV 4 y 5, Firestick, caja IPTV, Android, tablets, Android Box, MAG y STB Emulator, con acceso a 35.000 canales y más de 150.000 películas y series 8K/4K/Ultra HD."
      }
    ],
    "dynamicQuestion": {
      "title": "¿Aún tienes una pregunta?",
      "placeholder": "Escribe tu pregunta aquí...",
      "button": "Preguntar al Asistente IA",
      "loading": "Generando respuesta...",
      "yourQuestion": "Tu pregunta:",
      "aiAnswer": "Respuesta del Asistente IA:"
    }
  },
  "footer": {
    "company": "StreamHub Leads",
    "rights": "Todos los derechos reservados.",
    "legal": {
      "title": "Legal",
      "terms": "Términos del Servicio",
      "privacy": "Política de Privacidad",
      "refund": "Política de Reembolso"
    },
    "social": {
      "title": "Social"
    }
  },
  "contact": {
    "title": "Contáctanos",
    "subtitle": "Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.",
    "form": {
      "name": {
        "label": "Nombre",
        "placeholder": "Tu nombre"
      },
      "email": {
        "label": "Correo electrónico",
        "placeholder": "tu@ejemplo.com"
      },
      "message": {
        "label": "Mensaje",
        "placeholder": "Tu mensaje..."
      },
      "submit": "Enviar Mensaje",
      "success": "¡Gracias por tu mensaje! Nos pondremos en contacto en breve."
    },
    "altContact": {
      "title": "O contáctanos directamente:",
      "telegram": {
        "label": "Telegram",
        "url": "https://t.me/your-telegram-username"
      },
      "whatsapp": {
        "label": "WhatsApp",
        "url": "https://wa.me/your-whatsapp-number"
      },
      "email": {
        "label": "Correo",
        "address": "support@streamhubleads.com"
      }
    }
  },
  "checkout": {
    "title": "Finalizar Pedido",
    "subtitle": "Estás a un paso de la mejor experiencia de streaming. Completa el formulario para recibir los detalles de tu suscripción.",
    "form": {
      "name": {
        "label": "Nombre",
        "placeholder": "Juan Pérez"
      },
      "email": {
        "label": "Correo electrónico",
        "placeholder": "tu@ejemplo.com"
      },
      "phone": {
        "label": "Teléfono",
        "placeholder": "+34 600 000 000"
      },
      "submit": "Recibir mi Suscripción"
    }
  },
  "thankYou": {
    "title": "¡Gracias!",
    "message": "Hemos recibido tu solicitud. Te contactaremos por correo con los detalles de la suscripción y los próximos pasos.",
    "nextSteps": "¿Qué sigue?",
    "links": {
      "tutorials": "Ver nuestros tutoriales",
      "contact": "Contáctanos si tienes preguntas"
    }
  },
  "reseller": {
    "title": "Precios para Revendedores",
    "subtitle": "Únete a nuestro programa de revendedores y empieza tu negocio IPTV hoy.",
    "mostPopular": "Más Popular",
    "plans": [
      {
        "name": "120 Créditos",
        "description": "Panel de Revendedor",
        "price": "€249.99",
        "creditInfo": [
          { "credits": "1 Crédito", "duration": "Suscripción de 1 Mes" },
          { "credits": "3 Créditos", "duration": "3 Meses" },
          { "credits": "6 Créditos", "duration": "6 Meses" },
          { "credits": "12 Créditos", "duration": "12 Meses" }
        ],
        "features": [
          "Los créditos nunca caducan",
          "EPG en Tiempo Real (Guía de TV)",
          "Catch-Up TV compatible",
          "Totalmente automatizado vía API",
          "Soporte rápido 24/7 para revendedores"
        ],
        "popular": false
      },
      {
        "name": "240 Créditos",
        "description": "Panel de Revendedor",
        "price": "€489.99",
        "creditInfo": [
          { "credits": "1 Crédito", "duration": "Suscripción de 1 Mes" },
          { "credits": "3 Créditos", "duration": "3 Meses" },
          { "credits": "6 Créditos", "duration": "6 Meses" },
          { "credits": "12 Créditos", "duration": "12 Meses" }
        ],
        "features": [
          "Los créditos nunca caducan",
          "EPG en Tiempo Real (Guía de TV)",
          "Catch-Up TV compatible",
          "Totalmente automatizado vía API",
          "Soporte rápido 24/7 para revendedores"
        ],
        "popular": false
      },
      {
        "name": "360 Créditos",
        "description": "Panel de Revendedor",
        "price": "€719.99",
        "creditInfo": [
          { "credits": "1 Crédito", "duration": "Suscripción de 1 Mes" },
          { "credits": "3 Créditos", "duration": "3 Meses" },
          { "credits": "6 Créditos", "duration": "6 Meses" },
          { "credits": "12 Créditos", "duration": "12 Meses" }
        ],
        "features": [
          "Los créditos nunca caducan",
          "EPG en Tiempo Real (Guía de TV)",
          "Catch-Up TV compatible",
          "Totalmente automatizado vía API",
          "Soporte rápido 24/7 para revendedores"
        ],
        "popular": true
      },
      {
        "name": "480 Créditos",
        "description": "Panel de Revendedor",
        "price": "€899.99",
        "creditInfo": [
          { "credits": "1 Crédito", "duration": "Suscripción de 1 Mes" },
          { "credits": "3 Créditos", "duration": "3 Meses" },
          { "credits": "6 Créditos", "duration": "6 Meses" },
          { "credits": "12 Créditos", "duration": "12 Meses" }
        ],
        "features": [
          "Los créditos nunca caducan",
          "EPG en Tiempo Real (Guía de TV)",
          "Catch-Up TV compatible",
          "Totalmente automatizado vía API",
          "Soporte rápido 24/7 para revendedores"
        ],
        "popular": false
      }
    ]
  },
  "tutorials": {
    "title": "Tutoriales",
    "subtitle": "Guías paso a paso para configurar tu IPTV en cualquier dispositivo."
  }
}

```

# src/dictionaries/fr.json

```json
{
  "site": {
    "name": "StreamHub Leads",
    "description": "Votre destination ultime pour le streaming IPTV. Découvrez nos offres et rejoignez la révolution du streaming.",
    "ogImage": "/og-image.png"
  },
  "navigation": {
    "home": "Accueil",
    "pricing": "Tarifs",
    "faqs": "FAQ",
    "tutorials": "Tutoriels",
    "reseller": "Revendeur",
    "contact": "Contact",
    "checkout": "Paiement"
  },
  "localeSwitcher": {
    "label": "Changer de langue",
    "selected": "Sélectionné : {locale}"
  },
  "homepage": {
    "hero": {
      "title": "Vivez le futur de la télévision",
      "subtitle": "Streaming de haute qualité, des milliers de chaînes et un support inégalé. Tout au même endroit.",
      "cta": "Voir les offres et tarifs"
    },
    "features": {
      "title": "Pourquoi choisir StreamHub ?",
      "items": [
        {
          "icon": "Globe",
          "title": "Accès mondial",
          "description": "Regardez vos contenus préférés depuis n’importe où dans le monde. Il vous suffit d’une connexion Internet."
        },
        {
          "icon": "MonitorUp",
          "title": "Qualité 4K & HD",
          "description": "Profitez d’une image ultra nette grâce à notre vaste bibliothèque de chaînes 4K et HD."
        },
        {
          "icon": "Smartphone",
          "title": "Compatibilité multi-appareils",
          "description": "Streamez sur votre TV, ordinateur, tablette ou smartphone. Nous prenons en charge tous les principaux appareils."
        },
        {
          "icon": "Clock",
          "title": "Disponibilité 99,9 %",
          "description": "Notre infrastructure robuste vous garantit une expérience stable et fiable 24h/24 et 7j/7."
        }
      ]
    },
    "howItWorks": {
      "title": "Comment ça marche ?",
      "subtitle": "Comment fonctionne notre meilleur service IPTV.",
      "steps": [
        {
          "number": "01",
          "title": "Passez votre commande",
          "description": "Dans le tableau des tarifs, choisissez la durée d’abonnement souhaitée puis validez votre commande."
        },
        {
          "number": "02",
          "title": "Recevez votre compte",
          "description": "Le traitement prend 5 à 15 minutes. Vérifiez votre boîte de réception et vos spams. Pour accélérer le processus, contactez-nous sur WhatsApp."
        },
        {
          "number": "03",
          "title": "Profitez de votre service IPTV !",
          "description": "Profitez dès maintenant de toutes les chaînes, films et séries. Plongez dans un divertissement illimité avec notre service IPTV."
        }
      ]
    },
    "whyChooseUs": {
      "title": "Pourquoi choisir notre serveur",
      "items": [
        {
          "icon": "Radio",
          "title": "Des milliers de chaînes",
          "description": "Votre abonnement IPTV vous donne accès à des chaînes internationales du monde entier, y compris toutes les principales chaînes."
        },
        {
          "icon": "Video",
          "title": "Vidéo à la demande",
          "description": "Regardez des saisons complètes des meilleures séries, les derniers films à succès, des programmes pour enfants et bien plus encore grâce à notre vaste bibliothèque VOD."
        },
        {
          "icon": "Laptop",
          "title": "Regardez sur n’importe quel appareil",
          "description": "Notre streaming IPTV fonctionne sur Smart TV, Android, Amazon Fire Stick, KODI, MAG et tout appareil compatible M3U ou portails."
        },
        {
          "icon": "Users",
          "title": "Support de classe mondiale",
          "description": "Nous proposons des tutoriels détaillés et une assistance client pour une installation et un streaming simples et rapides, où que vous soyez."
        },
        {
          "icon": "ShieldCheck",
          "title": "Paiement sûr et sécurisé",
          "description": "Paiements sécurisés – aucun processus de facturation compliqué requis."
        },
        {
          "icon": "CircleDollarSign",
          "title": "Garantie de remboursement 7 jours",
          "description": "Si notre service ne vous convient pas, nous vous rembourserons intégralement."
        }
      ]
    },
    "testimonials": {
      "title": "Ce que disent nos clients",
      "items": [
        {
          "name": "Alex Johnson",
          "role": "Cinéphile",
          "quote": "Le choix de chaînes est incroyable et la qualité 4K est époustouflante. Je n’ai jamais eu une meilleure expérience de streaming."
        },
        {
          "name": "Maria Garcia",
          "role": "Fan de sport",
          "quote": "Je peux regarder chaque match, de n’importe quelle ligue, en direct. Le service est fiable et l’équipe de support super utile."
        },
        {
          "name": "David Smith",
          "role": "Père de famille",
          "quote": "Il y a quelque chose pour chacun dans la famille. Les enfants adorent les dessins animés et nous les chaînes de films. Hautement recommandé !"
        }
      ]
    },
    "cta": {
      "title": "Prêt à commencer ?",
      "subtitle": "Choisissez l’offre qui vous convient et commencez à streamer dès aujourd’hui. Activation instantanée, aucun frais caché.",
      "button": "Voir les tarifs"
    },
    "favoriteDevices": {
      "title": "Notre service IPTV prend en charge tous vos appareils favoris",
      "items": [
        {
          "title": "Smart TV, smartphone, tablettes, Android et TV BOX",
          "description": "Vous pouvez utiliser notre service sur tous les smartphones et téléviseurs, box Android et tout appareil capable de lire l’IPTV sous différents OS (Android, iOS, Windows, etc.)."
        },
        {
          "title": "Appareils MAG & simulateurs MAG",
          "description": "Envoyez-nous simplement l’adresse MAC de votre appareil MAG ou de votre simulateur (comme STB). Nous vous fournirons le portail MAG et vous aurez accès à la plus grande playlist !"
        },
        {
          "title": "Ordinateurs portables & de bureau",
          "description": "Notre service est flexible et fonctionne sur presque tous les appareils numériques. Installez un lecteur IPTV sur votre ordinateur et profitez du streaming."
        }
      ]
    },
    "flawlessStreaming": {
      "title": "Un streaming IPTV fluide, sans mise en mémoire tampon",
      "description1": "Grâce à notre large collection de chaînes TV, ne manquez jamais vos matchs et émissions préférés. Soyez le premier à voir le nouvel épisode de votre série favorite.",
      "description2": "Nos chaînes TV et VOD conviennent à tous les centres d’intérêt : sport, actus, dessins animés, films, séries, adulte… tout dans un seul compte !",
      "features": [
        {
          "title": "QUALITÉ 4K/HD/FHD COMPLÈTE",
          "description": "La plupart de nos chaînes TV sont en HD et certaines en 4K."
        },
        {
          "title": "Zapping ultra rapide",
          "description": "Notre service IPTV offre un temps de zapping incroyable, environ 0,5 seconde !"
        },
        {
          "title": "Mises à jour quotidiennes",
          "description": "Notre liste de chaînes et notre bibliothèque VOD sont mises à jour chaque jour pour vous proposer les contenus les plus récents."
        },
        {
          "title": "Livraison rapide de la commande",
          "description": "Nous activons immédiatement votre abonnement IPTV Premium après le paiement."
        }
      ]
    }
  },
  "pricing": {
    "title": "Trouvez l’offre parfaite",
    "subtitle": "Tarification simple et transparente. Choisissez votre offre et commencez à regarder en quelques minutes.",
    "deviceLabel": "Appareil",
    "devicesLabel": "Appareils",
    "orderNow": "Commander",
    "plans": [
      {
        "devices": "1",
        "plans": [
          {
            "name": "1 mois",
            "price": "€15",
            "description": "Idéal pour essayer le service.",
            "features": [
              "20 000+ chaînes",
              "1 appareil en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "3 mois",
            "price": "€30",
            "description": "Un choix populaire pour les périodes saisonnières.",
            "badge": "ÉCONOMISEZ 20 %",
            "features": [
              "20 000+ chaînes",
              "1 appareil en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "6 mois",
            "price": "€50",
            "description": "Excellent rapport qualité-prix pour un semestre de divertissement.",
            "badge": "ÉCONOMISEZ 30 %",
            "features": [
              "20 000+ chaînes",
              "1 appareil en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "12 mois",
            "price": "€80",
            "description": "Économies maximales pour une année complète de streaming.",
            "features": [
              "20 000+ chaînes",
              "1 appareil en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "popular": true,
            "badge": "MEILLEURE OFFRE",
            "cta": "Commencer"
          }
        ]
      },
      {
        "devices": "2",
        "plans": [
          {
            "name": "1 mois",
            "price": "€25",
            "description": "Idéal pour essayer le service.",
            "features": [
              "20 000+ chaînes",
              "2 appareils en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "3 mois",
            "price": "€45",
            "description": "Un choix populaire pour les périodes saisonnières.",
            "badge": "ÉCONOMISEZ 20 %",
            "features": [
              "20 000+ chaînes",
              "2 appareils en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "6 mois",
            "price": "€70",
            "description": "Excellent rapport qualité-prix pour un semestre de divertissement.",
            "badge": "ÉCONOMISEZ 30 %",
            "features": [
              "20 000+ chaînes",
              "2 appareils en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "12 mois",
            "price": "€110",
            "description": "Économies maximales pour une année complète de streaming.",
            "features": [
              "20 000+ chaînes",
              "2 appareils en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "popular": true,
            "badge": "MEILLEURE OFFRE",
            "cta": "Commencer"
          }
        ]
      },
      {
        "devices": "3",
        "plans": [
          {
            "name": "1 mois",
            "price": "€35",
            "description": "Idéal pour essayer le service.",
            "features": [
              "20 000+ chaînes",
              "3 appareils en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "3 mois",
            "price": "€60",
            "description": "Un choix populaire pour les périodes saisonnières.",
            "badge": "ÉCONOMISEZ 20 %",
            "features": [
              "20 000+ chaînes",
              "3 appareils en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "6 mois",
            "price": "€90",
            "description": "Excellent rapport qualité-prix pour un semestre de divertissement.",
            "badge": "ÉCONOMISEZ 30 %",
            "features": [
              "20 000+ chaînes",
              "3 appareils en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "cta": "Commencer"
          },
          {
            "name": "12 mois",
            "price": "€140",
            "description": "Économies maximales pour une année complète de streaming.",
            "features": [
              "20 000+ chaînes",
              "3 appareils en même temps",
              "100 % sans buffering / sans gel",
              "+150 000 films et séries",
              "Activation instantanée",
              "Toutes les chaînes 24/7",
              "Qualité 8K/4K/FHD/HD",
              "Tous les canaux PPV et Premium",
              "Guide TV (EPG)",
              "Performance 99,9 %",
              "Catch-up",
              "Support client 24/7"
            ],
            "popular": true,
            "badge": "MEILLEURE OFFRE",
            "cta": "Commencer"
          }
        ]
      }
    ]
  },
  "faqs": {
    "title": "Foire aux questions",
    "subtitle": "Des questions ? Nous avons les réponses. Si vous ne trouvez pas, n’hésitez pas à nous demander.",
    "staticQuestions": [
      {
        "question": "Qu’est-ce que l’IPTV ?",
        "answer": "IPTV signifie Television sur Protocole Internet. C’est un service qui diffuse le contenu TV via Internet au lieu du satellite ou du câble traditionnels."
      },
      {
        "question": "Quels appareils sont compatibles ?",
        "answer": "Nous prenons en charge une large gamme d’appareils : Smart TV, box Android, Amazon Fire Stick, appareils MAG, PC/Mac et smartphones (iOS/Android)."
      },
      {
        "question": "Puis-je regarder sur plusieurs appareils simultanément ?",
        "answer": "Oui, selon votre offre. Chaque offre autorise un nombre précis de connexions simultanées. Par exemple, l’offre Standard permet 3 connexions en même temps."
      },
      {
        "question": "Y a-t-il un essai gratuit ?",
        "answer": "Nous proposons parfois des périodes d’essai. Contactez notre support pour connaître les offres disponibles actuellement."
      },
      {
        "question": "Débit Internet recommandé ?",
        "answer": "Avec un débit descendant d’au moins 30 Mb/s, tout fonctionnera parfaitement en qualité maximale. En cas de doute, demandez un essai d’un jour pour tester la qualité."
      },
      {
        "question": "Moyens de paiement disponibles ?",
        "answer": "PayPal et carte bancaire/crédit (Visa, Mastercard, American Express, Discover…)."
      },
      {
        "question": "Quelles applications IPTV recommandez-vous ?",
        "answer": "Pour utiliser notre service IPTV 8K, vous aurez besoin d’une application IPTV. Elles existent pour de nombreux appareils.\n\nNous recommandons :\n\nNOTRE APPLICATION 8K VIP\nOTT Navigator\nFlix IPTV\nIPTV Smarters Lite ou Pro (Smarters Player Lite)\nTiviMate IPTV Player\nIbo Player\n\nSelon les appareils, les applications diffèrent. Sur la plupart des TV, IPTV Smarters est disponible même sans Android. Si vous doutez de la compatibilité, envoyez-nous un message et nous vous aiderons.\n\nAttention aux fausses applications IPTV qui volent des identifiants. Restez sur les options ci-dessus."
      },
      {
        "question": "Sous combien de temps recevrai-je ma commande ?",
        "answer": "Nous visons un envoi d’e-mail entre 10 minutes et 1 heure maximum après l’achat pour configurer votre commande. Pendant les périodes chargées (soir et week-end), cela peut prendre jusqu’à 1 heure."
      },
      {
        "question": "Quels types d’appareils sont pris en charge ?",
        "answer": "Notre service fonctionne sur la plupart des appareils : Smart TV, Kodi, VLC, PC, Vu+, DreamBox, FireStick, Enigma, box Android, smartphones Android, etc."
      },
      {
        "question": "Que comprend un abonnement IPTV ?",
        "answer": "Un abonnement IPTV vous évite de dépendre du câblo-opérateur, tout en offrant un très grand choix. Plus de 35 000 chaînes, chargements rapides, connexion sécurisée, de nombreuses chaînes en Full HD et une immense vidéothèque."
      },
      {
        "question": "Qu’est-ce qu’un abonnement IPTV ?",
        "answer": "De plus en plus de personnes abandonnent le câble pour économiser et simplifier leurs services. L’IPTV est née de ce besoin et permet de recevoir les contenus voulus sur des appareils modernes, à moindre coût."
      },
      {
        "question": "Puis-je utiliser mon abonnement sur plusieurs appareils ?",
        "answer": "Oui, vous pouvez utiliser votre abonnement sur plusieurs appareils."
      },
      {
        "question": "Quels appareils peuvent être utilisés pour l’IPTV ?",
        "answer": "Nos services sont accessibles sur toutes les Smart TV (Samsung, Sony, LG…), tous les appareils Android (téléphones), Apple TV, iPhone, Google Chromecast, boîtier MAG via l’app STB Emulator et FireStick."
      },
      {
        "question": "Qu’offrons-nous ?",
        "answer": "Nous fournissons un service d’abonnement TV directement sur vos appareils via Internet : Smart TV Samsung & LG, PC, Mac, iPhone, iPad, Apple TV 4 & 5, Amazon Firestick, boîtier IPTV, téléphones et tablettes Android, box Android, MAG et STB Emulator. Accès exclusif à 35 000 chaînes et plus de 150 000 films et séries 8K/4K/Ultra HD à la demande (sports, films, programmes populaires, Netflix, Amazon Prime, Disney+, etc.)."
      }
    ],
    "dynamicQuestion": {
      "title": "Encore une question ?",
      "placeholder": "Tapez votre question ici…",
      "button": "Demander à l’assistant IA",
      "loading": "Génération de la réponse…",
      "yourQuestion": "Votre question :",
      "aiAnswer": "Réponse de l’assistant IA :"
    }
  },
  "footer": {
    "company": "StreamHub Leads",
    "rights": "Tous droits réservés.",
    "legal": {
      "title": "Légal",
      "terms": "Conditions d’utilisation",
      "privacy": "Politique de confidentialité",
      "refund": "Politique de remboursement"
    },
    "social": {
      "title": "Réseaux sociaux"
    }
  },
  "contact": {
    "title": "Contactez-nous",
    "subtitle": "Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons au plus vite.",
    "form": {
      "name": {
        "label": "Nom",
        "placeholder": "Votre nom"
      },
      "email": {
        "label": "E-mail",
        "placeholder": "you@example.com"
      },
      "message": {
        "label": "Message",
        "placeholder": "Votre message…"
      },
      "submit": "Envoyer le message",
      "success": "Merci pour votre message ! Nous vous répondrons sous peu."
    },
    "altContact": {
      "title": "Ou contactez-nous directement :",
      "telegram": {
        "label": "Telegram",
        "url": "https://t.me/your-telegram-username"
      },
      "whatsapp": {
        "label": "WhatsApp",
        "url": "https://wa.me/your-whatsapp-number"
      },
      "email": {
        "label": "E-mail",
        "address": "support@streamhubleads.com"
      }
    }
  },
  "checkout": {
    "title": "Paiement",
    "subtitle": "Vous n’êtes plus qu’à une étape de la meilleure expérience de streaming. Remplissez le formulaire pour recevoir les détails de votre abonnement.",
    "form": {
      "name": {
        "label": "Nom",
        "placeholder": "Jean Dupont"
      },
      "email": {
        "label": "Adresse e-mail",
        "placeholder": "you@example.com"
      },
      "phone": {
        "label": "Numéro de téléphone",
        "placeholder": "+33 6 12 34 56 78"
      },
      "submit": "Obtenir mon abonnement"
    }
  },
  "thankYou": {
    "title": "Merci !",
    "message": "Votre demande a bien été reçue. Nous vous contacterons prochainement par e-mail avec les détails de votre abonnement et les prochaines étapes.",
    "nextSteps": "Et ensuite ?",
    "links": {
      "tutorials": "Consulter nos tutoriels",
      "contact": "Nous contacter pour toute question"
    }
  },
  "reseller": {
    "title": "Tarifs revendeur",
    "subtitle": "Rejoignez notre programme revendeur et lancez dès aujourd’hui votre activité IPTV.",
    "mostPopular": "Le plus populaire",
    "plans": [
      {
        "name": "120 Crédits",
        "description": "Panneau Revendeur",
        "price": "€249.99",
        "creditInfo": [
          { "credits": "1 Crédit", "duration": "Abonnement 1 mois" },
          { "credits": "3 Crédits", "duration": "3 mois" },
          { "credits": "6 Crédits", "duration": "6 mois" },
          { "credits": "12 Crédits", "duration": "12 mois" }
        ],
        "features": [
          "Crédits sans expiration",
          "EPG en temps réel (guide TV)",
          "Catch-Up TV pris en charge",
          "Automatisation complète via API",
          "Support revendeur 24/7 rapide"
        ],
        "popular": false
      },
      {
        "name": "240 Crédits",
        "description": "Panneau Revendeur",
        "price": "€489.99",
        "creditInfo": [
          { "credits": "1 Crédit", "duration": "Abonnement 1 mois" },
          { "credits": "3 Crédits", "duration": "3 mois" },
          { "credits": "6 Crédits", "duration": "6 mois" },
          { "credits": "12 Crédits", "duration": "12 mois" }
        ],
        "features": [
          "Crédits sans expiration",
          "EPG en temps réel (guide TV)",
          "Catch-Up TV pris en charge",
          "Automatisation complète via API",
          "Support revendeur 24/7 rapide"
        ],
        "popular": false
      },
      {
        "name": "360 Crédits",
        "description": "Panneau Revendeur",
        "price": "€719.99",
        "creditInfo": [
          { "credits": "1 Crédit", "duration": "Abonnement 1 mois" },
          { "credits": "3 Crédits", "duration": "3 mois" },
          { "credits": "6 Crédits", "duration": "6 mois" },
          { "credits": "12 Crédits", "duration": "12 mois" }
        ],
        "features": [
          "Crédits sans expiration",
          "EPG en temps réel (guide TV)",
          "Catch-Up TV pris en charge",
          "Automatisation complète via API",
          "Support revendeur 24/7 rapide"
        ],
        "popular": true
      },
      {
        "name": "480 Crédits",
        "description": "Panneau Revendeur",
        "price": "€899.99",
        "creditInfo": [
          { "credits": "1 Crédit", "duration": "Abonnement 1 mois" },
          { "credits": "3 Crédits", "duration": "3 mois" },
          { "credits": "6 Crédits", "duration": "6 mois" },
          { "credits": "12 Crédits", "duration": "12 mois" }
        ],
        "features": [
          "Crédits sans expiration",
          "EPG en temps réel (guide TV)",
          "Catch-Up TV pris en charge",
          "Automatisation complète via API",
          "Support revendeur 24/7 rapide"
        ],
        "popular": false
      }
    ]
  },
  "tutorials": {
    "title": "Tutoriels",
    "subtitle": "Guides pas à pas pour configurer votre service IPTV sur n’importe quel appareil."
  }
}

```

# src/dictionaries/nl.json

```json
{
  "site": {
    "name": "StreamHub Leads",
    "description": "Jouw ultieme bestemming voor IPTV-streaming. Ontdek onze plannen en sluit je aan bij de streamingrevolutie.",
    "ogImage": "/og-image.png"
  },
  "navigation": {
    "home": "Home",
    "pricing": "Prijzen",
    "faqs": "Veelgestelde Vragen",
    "tutorials": "Handleidingen",
    "reseller": "Reseller",
    "contact": "Contact",
    "checkout": "Afrekenen"
  },
  "localeSwitcher": {
    "label": "Taal wijzigen",
    "selected": "Geselecteerd: {locale}"
  },
  "homepage": {
    "hero": {
      "title": "Ervaar de Toekomst van Televisie",
      "subtitle": "Streaming van hoge kwaliteit, duizenden kanalen en ongeëvenaarde ondersteuning. Alles op één plek.",
      "cta": "Bekijk Plannen & Prijzen"
    },
    "features": {
      "title": "Waarom kiezen voor StreamHub?",
      "items": [
        {
          "icon": "Globe",
          "title": "Wereldwijde Toegang",
          "description": "Bekijk je favoriete content overal ter wereld. Alles wat je nodig hebt is een internetverbinding."
        },
        {
          "icon": "MonitorUp",
          "title": "4K & HD-kwaliteit",
          "description": "Geniet van haarscherpe beeldkwaliteit met onze uitgebreide bibliotheek aan 4K- en HD-kanalen."
        },
        {
          "icon": "Smartphone",
          "title": "Ondersteuning voor Meerdere Apparaten",
          "description": "Stream op je tv, computer, tablet of smartphone. We ondersteunen alle grote apparaten."
        },
        {
          "icon": "Clock",
          "title": "99,9% Uptime",
          "description": "Onze robuuste infrastructuur zorgt 24/7 voor een stabiele en betrouwbare kijkervaring."
        }
      ]
    },
    "howItWorks": {
      "title": "Hoe werkt het?",
      "subtitle": "Zo werkt onze beste IPTV-service.",
      "steps": [
        {
          "number": "01",
          "title": "Plaats je bestelling",
          "description": "Plaats je bestelling via de prijstabel door je gewenste abonnementsperiode te kiezen."
        },
        {
          "number": "02",
          "title": "Ontvang je account",
          "description": "Dit duurt 5–15 minuten. Controleer je inbox en spammap. Wil je sneller geholpen worden? Stuur ons even een bericht op WhatsApp."
        },
        {
          "number": "03",
          "title": "Geniet van je IPTV-service!",
          "description": "Geniet meteen van alle kanalen, films en series. Eindeloos entertainment met onze IPTV-service."
        }
      ]
    },
    "whyChooseUs": {
      "title": "Waarom onze server?",
      "items": [
        {
          "icon": "Radio",
          "title": "Duizenden Kanalen",
          "description": "Je IPTV-abonnement biedt internationale kanalen van over de hele wereld, inclusief alle grote zenders."
        },
        {
          "icon": "Video",
          "title": "Video on Demand",
          "description": "Stream volledige seizoenen van topseries, de nieuwste films, kinderprogramma’s en meer vanuit onze uitgebreide VOD-bibliotheek."
        },
        {
          "icon": "Laptop",
          "title": "Kijk op Elk Apparaat",
          "description": "Werkt op Smart TV’s, Android, Amazon Fire Stick, KODI, MAG en elk apparaat dat M3U of portals ondersteunt."
        },
        {
          "icon": "Users",
          "title": "Support van Wereldklasse",
          "description": "Uitgebreide handleidingen en klantenservice maken installatie en streaming snel en eenvoudig—waar je ook bent."
        },
        {
          "icon": "ShieldCheck",
          "title": "Veilig & Betrouwbaar Betalen",
          "description": "Veilige betalingen—geen ingewikkelde factureringsprocessen."
        },
        {
          "icon": "CircleDollarSign",
          "title": "7 Dagen Niet-goed-geld-terug",
          "description": "Als onze service niet bij je past, krijg je je geld volledig terug."
        }
      ]
    },
    "testimonials": {
      "title": "Wat onze klanten zeggen",
      "items": [
        {
          "name": "Alex Johnson",
          "role": "Filmliefhebber",
          "quote": "De kanaalselectie is ongelooflijk en de 4K-kwaliteit is adembenemend. Nog nooit zo’n goede streamingervaring gehad."
        },
        {
          "name": "Maria Garcia",
          "role": "Sportfan",
          "quote": "Ik kan elke wedstrijd uit elke competitie live kijken. Betrouwbare service en superbehulpzame support."
        },
        {
          "name": "David Smith",
          "role": "Gezinsman",
          "quote": "Er is voor ieder wat wils. De kids houden van de cartoons en wij van de filmkanalen. Aanrader!"
        }
      ]
    },
    "cta": {
      "title": "Klaar om te starten?",
      "subtitle": "Kies een plan dat bij je past en begin vandaag met streamen. Directe activatie, geen verborgen kosten.",
      "button": "Bekijk Prijzen"
    },
    "favoriteDevices": {
      "title": "Onze IPTV-service ondersteunt al je favoriete apparaten",
      "items": [
        {
          "title": "Smart TV, Smartphone, Tablets, Android en TV-box",
          "description": "Gebruik onze diensten op smartphones, Smart TV’s, Android Box en elk apparaat dat IPTV ondersteunt (Android, iOS, Windows...)."
        },
        {
          "title": "MAG-apparaten & MAG-simulators",
          "description": "Stuur ons het MAC-adres van je MAG-apparaat of simulator (zoals STB). Wij sturen de MAG-portal en je krijgt toegang tot de grootste playlist!"
        },
        {
          "title": "Laptops & Computers",
          "description": "Onze service is flexibel en werkt op vrijwel alle digitale apparaten. Installeer een IPTV-player op je computer en kijk direct."
        }
      ]
    },
    "flawlessStreaming": {
      "title": "Perfecte IPTV-streaming zonder buffering",
      "description1": "Met onze uitgebreide zendercollectie mis je nooit je favoriete sportwedstrijden of tv-programma’s. Kijk als eerste de nieuwste aflevering van je serie.",
      "description2": "Onze tv-kanalen en VOD’s passen bij elke interesse: sport, nieuws, tekenfilms, films, series, adult—alles in één account!",
      "features": [
        {
          "title": "VOLLEDIGE 4K/HD/FHD-KWALITEIT",
          "description": "De meeste kanalen zijn beschikbaar in HD en sommige in 4K."
        },
        {
          "title": "Snel Zappen",
          "description": "Razendsnelle kanaalwissel—ongeveer 0,5 seconde!"
        },
        {
          "title": "Dagelijkse Updates",
          "description": "Onze zenderlijst en VOD-bibliotheek worden dagelijks aangevuld."
        },
        {
          "title": "Snelle Levering",
          "description": "Je premium IPTV-abonnement wordt direct na betaling geleverd."
        }
      ]
    }
  },
  "pricing": {
    "title": "Vind het Perfecte Plan",
    "subtitle": "Eenvoudige, transparante prijzen. Kies je plan en kijk binnen enkele minuten.",
    "deviceLabel": "Apparaat",
    "devicesLabel": "Apparaten",
    "orderNow": "Bestel Nu",
    "plans": [
      {
        "devices": "1",
        "plans": [
          {
            "name": "1 Maand",
            "price": "€15",
            "description": "Ideaal om de service uit te proberen.",
            "features": [
              "20.000+ Kanalen",
              "1 Apparaat Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "3 Maanden",
            "price": "€30",
            "description": "Populaire keuze voor seizoenskijkers.",
            "badge": "BESPAAR 20%",
            "features": [
              "20.000+ Kanalen",
              "1 Apparaat Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "6 Maanden",
            "price": "€50",
            "description": "Veel waar voor je geld voor een half jaar.",
            "badge": "BESPAAR 30%",
            "features": [
              "20.000+ Kanalen",
              "1 Apparaat Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "12 Maanden",
            "price": "€80",
            "description": "Maximale besparing voor een heel jaar.",
            "features": [
              "20.000+ Kanalen",
              "1 Apparaat Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "popular": true,
            "badge": "BESTE DEAL",
            "cta": "Starten"
          }
        ]
      },
      {
        "devices": "2",
        "plans": [
          {
            "name": "1 Maand",
            "price": "€25",
            "description": "Ideaal om de service uit te proberen.",
            "features": [
              "20.000+ Kanalen",
              "2 Apparaten Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "3 Maanden",
            "price": "€45",
            "description": "Populaire keuze voor seizoenskijkers.",
            "badge": "BESPAAR 20%",
            "features": [
              "20.000+ Kanalen",
              "2 Apparaten Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "6 Maanden",
            "price": "€70",
            "description": "Veel waar voor je geld voor een half jaar.",
            "badge": "BESPAAR 30%",
            "features": [
              "20.000+ Kanalen",
              "2 Apparaten Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "12 Maanden",
            "price": "€110",
            "description": "Maximale besparing voor een heel jaar.",
            "features": [
              "20.000+ Kanalen",
              "2 Apparaten Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "popular": true,
            "badge": "BESTE DEAL",
            "cta": "Starten"
          }
        ]
      },
      {
        "devices": "3",
        "plans": [
          {
            "name": "1 Maand",
            "price": "€35",
            "description": "Ideaal om de service uit te proberen.",
            "features": [
              "20.000+ Kanalen",
              "3 Apparaten Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "3 Maanden",
            "price": "€60",
            "description": "Populaire keuze voor seizoenskijkers.",
            "badge": "BESPAAR 20%",
            "features": [
              "20.000+ Kanalen",
              "3 Apparaten Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "6 Maanden",
            "price": "€90",
            "description": "Veel waar voor je geld voor een half jaar.",
            "badge": "BESPAAR 30%",
            "features": [
              "20.000+ Kanalen",
              "3 Apparaten Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "cta": "Starten"
          },
          {
            "name": "12 Maanden",
            "price": "€140",
            "description": "Maximale besparing voor een heel jaar.",
            "features": [
              "20.000+ Kanalen",
              "3 Apparaten Tegelijk",
              "100% Geen Buffering/Bevriezing",
              "+150.000 Films & Series",
              "Directe Activatie",
              "Alle 24/7 Kanalen",
              "8K/4K/FHD/HD-kwaliteit",
              "Alle PPV en Premium Kanalen",
              "TV-gids (EPG)",
              "99,9% Performance",
              "Terugkijken (Catch-up)",
              "24/7 Klantenservice"
            ],
            "popular": true,
            "badge": "BESTE DEAL",
            "cta": "Starten"
          }
        ]
      }
    ]
  },
  "faqs": {
    "title": "Veelgestelde Vragen",
    "subtitle": "Heb je vragen? Wij hebben antwoorden. Kun je iets niet vinden, vraag het gerust.",
    "staticQuestions": [
      {
        "question": "Wat is IPTV?",
        "answer": "IPTV staat voor Internet Protocol Television. Het is een dienst die tv-content via het internet levert, in plaats van via satelliet of kabel."
      },
      {
        "question": "Welke apparaten worden ondersteund?",
        "answer": "We ondersteunen o.a. Smart TV’s, Android-boxen, Amazon Fire Stick, MAG-apparaten, pc/mac en smartphones (iOS/Android)."
      },
      {
        "question": "Kan ik op meerdere apparaten tegelijk kijken?",
        "answer": "Ja, afhankelijk van je plan. Plannen hebben een vast aantal gelijktijdige verbindingen. Het Standaard-plan ondersteunt bijvoorbeeld 3 gelijktijdige verbindingen."
      },
      {
        "question": "Is er een gratis proefperiode?",
        "answer": "Soms bieden we een proef aan. Neem contact op met support voor de huidige beschikbaarheid."
      },
      {
        "question": "Aanbevolen internetsnelheid?",
        "answer": "Met minstens 30 Mbps downloadsnelheid werkt alles soepel op de hoogste kwaliteit. Twijfel je, vraag dan een test van 1 dag aan."
      },
      {
        "question": "Beschikbare betaalmethoden?",
        "answer": "PayPal en betaalpassen/creditcards (Visa, Mastercard, American Express en Discover)."
      },
      {
        "question": "Welke IPTV-apps raden jullie aan?",
        "answer": "Voor onze 8K IPTV-dienst heb je een IPTV-app nodig. Aanbevolen apps: ONZE 8K VIP-APP, OTT Navigator, Flix IPTV, IPTV Smarters Lite/Pro (Smarters Player Lite), TiviMate, Ibo Player. Let op nep-apps die inloggegevens stelen. Weet je niet welke app past bij jouw apparaat, stuur ons een bericht."
      },
      {
        "question": "Hoelang duurt het voordat ik mijn bestelling ontvang?",
        "answer": "We mailen binnen 10 minuten tot max. 1 uur na aankoop. In piekuren (’s avonds/weekend) kan het tot 1 uur duren."
      },
      {
        "question": "Welke soorten apparaten worden ondersteund?",
        "answer": "Onze service werkt op de meeste apparaten: Smart TV’s, Kodi, VLC, pc, Vu+, DreamBox, Firestick, Enigma, Android Boxen, Android-telefoons en meer."
      },
      {
        "question": "Wat krijg ik met een IPTV-abonnement?",
        "answer": "Meer dan 35.000 zenders, snelle laadtijden, stabiele verbinding, veel kanalen in Full HD en een grote bibliotheek met films en series on-demand."
      },
      {
        "question": "Wat is een IPTV-abonnement precies?",
        "answer": "Een voordelig alternatief voor kabeltelevisie dat content via internet levert en op veel moderne apparaten werkt."
      },
      {
        "question": "Kan ik mijn abonnement op meerdere apparaten gebruiken?",
        "answer": "Ja, je kunt meerdere apparaten gebruiken binnen het aantal gelijktijdige verbindingen van je plan."
      },
      {
        "question": "Welke apparaten kan ik voor IPTV gebruiken?",
        "answer": "Toegang via Smart TV’s (Samsung, Sony, LG…), Android-apparaten, Apple TV, iPhone, Google Chromecast, MAG (via STB-emulator) en FireStick."
      },
      {
        "question": "Wat bieden jullie?",
        "answer": "TV-abonnement via internet voor Smart TV Samsung & LG, pc, Mac, iPhone, iPad, Apple TV 4 & 5, Firestick, IPTV-box, Android-telefoons, tablets, Android Box, MAG en STB Emulator, met toegang tot 35.000 zenders en 150.000+ 8K/4K/Ultra HD films en series."
      }
    ],
    "dynamicQuestion": {
      "title": "Nog een vraag?",
      "placeholder": "Typ je vraag hier...",
      "button": "Vraag de AI-assistent",
      "loading": "Antwoord genereren...",
      "yourQuestion": "Jouw vraag:",
      "aiAnswer": "Antwoord van de AI-assistent:"
    }
  },
  "footer": {
    "company": "StreamHub Leads",
    "rights": "Alle rechten voorbehouden.",
    "legal": {
      "title": "Juridisch",
      "terms": "Servicevoorwaarden",
      "privacy": "Privacybeleid",
      "refund": "Terugbetalingsbeleid"
    },
    "social": {
      "title": "Sociaal"
    }
  },
  "contact": {
    "title": "Neem contact op",
    "subtitle": "Wij staan voor je klaar. Stuur een bericht en we reageren zo snel mogelijk.",
    "form": {
      "name": {
        "label": "Naam",
        "placeholder": "Je naam"
      },
      "email": {
        "label": "E-mail",
        "placeholder": "jij@voorbeeld.com"
      },
      "message": {
        "label": "Bericht",
        "placeholder": "Je bericht..."
      },
      "submit": "Bericht verzenden",
      "success": "Bedankt voor je bericht! We nemen snel contact met je op."
    },
    "altContact": {
      "title": "Of neem direct contact op:",
      "telegram": {
        "label": "Telegram",
        "url": "https://t.me/your-telegram-username"
      },
      "whatsapp": {
        "label": "WhatsApp",
        "url": "https://wa.me/your-whatsapp-number"
      },
      "email": {
        "label": "E-mail",
        "address": "support@streamhubleads.com"
      }
    }
  },
  "checkout": {
    "title": "Afrekenen",
    "subtitle": "Je bent nog één stap verwijderd van de beste streamingervaring. Vul het formulier in om je abonnementsgegevens te ontvangen.",
    "form": {
      "name": {
        "label": "Naam",
        "placeholder": "Jan Jansen"
      },
      "email": {
        "label": "E-mailadres",
        "placeholder": "jij@voorbeeld.com"
      },
      "phone": {
        "label": "Telefoonnummer",
        "placeholder": "+31 6 12345678"
      },
      "submit": "Ontvang mijn abonnement"
    }
  },
  "thankYou": {
    "title": "Bedankt!",
    "message": "We hebben je aanvraag ontvangen. Je ontvangt binnenkort per e-mail je abonnementsgegevens en de volgende stappen.",
    "nextSteps": "Wat nu?",
    "links": {
      "tutorials": "Bekijk onze handleidingen",
      "contact": "Neem contact met ons op bij vragen"
    }
  },
  "reseller": {
    "title": "Reseller-prijzen",
    "subtitle": "Word reseller en start vandaag nog je eigen IPTV-bedrijf.",
    "mostPopular": "Meest populair",
    "plans": [
      {
        "name": "120 Credits",
        "description": "Reseller-paneel",
        "price": "€249.99",
        "creditInfo": [
          { "credits": "1 Credit", "duration": "Abonnement 1 maand" },
          { "credits": "3 Credits", "duration": "3 maanden" },
          { "credits": "6 Credits", "duration": "6 maanden" },
          { "credits": "12 Credits", "duration": "12 maanden" }
        ],
        "features": [
          "Credits verlopen nooit",
          "EPG in real-time (TV-gids)",
          "Catch-Up TV ondersteund",
          "Volledig geautomatiseerd via API",
          "Snelle 24/7 resellersupport"
        ],
        "popular": false
      },
      {
        "name": "240 Credits",
        "description": "Reseller-paneel",
        "price": "€489.99",
        "creditInfo": [
          { "credits": "1 Credit", "duration": "Abonnement 1 maand" },
          { "credits": "3 Credits", "duration": "3 maanden" },
          { "credits": "6 Credits", "duration": "6 maanden" },
          { "credits": "12 Credits", "duration": "12 maanden" }
        ],
        "features": [
          "Credits verlopen nooit",
          "EPG in real-time (TV-gids)",
          "Catch-Up TV ondersteund",
          "Volledig geautomatiseerd via API",
          "Snelle 24/7 resellersupport"
        ],
        "popular": false
      },
      {
        "name": "360 Credits",
        "description": "Reseller-paneel",
        "price": "€719.99",
        "creditInfo": [
          { "credits": "1 Credit", "duration": "Abonnement 1 maand" },
          { "credits": "3 Credits", "duration": "3 maanden" },
          { "credits": "6 Credits", "duration": "6 maanden" },
          { "credits": "12 Credits", "duration": "12 maanden" }
        ],
        "features": [
          "Credits verlopen nooit",
          "EPG in real-time (TV-gids)",
          "Catch-Up TV ondersteund",
          "Volledig geautomatiseerd via API",
          "Snelle 24/7 resellersupport"
        ],
        "popular": true
      },
      {
        "name": "480 Credits",
        "description": "Reseller-paneel",
        "price": "€899.99",
        "creditInfo": [
          { "credits": "1 Credit", "duration": "Abonnement 1 maand" },
          { "credits": "3 Credits", "duration": "3 maanden" },
          { "credits": "6 Credits", "duration": "6 maanden" },
          { "credits": "12 Credits", "duration": "12 maanden" }
        ],
        "features": [
          "Credits verlopen nooit",
          "EPG in real-time (TV-gids)",
          "Catch-Up TV ondersteund",
          "Volledig geautomatiseerd via API",
          "Snelle 24/7 resellersupport"
        ],
        "popular": false
      }
    ]
  },
  "tutorials": {
    "title": "Handleidingen",
    "subtitle": "Stapsgewijze gidsen om je IPTV-service op elk apparaat in te stellen."
  }
}

```

# src/dictionaries/pt.json

```json
{
  "site": {
    "name": "StreamHub Leads",
    "description": "O seu destino definitivo para streaming IPTV. Explore nossos planos e junte-se à revolução do streaming.",
    "ogImage": "/og-image.png"
  },
  "navigation": {
    "home": "Início",
    "pricing": "Preços",
    "faqs": "Perguntas Frequentes",
    "tutorials": "Tutoriais",
    "reseller": "Revendedor",
    "contact": "Contato",
    "checkout": "Finalizar Pedido"
  },
  "localeSwitcher": {
    "label": "Mudar idioma",
    "selected": "Selecionado: {locale}"
  },
  "homepage": {
    "hero": {
      "title": "Experimente o Futuro da Televisão",
      "subtitle": "Streaming de alta qualidade, milhares de canais e suporte incomparável. Tudo em um só lugar.",
      "cta": "Ver Planos e Preços"
    },
    "features": {
      "title": "Por que escolher o StreamHub?",
      "items": [
        {
          "icon": "Globe",
          "title": "Acesso Global",
          "description": "Assista ao seu conteúdo favorito de qualquer lugar do mundo. Tudo o que você precisa é de conexão com a internet."
        },
        {
          "icon": "MonitorUp",
          "title": "Qualidade 4K & HD",
          "description": "Aproveite imagem cristalina com nossa ampla biblioteca de canais 4K e HD."
        },
        {
          "icon": "Smartphone",
          "title": "Suporte Multi-dispositivo",
          "description": "Transmita na TV, computador, tablet ou smartphone. Suportamos todos os principais dispositivos."
        },
        {
          "icon": "Clock",
          "title": "Uptime de 99,9%",
          "description": "Nossa infraestrutura robusta garante uma experiência estável e confiável 24/7."
        }
      ]
    },
    "howItWorks": {
      "title": "Como funciona?",
      "subtitle": "Como o nosso melhor serviço de IPTV funciona.",
      "steps": [
        {
          "number": "01",
          "title": "Faça seu pedido",
          "description": "Faça seu pedido na tabela de preços escolhendo o período de assinatura preferido."
        },
        {
          "number": "02",
          "title": "Receba sua conta",
          "description": "O processo leva de 5 a 15 minutos. Verifique sua caixa de entrada e a pasta de spam. Para agilizar, fale conosco no WhatsApp."
        },
        {
          "number": "03",
          "title": "Aproveite o serviço IPTV!",
          "description": "Curta todos os canais, filmes e séries agora. Entretenimento sem fim com o nosso IPTV."
        }
      ]
    },
    "whyChooseUs": {
      "title": "Por que escolher nosso servidor",
      "items": [
        {
          "icon": "Radio",
          "title": "Milhares de Canais",
          "description": "Sua assinatura IPTV oferece canais internacionais do mundo todo, incluindo os principais canais globais."
        },
        {
          "icon": "Video",
          "title": "Vídeo sob Demanda",
          "description": "Assista temporadas completas das melhores séries, os filmes mais recentes, conteúdo infantil e muito mais com nossa biblioteca VOD."
        },
        {
          "icon": "Laptop",
          "title": "Assista em Qualquer Dispositivo",
          "description": "Funcionamos em Smart TVs, Android, Amazon Fire Stick, KODI, MAG e qualquer dispositivo que suporte M3U ou portais."
        },
        {
          "icon": "Users",
          "title": "Suporte de Classe Mundial",
          "description": "Tutoriais detalhados e suporte ao cliente para instalação e streaming rápidos e simples, em qualquer lugar."
        },
        {
          "icon": "ShieldCheck",
          "title": "Pagamento Seguro",
          "description": "Pagamentos protegidos—sem processos de cobrança complicados."
        },
        {
          "icon": "CircleDollarSign",
          "title": "Garantia de 7 Dias",
          "description": "Se nosso serviço não for para você, concedemos reembolso total."
        }
      ]
    },
    "testimonials": {
      "title": "O que dizem nossos clientes",
      "items": [
        {
          "name": "Alex Johnson",
          "role": "Cinéfilo",
          "quote": "A seleção de canais é incrível e a qualidade 4K é impressionante. Nunca tive uma experiência de streaming melhor."
        },
        {
          "name": "Maria Garcia",
          "role": "Fã de Esportes",
          "quote": "Consigo ver todos os jogos, de qualquer liga, ao vivo. O serviço é confiável e o suporte é super prestativo."
        },
        {
          "name": "David Smith",
          "role": "Pai de Família",
          "quote": "Tem conteúdo para todo mundo. As crianças adoram os desenhos e nós os canais de filmes. Recomendo!"
        }
      ]
    },
    "cta": {
      "title": "Pronto para começar?",
      "subtitle": "Escolha um plano que atenda às suas necessidades e comece a assistir hoje. Ativação instantânea, sem taxas ocultas.",
      "button": "Ver Preços"
    },
    "favoriteDevices": {
      "title": "Nosso IPTV funciona em todos os seus dispositivos favoritos",
      "items": [
        {
          "title": "Smart TV, Smartphone, Tablets, Android e TV BOX",
          "description": "Use nossos serviços em Smartphones, Smart TVs, Android Box e em qualquer dispositivo compatível com IPTV (Android, iOS, Windows...)."
        },
        {
          "title": "Dispositivos MAG e Simuladores MAG",
          "description": "Envie o endereço MAC do seu dispositivo MAG ou simulador (como STB). Enviaremos o portal MAG e você terá acesso à maior playlist!"
        },
        {
          "title": "Laptop e Computadores",
          "description": "Nosso serviço é flexível e funciona na maioria dos dispositivos digitais. Instale um player IPTV no seu computador e aproveite."
        }
      ]
    },
    "flawlessStreaming": {
      "title": "Streaming IPTV impecável, sem travamentos",
      "description1": "Com nossa ampla coleção de canais, você não perde seus jogos e programas favoritos. Seja o primeiro a ver o novo episódio da sua série preferida.",
      "description2": "Nossos canais e VOD atendem a todos os gostos: esportes, notícias, desenhos, filmes, séries, adulto—tudo em uma única conta!",
      "features": [
        {
          "title": "QUALIDADE 4K/HD/FHD COMPLETA",
          "description": "A maioria dos canais está em HD e alguns em 4K."
        },
        {
          "title": "Zapping Rápido",
          "description": "Tempo de troca de canal incrível—cerca de 0,5 segundos!"
        },
        {
          "title": "Atualizações Diárias",
          "description": "Lista de canais e biblioteca VOD atualizadas todos os dias."
        },
        {
          "title": "Entrega Rápida do Pedido",
          "description": "Enviamos sua assinatura premium imediatamente após o pagamento."
        }
      ]
    }
  },
  "pricing": {
    "title": "Encontre o Plano Perfeito",
    "subtitle": "Preços simples e transparentes. Escolha seu plano e comece a assistir em minutos.",
    "deviceLabel": "Dispositivo",
    "devicesLabel": "Dispositivos",
    "orderNow": "Fazer Pedido",
    "plans": [
      {
        "devices": "1",
        "plans": [
          {
            "name": "1 Mês",
            "price": "€15",
            "description": "Ideal para experimentar o serviço.",
            "features": [
              "20.000+ Canais",
              "1 Dispositivo ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "3 Meses",
            "price": "€30",
            "description": "Escolha popular para períodos sazonais.",
            "badge": "ECONOMIZE 20%",
            "features": [
              "20.000+ Canais",
              "1 Dispositivo ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "6 Meses",
            "price": "€50",
            "description": "Ótimo custo-benefício por meio ano.",
            "badge": "ECONOMIZE 30%",
            "features": [
              "20.000+ Canais",
              "1 Dispositivo ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "12 Meses",
            "price": "€80",
            "description": "Máxima economia por um ano inteiro.",
            "features": [
              "20.000+ Canais",
              "1 Dispositivo ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "popular": true,
            "badge": "MELHOR OFERTA",
            "cta": "Começar"
          }
        ]
      },
      {
        "devices": "2",
        "plans": [
          {
            "name": "1 Mês",
            "price": "€25",
            "description": "Ideal para experimentar o serviço.",
            "features": [
              "20.000+ Canais",
              "2 Dispositivos ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "3 Meses",
            "price": "€45",
            "description": "Escolha popular para períodos sazonais.",
            "badge": "ECONOMIZE 20%",
            "features": [
              "20.000+ Canais",
              "2 Dispositivos ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "6 Meses",
            "price": "€70",
            "description": "Ótimo custo-benefício por meio ano.",
            "badge": "ECONOMIZE 30%",
            "features": [
              "20.000+ Canais",
              "2 Dispositivos ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "12 Meses",
            "price": "€110",
            "description": "Máxima economia por um ano inteiro.",
            "features": [
              "20.000+ Canais",
              "2 Dispositivos ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "popular": true,
            "badge": "MELHOR OFERTA",
            "cta": "Começar"
          }
        ]
      },
      {
        "devices": "3",
        "plans": [
          {
            "name": "1 Mês",
            "price": "€35",
            "description": "Ideal para experimentar o serviço.",
            "features": [
              "20.000+ Canais",
              "3 Dispositivos ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "3 Meses",
            "price": "€60",
            "description": "Escolha popular para períodos sazonais.",
            "badge": "ECONOMIZE 20%",
            "features": [
              "20.000+ Canais",
              "3 Dispositivos ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "6 Meses",
            "price": "€90",
            "description": "Ótimo custo-benefício por meio ano.",
            "badge": "ECONOMIZE 30%",
            "features": [
              "20.000+ Canais",
              "3 Dispositivos ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "cta": "Começar"
          },
          {
            "name": "12 Meses",
            "price": "€140",
            "description": "Máxima economia por um ano inteiro.",
            "features": [
              "20.000+ Canais",
              "3 Dispositivos ao Mesmo Tempo",
              "100% Sem Travamentos",
              "+150.000 Filmes e Séries",
              "Ativação Instantânea",
              "Canais 24/7",
              "Qualidade 8K/4K/FHD/HD",
              "Todos os Canais Premium e PPV",
              "Guia de Programação (EPG)",
              "Desempenho 99,9%",
              "Catch-up",
              "Suporte 24/7"
            ],
            "popular": true,
            "badge": "MELHOR OFERTA",
            "cta": "Começar"
          }
        ]
      }
    ]
  },
  "faqs": {
    "title": "Perguntas Frequentes",
    "subtitle": "Tem dúvidas? Nós respondemos. Se não encontrar o que procura, fique à vontade para perguntar.",
    "staticQuestions": [
      {
        "question": "O que é IPTV?",
        "answer": "IPTV significa Televisão por Protocolo de Internet. É um serviço que entrega conteúdo de TV pela internet, em vez de satélite ou cabo tradicionais."
      },
      {
        "question": "Quais dispositivos são compatíveis?",
        "answer": "Suportamos uma ampla variedade: Smart TVs, boxes Android, Amazon Fire Stick, dispositivos MAG, PC/Mac e smartphones (iOS/Android)."
      },
      {
        "question": "Posso assistir em vários dispositivos ao mesmo tempo?",
        "answer": "Sim, depende do seu plano. Cada plano tem um número de conexões simultâneas. Por exemplo, o plano Padrão permite 3 conexões."
      },
      {
        "question": "Há teste grátis?",
        "answer": "Ocasionalmente oferecemos períodos de teste. Fale com o suporte para saber a disponibilidade atual."
      },
      {
        "question": "Velocidade de internet recomendada?",
        "answer": "Se sua velocidade de download for de pelo menos 30 Mbps, tudo funcionará suavemente na qualidade mais alta. Se tiver dúvidas, peça um teste de 1 dia."
      },
      {
        "question": "Formas de pagamento disponíveis?",
        "answer": "PayPal e cartões de débito/crédito (Visa, Mastercard, American Express e Discover)."
      },
      {
        "question": "Quais apps de player IPTV vocês recomendam?",
        "answer": "Para usar nosso serviço 8K IPTV, você precisará de um aplicativo IPTV. Recomendamos: NOSSO APP 8K VIP, OTT Navigator, Flix IPTV, IPTV Smarters Lite/Pro (Smarters Player Lite), TiviMate, Ibo Player. Cuidado com apps falsos que roubam credenciais. Se não souber qual app seu dispositivo suporta, fale conosco."
      },
      {
        "question": "Quanto tempo para receber meu pedido?",
        "answer": "Enviamos e-mail em 10 minutos a no máximo 1 hora após a compra. Em horários de pico (noites/fins de semana), pode levar até 1 hora."
      },
      {
        "question": "Quais tipos de dispositivos são suportados?",
        "answer": "Funciona na maioria dos dispositivos: Smart TVs, Kodi, VLC, PC, Vu+, DreamBox, Firestick, Enigma, Android Boxes, Android Smartphones e muito mais."
      },
      {
        "question": "O que recebo com uma assinatura IPTV?",
        "answer": "Você nunca mais precisa lidar com a TV a cabo. Oferecemos mais de 35.000 canais, carregamento rápido, conexão estável e muitos canais em Full HD, além de grande biblioteca de filmes e séries sob demanda."
      },
      {
        "question": "O que é uma assinatura IPTV?",
        "answer": "É uma alternativa econômica à TV a cabo, entregando os conteúdos que as pessoas realmente querem via internet, acessíveis por dispositivos como Android TV Box e muito mais."
      },
      {
        "question": "Posso usar minha assinatura em vários dispositivos?",
        "answer": "Você pode usar a assinatura em vários dispositivos, respeitando o limite de conexões simultâneas do seu plano."
      },
      {
        "question": "Quais dispositivos podem ser usados para IPTV?",
        "answer": "Acesso via Smart TVs (Samsung, Sony, LG…), dispositivos Android, Apple TV, iPhone, Google Chromecast, MAG (via STB emulator) e FireStick."
      },
      {
        "question": "O que oferecemos?",
        "answer": "Assinatura de TV via internet para Smart TV Samsung & LG, PC, Mac, iPhone, iPad, Apple TV 4 & 5, Firestick, box IPTV, Android, tablets, Android Box, MAG e STB Emulator, com acesso a 35.000 canais e mais de 150.000 filmes e séries 8K/4K/Ultra HD."
      }
    ],
    "dynamicQuestion": {
      "title": "Ainda tem alguma pergunta?",
      "placeholder": "Digite sua pergunta aqui...",
      "button": "Perguntar ao Assistente IA",
      "loading": "Gerando resposta...",
      "yourQuestion": "Sua Pergunta:",
      "aiAnswer": "Resposta do Assistente IA:"
    }
  },
  "footer": {
    "company": "StreamHub Leads",
    "rights": "Todos os direitos reservados.",
    "legal": {
      "title": "Legal",
      "terms": "Termos de Serviço",
      "privacy": "Política de Privacidade",
      "refund": "Política de Reembolso"
    },
    "social": {
      "title": "Redes Sociais"
    }
  },
  "contact": {
    "title": "Fale Conosco",
    "subtitle": "Estamos aqui para ajudar. Envie uma mensagem e retornaremos o mais rápido possível.",
    "form": {
      "name": {
        "label": "Nome",
        "placeholder": "Seu nome"
      },
      "email": {
        "label": "E-mail",
        "placeholder": "voce@exemplo.com"
      },
      "message": {
        "label": "Mensagem",
        "placeholder": "Sua mensagem..."
      },
      "submit": "Enviar Mensagem",
      "success": "Obrigado pela sua mensagem! Em breve entraremos em contato."
    },
    "altContact": {
      "title": "Ou fale diretamente:",
      "telegram": {
        "label": "Telegram",
        "url": "https://t.me/your-telegram-username"
      },
      "whatsapp": {
        "label": "WhatsApp",
        "url": "https://wa.me/your-whatsapp-number"
      },
      "email": {
        "label": "E-mail",
        "address": "support@streamhubleads.com"
      }
    }
  },
  "checkout": {
    "title": "Finalizar Pedido",
    "subtitle": "Você está a um passo da melhor experiência de streaming. Preencha o formulário para receber os detalhes da assinatura.",
    "form": {
      "name": {
        "label": "Nome",
        "placeholder": "John Doe"
      },
      "email": {
        "label": "Endereço de E-mail",
        "placeholder": "voce@exemplo.com"
      },
      "phone": {
        "label": "Telefone",
        "placeholder": "+55 (11) 99999-9999"
      },
      "submit": "Receber Minha Assinatura"
    }
  },
  "thankYou": {
    "title": "Obrigado!",
    "message": "Recebemos sua solicitação. Em breve entraremos em contato por e-mail com os detalhes da assinatura e os próximos passos.",
    "nextSteps": "O que vem a seguir?",
    "links": {
      "tutorials": "Veja nossos tutoriais",
      "contact": "Fale conosco em caso de dúvidas"
    }
  },
  "reseller": {
    "title": "Preços para Revendedores",
    "subtitle": "Entre no nosso programa de revenda e comece seu próprio negócio de IPTV hoje.",
    "mostPopular": "Mais Popular",
    "plans": [
      {
        "name": "120 Créditos",
        "description": "Painel de Revenda",
        "price": "€249.99",
        "creditInfo": [
          { "credits": "1 Crédito", "duration": "Assinatura de 1 Mês" },
          { "credits": "3 Créditos", "duration": "3 Meses" },
          { "credits": "6 Créditos", "duration": "6 Meses" },
          { "credits": "12 Créditos", "duration": "12 Meses" }
        ],
        "features": [
          "Créditos Nunca Expiram",
          "EPG em Tempo Real (Guia de TV)",
          "Catch-Up TV Suportado",
          "Totalmente Automatizado via API",
          "Suporte Rápido 24/7 para Revendedores"
        ],
        "popular": false
      },
      {
        "name": "240 Créditos",
        "description": "Painel de Revenda",
        "price": "€489.99",
        "creditInfo": [
          { "credits": "1 Crédito", "duration": "Assinatura de 1 Mês" },
          { "credits": "3 Créditos", "duration": "3 Meses" },
          { "credits": "6 Crédititos", "duration": "6 Meses" },
          { "credits": "12 Créditos", "duration": "12 Meses" }
        ],
        "features": [
          "Créditos Nunca Expiram",
          "EPG em Tempo Real (Guia de TV)",
          "Catch-Up TV Suportado",
          "Totalmente Automatizado via API",
          "Suporte Rápido 24/7 para Revendedores"
        ],
        "popular": false
      },
      {
        "name": "360 Créditos",
        "description": "Painel de Revenda",
        "price": "€719.99",
        "creditInfo": [
          { "credits": "1 Crédito", "duration": "Assinatura de 1 Mês" },
          { "credits": "3 Créditos", "duration": "3 Meses" },
          { "credits": "6 Créditos", "duration": "6 Meses" },
          { "credits": "12 Créditos", "duration": "12 Meses" }
        ],
        "features": [
          "Créditos Nunca Expiram",
          "EPG em Tempo Real (Guia de TV)",
          "Catch-Up TV Suportado",
          "Totalmente Automatizado via API",
          "Suporte Rápido 24/7 para Revendedores"
        ],
        "popular": true
      },
      {
        "name": "480 Créditos",
        "description": "Painel de Revenda",
        "price": "€899.99",
        "creditInfo": [
          { "credits": "1 Crédito", "duration": "Assinatura de 1 Mês" },
          { "credits": "3 Créditos", "duration": "3 Meses" },
          { "credits": "6 Créditos", "duration": "6 Meses" },
          { "credits": "12 Créditos", "duration": "12 Meses" }
        ],
        "features": [
          "Créditos Nunca Expiram",
          "EPG em Tempo Real (Guia de TV)",
          "Catch-Up TV Suportado",
          "Totalmente Automatizado via API",
          "Suporte Rápido 24/7 para Revendedores"
        ],
        "popular": false
      }
    ]
  },
  "tutorials": {
    "title": "Tutoriais",
    "subtitle": "Guias passo a passo para ajudar você a configurar o serviço IPTV em qualquer dispositivo."
  }
}

```

# src/hooks/use-mobile.tsx

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

# src/hooks/use-toast.ts

```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

# src/lib/countries.ts

```ts
export const countries = [
  { "value": "US", "label": "United States" },
  { "value": "CA", "label": "Canada" },
  { "value": "GB", "label": "United Kingdom" },
  { "value": "AU", "label": "Australia" },
  { "value": "DE", "label": "Germany" },
  { "value": "FR", "label": "France" },
  { "value": "JP", "label": "Japan" },
  { "value": "NL", "label": "Netherlands" },
  { "value": "PT", "label": "Portugal" },
  { "value": "ES", "label": "Spain" },
  { "value": "AF", "label": "Afghanistan" },
  { "value": "AX", "label": "Åland Islands" },
  { "value": "AL", "label": "Albania" },
  { "value": "DZ", "label": "Algeria" },
  { "value": "AS", "label": "American Samoa" },
  { "value": "AD", "label": "Andorra" },
  { "value": "AO", "label": "Angola" },
  { "value": "AI", "label": "Anguilla" },
  { "value": "AQ", "label": "Antarctica" },
  { "value": "AG", "label": "Antigua and Barbuda" },
  { "value": "AR", "label": "Argentina" },
  { "value": "AM", "label": "Armenia" },
  { "value": "AW", "label": "Aruba" },
  { "value": "AT", "label": "Austria" },
  { "value": "AZ", "label": "Azerbaijan" },
  { "value": "BS", "label": "Bahamas" },
  { "value": "BH", "label": "Bahrain" },
  { "value": "BD", "label": "Bangladesh" },
  { "value": "BB", "label": "Barbados" },
  { "value": "BY", "label": "Belarus" },
  { "value": "BE", "label": "Belgium" },
  { "value": "BZ", "label": "Belize" },
  { "value": "BJ", "label": "Benin" },
  { "value": "BM", "label": "Bermuda" },
  { "value": "BT", "label": "Bhutan" },
  { "value": "BO", "label": "Bolivia" },
  { "value": "BA", "label": "Bosnia and Herzegovina" },
  { "value": "BW", "label": "Botswana" },
  { "value": "BR", "label": "Brazil" },
  { "value": "IO", "label": "British Indian Ocean Territory" },
  { "value": "BG", "label": "Bulgaria" },
  { "value": "BF", "label": "Burkina Faso" },
  { "value": "BI", "label": "Burundi" },
  { "value": "KH", "label": "Cambodia" },
  { "value": "CM", "label": "Cameroon" },
  { "value": "CV", "label": "Cape Verde" },
  { "value": "KY", "label": "Cayman Islands" },
  { "value": "CF", "label": "Central African Republic" },
  { "value": "TD", "label": "Chad" },
  { "value": "CL", "label": "Chile" },
  { "value": "CN", "label": "China" },
  { "value": "CX", "label": "Christmas Island" },
  { "value": "CC", "label": "Cocos (Keeling) Islands" },
  { "value": "CO", "label": "Colombia" },
  { "value": "KM", "label": "Comoros" },
  { "value": "CG", "label": "Congo" },
  { "value": "CD", "label": "Congo, Democratic Republic" },
  { "value": "CK", "label": "Cook Islands" },
  { "value": "CR", "label": "Costa Rica" },
  { "value": "CI", "label": "Cote D'Ivoire" },
  { "value": "HR", "label": "Croatia" },
  { "value": "CU", "label": "Cuba" },
  { "value": "CY", "label": "Cyprus" },
  { "value": "CZ", "label": "Czech Republic" },
  { "value": "DK", "label": "Denmark" },
  { "value": "DJ", "label": "Djibouti" },
  { "value": "DM", "label": "Dominica" },
  { "value": "DO", "label": "Dominican Republic" },
  { "value": "EC", "label": "Ecuador" },
  { "value": "EG", "label": "Egypt" },
  { "value": "SV", "label": "El Salvador" },
  { "value": "GQ", "label": "Equatorial Guinea" },
  { "value": "ER", "label": "Eritrea" },
  { "value": "EE", "label": "Estonia" },
  { "value": "ET", "label": "Ethiopia" },
  { "value": "FK", "label": "Falkland Islands (Malvinas)" },
  { "value": "FO", "label": "Faroe Islands" },
  { "value": "FJ", "label": "Fiji" },
  { "value": "FI", "label": "Finland" },
  { "value": "GF", "label": "French Guiana" },
  { "value": "PF", "label": "French Polynesia" },
  { "value": "GA", "label": "Gabon" },
  { "value": "GM", "label": "Gambia" },
  { "value": "GE", "label": "Georgia" },
  { "value": "GH", "label": "Ghana" },
  { "value": "GI", "label": "Gibraltar" },
  { "value": "GR", "label": "Greece" },
  { "value": "GL", "label": "Greenland" },
  { "value": "GD", "label": "Grenada" },
  { "value": "GP", "label": "Guadeloupe" },
  { "value": "GU", "label": "Guam" },
  { "value": "GT", "label": "Guatemala" },
  { "value": "GG", "label": "Guernsey" },
  { "value": "GN", "label": "Guinea" },
  { "value": "GW", "label": "Guinea-Bissau" },
  { "value": "GY", "label": "Guyana" },
  { "value": "HT", "label": "Haiti" },
  { "value": "VA", "label": "Holy See (Vatican City State)" },
  { "value": "HN", "label": "Honduras" },
  { "value": "HK", "label": "Hong Kong" },
  { "value": "HU", "label": "Hungary" },
  { "value": "IS", "label": "Iceland" },
  { "value": "IN", "label": "India" },
  { "value": "ID", "label": "Indonesia" },
  { "value": "IR", "label": "Iran, Islamic Republic Of" },
  { "value": "IQ", "label": "Iraq" },
  { "value": "IE", "label": "Ireland" },
  { "value": "IM", "label": "Isle of Man" },
  { "value": "IL", "label": "Israel" },
  { "value": "IT", "label": "Italy" },
  { "value": "JM", "label": "Jamaica" },
  { "value": "JE", "label": "Jersey" },
  { "value": "JO", "label": "Jordan" },
  { "value": "KZ", "label": "Kazakhstan" },
  { "value": "KE", "label": "Kenya" },
  { "value": "KI", "label": "Kiribati" },
  { "value": "KR", "label": "Korea, Republic of" },
  { "value": "KW", "label": "Kuwait" },
  { "value": "KG", "label": "Kyrgyzstan" },
  { "value": "LA", "label": "Lao People's Democratic Republic" },
  { "value": "LV", "label": "Latvia" },
  { "value": "LB", "label": "Lebanon" },
  { "value": "LS", "label": "Lesotho" },
  { "value": "LR", "label": "Liberia" },
  { "value": "LY", "label": "Libyan Arab Jamahiriya" },
  { "value": "LI", "label": "Liechtenstein" },
  { "value": "LT", "label": "Lithuania" },
  { "value": "LU", "label": "Luxembourg" },
  { "value": "MO", "label": "Macao" },
  { "value": "MK", "label": "Macedonia" },
  { "value": "MG", "label": "Madagascar" },
  { "value": "MW", "label": "Malawi" },
  { "value": "MY", "label": "Malaysia" },
  { "value": "MV", "label": "Maldives" },
  { "value": "ML", "label": "Mali" },
  { "value": "MT", "label": "Malta" },
  { "value": "MH", "label": "Marshall Islands" },
  { "value": "MQ", "label": "Martinique" },
  { "value": "MR", "label": "Mauritania" },
  { "value": "MU", "label": "Mauritius" },
  { "value": "YT", "label": "Mayotte" },
  { "value": "MX", "label": "Mexico" },
  { "value": "FM", "label": "Micronesia" },
  { "value": "MD", "label": "Moldova" },
  { "value": "MC", "label": "Monaco" },
  { "value": "MN", "label": "Mongolia" },
  { "value": "MS", "label": "Montserrat" },
  { "value": "MA", "label": "Morocco" },
  { "value": "MZ", "label": "Mozambique" },
  { "value": "MM", "label": "Myanmar" },
  { "value": "NA", "label": "Namibia" },
  { "value": "NR", "label": "Nauru" },
  { "value": "NP", "label": "Nepal" },
  { "value": "NC", "label": "New Caledonia" },
  { "value": "NZ", "label": "New Zealand" },
  { "value": "NI", "label": "Nicaragua" },
  { "value": "NE", "label": "Niger" },
  { "value": "NG", "label": "Nigeria" },
  { "value": "NU", "label": "Niue" },
  { "value": "NF", "label": "Norfolk Island" },
  { "value": "MP", "label": "Northern Mariana Islands" },
  { "value": "NO", "label": "Norway" },
  { "value": "OM", "label": "Oman" },
  { "value": "PK", "label": "Pakistan" },
  { "value": "PW", "label": "Palau" },
  { "value": "PS", "label": "Palestinian Territory, Occupied" },
  { "value": "PA", "label": "Panama" },
  { "value": "PG", "label": "Papua New Guinea" },
  { "value": "PY", "label": "Paraguay" },
  { "value": "PE", "label": "Peru" },
  { "value": "PH", "label": "Philippines" },
  { "value": "PN", "label": "Pitcairn" },
  { "value": "PL", "label": "Poland" },
  { "value": "RO", "label": "Romania" },
  { "value": "RU", "label": "Russian Federation" },
  { "value": "RW", "label": "Rwanda" },
  { "value": "SH", "label": "Saint Helena" },
  { "value": "KN", "label": "Saint Kitts and Nevis" },
  { "value": "LC", "label": "Saint Lucia" },
  { "value": "PM", "label": "Saint Pierre and Miquelon" },
  { "value": "VC", "label": "Saint Vincent and the Grenadines" },
  { "value": "WS", "label": "Samoa" },
  { "value": "SM", "label": "San Marino" },
  { "value": "ST", "label": "Sao Tome and Principe" },
  { "value": "SA", "label": "Saudi Arabia" },
  { "value": "SN", "label": "Senegal" },
  { "value": "CS", "label": "Serbia and Montenegro" },
  { "value": "SC", "label": "Seychelles" },
  { "value": "SL", "label": "Sierra Leone" },
  { "value": "SG", "label": "Singapore" },
  { "value": "SK", "label": "Slovakia" },
  { "value": "SI", "label": "Slovenia" },
  { "value": "SB", "label": "Solomon Islands" },
  { "value": "SO", "label": "Somalia" },
  { "value": "ZA", "label": "South Africa" },
  { "value": "LK", "label": "Sri Lanka" },
  { "value": "SD", "label": "Sudan" },
  { "value": "SR", "label": "Suriname" },
  { "value": "SJ", "label": "Svalbard and Jan Mayen" },
  { "value": "SZ", "label": "Swaziland" },
  { "value": "SE", "label": "Sweden" },
  { "value": "CH", "label": "Switzerland" },
  { "value": "SY", "label": "Syrian Arab Republic" },
  { "value": "TW", "label": "Taiwan" },
  { "value": "TJ", "label": "Tajikistan" },
  { "value": "TZ", "label": "Tanzania" },
  { "value": "TH", "label": "Thailand" },
  { "value": "TL", "label": "Timor-Leste" },
  { "value": "TG", "label": "Togo" },
  { "value": "TK", "label": "Tokelau" },
  { "value": "TO", "label": "Tonga" },
  { "value": "TT", "label": "Trinidad and Tobago" },
  { "value": "TN", "label": "Tunisia" },
  { "value": "TR", "label": "Turkey" },
  { "value": "TM", "label": "Turkmenistan" },
  { "value": "TC", "label": "Turks and Caicos Islands" },
  { "value": "TV", "label": "Tuvalu" },
  { "value": "UG", "label": "Uganda" },
  { "value": "UA", "label": "Ukraine" },
  { "value": "AE", "label": "United Arab Emirates" },
  { "value": "UY", "label": "Uruguay" },
  { "value": "UZ", "label": "Uzbekistan" },
  { "value": "VU", "label": "Vanuatu" },
  { "value": "VE", "label": "Venezuela" },
  { "value": "VN", "label": "Viet Nam" },
  { "value": "VG", "label": "Virgin Islands, British" },
  { "value": "VI", "label": "Virgin Islands, U.S." },
  { "value": "WF", "label": "Wallis and Futuna" },
  { "value": "EH", "label": "Western Sahara" },
  { "value": "YE", "label": "Yemen" },
  { "value": "ZM", "label": "Zambia" },
  { "value": "ZW", "label": "Zimbabwe" }
];

```

# src/lib/country-codes.ts

```ts
export type Country = {
    name: string;
    dial_code: string;
    code: string; // ISO 3166-1 alpha-2
  };
  
  export const countries: Country[] = [
    { name: 'United States', dial_code: '+1', code: 'US' },
    { name: 'Canada', dial_code: '+1', code: 'CA' },
    { name: 'United Kingdom', dial_code: '+44', code: 'GB' },
    { name: 'Afghanistan', dial_code: '+93', code: 'AF' },
    { name: 'Albania', dial_code: '+355', code: 'AL' },
    { name: 'Algeria', dial_code: '+213', code: 'DZ' },
    { name: 'American Samoa', dial_code: '+1684', code: 'AS' },
    { name: 'Andorra', dial_code: '+376', code: 'AD' },
    { name: 'Angola', dial_code: '+244', code: 'AO' },
    { name: 'Anguilla', dial_code: '+1264', code: 'AI' },
    { name: 'Antigua and Barbuda', dial_code: '+1268', code: 'AG' },
    { name: 'Argentina', dial_code: '+54', code: 'AR' },
    { name: 'Armenia', dial_code: '+374', code: 'AM' },
    { name: 'Aruba', dial_code: '+297', code: 'AW' },
    { name: 'Australia', dial_code: '+61', code: 'AU' },
    { name: 'Austria', dial_code: '+43', code: 'AT' },
    { name: 'Azerbaijan', dial_code: '+994', code: 'AZ' },
    { name: 'Bahamas', dial_code: '+1242', code: 'BS' },
    { name: 'Bahrain', dial_code: '+973', code: 'BH' },
    { name: 'Bangladesh', dial_code: '+880', code: 'BD' },
    { name: 'Barbados', dial_code: '+1246', code: 'BB' },
    { name: 'Belarus', dial_code: '+375', code: 'BY' },
    { name: 'Belgium', dial_code: '+32', code: 'BE' },
    { name: 'Belize', dial_code: '+501', code: 'BZ' },
    { name: 'Benin', dial_code: '+229', code: 'BJ' },
    { name: 'Bermuda', dial_code: '+1441', code: 'BM' },
    { name: 'Bhutan', dial_code: '+975', code: 'BT' },
    { name: 'Bolivia', dial_code: '+591', code: 'BO' },
    { name: 'Bosnia and Herzegovina', dial_code: '+387', code: 'BA' },
    { name: 'Botswana', dial_code: '+267', code: 'BW' },
    { name: 'Brazil', dial_code: '+55', code: 'BR' },
    { name: 'British Indian Ocean Territory', dial_code: '+246', code: 'IO' },
    { name: 'Brunei Darussalam', dial_code: '+673', code: 'BN' },
    { name: 'Bulgaria', dial_code: '+359', code: 'BG' },
    { name: 'Burkina Faso', dial_code: '+226', code: 'BF' },
    { name: 'Burundi', dial_code: '+257', code: 'BI' },
    { name: 'Cambodia', dial_code: '+855', code: 'KH' },
    { name: 'Cameroon', dial_code: '+237', code: 'CM' },
    { name: 'Cape Verde', dial_code: '+238', code: 'CV' },
    { name: 'Cayman Islands', dial_code: '+345', code: 'KY' },
    { name: 'Central African Republic', dial_code: '+236', code: 'CF' },
    { name: 'Chad', dial_code: '+235', code: 'TD' },
    { name: 'Chile', dial_code: '+56', code: 'CL' },
    { name: 'China', dial_code: '+86', code: 'CN' },
    { name: 'Christmas Island', dial_code: '+61', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', dial_code: '+61', code: 'CC' },
    { name: 'Colombia', dial_code: '+57', code: 'CO' },
    { name: 'Comoros', dial_code: '+269', code: 'KM' },
    { name: 'Congo', dial_code: '+242', code: 'CG' },
    { name: 'Cook Islands', dial_code: '+682', code: 'CK' },
    { name: 'Costa Rica', dial_code: '+506', code: 'CR' },
    { name: 'Croatia', dial_code: '+385', code: 'HR' },
    { name: 'Cuba', dial_code: '+53', code: 'CU' },
    { name: 'Cyprus', dial_code: '+537', code: 'CY' },
    { name: 'Czech Republic', dial_code: '+420', code: 'CZ' },
    { name: 'Denmark', dial_code: '+45', code: 'DK' },
    { name: 'Djibouti', dial_code: '+253', code: 'DJ' },
    { name: 'Dominica', dial_code: '+1767', code: 'DM' },
    { name: 'Dominican Republic', dial_code: '+1849', code: 'DO' },
    { name: 'Ecuador', dial_code: '+593', code: 'EC' },
    { name: 'Egypt', dial_code: '+20', code: 'EG' },
    { name: 'El Salvador', dial_code: '+503', code: 'SV' },
    { name: 'Equatorial Guinea', dial_code: '+240', code: 'GQ' },
    { name: 'Eritrea', dial_code: '+291', code: 'ER' },
    { name: 'Estonia', dial_code: '+372', code: 'EE' },
    { name: 'Ethiopia', dial_code: '+251', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', dial_code: '+500', code: 'FK' },
    { name: 'Faroe Islands', dial_code: '+298', code: 'FO' },
    { name: 'Fiji', dial_code: '+679', code: 'FJ' },
    { name: 'Finland', dial_code: '+358', code: 'FI' },
    { name: 'France', dial_code: '+33', code: 'FR' },
    { name: 'French Guiana', dial_code: '+594', code: 'GF' },
    { name: 'French Polynesia', dial_code: '+689', code: 'PF' },
    { name: 'Gabon', dial_code: '+241', code: 'GA' },
    { name: 'Gambia', dial_code: '+220', code: 'GM' },
    { name: 'Georgia', dial_code: '+995', code: 'GE' },
    { name: 'Germany', dial_code: '+49', code: 'DE' },
    { name: 'Ghana', dial_code: '+233', code: 'GH' },
    { name: 'Gibraltar', dial_code: '+350', code: 'GI' },
    { name: 'Greece', dial_code: '+30', code: 'GR' },
    { name: 'Greenland', dial_code: '+299', code: 'GL' },
    { name: 'Grenada', dial_code: '+1473', code: 'GD' },
    { name: 'Guadeloupe', dial_code: '+590', code: 'GP' },
    { name: 'Guam', dial_code: '+1671', code: 'GU' },
    { name: 'Guatemala', dial_code: '+502', code: 'GT' },
    { name: 'Guinea', dial_code: '+224', code: 'GN' },
    { name: 'Guinea-Bissau', dial_code: '+245', code: 'GW' },
    { name: 'Guyana', dial_code: '+595', code: 'GY' },
    { name: 'Haiti', dial_code: '+509', code: 'HT' },
    { name: 'Honduras', dial_code: '+504', code: 'HN' },
    { name: 'Hong Kong', dial_code: '+852', code: 'HK' },
    { name: 'Hungary', dial_code: '+36', code: 'HU' },
    { name: 'Iceland', dial_code: '+354', code: 'IS' },
    { name: 'India', dial_code: '+91', code: 'IN' },
    { name: 'Indonesia', dial_code: '+62', code: 'ID' },
    { name: 'Iran', dial_code: '+98', code: 'IR' },
    { name: 'Iraq', dial_code: '+964', code: 'IQ' },
    { name: 'Ireland', dial_code: '+353', code: 'IE' },
    { name: 'Israel', dial_code: '+972', code: 'IL' },
    { name: 'Italy', dial_code: '+39', code: 'IT' },
    { name: 'Jamaica', dial_code: '+1876', code: 'JM' },
    { name: 'Japan', dial_code: '+81', code: 'JP' },
    { name: 'Jordan', dial_code: '+962', code: 'JO' },
    { name: 'Kazakhstan', dial_code: '+77', code: 'KZ' },
    { name: 'Kenya', dial_code: '+254', code: 'KE' },
    { name: 'Kiribati', dial_code: '+686', code: 'KI' },
    { name: 'Kuwait', dial_code: '+965', code: 'KW' },
    { name: 'Kyrgyzstan', dial_code: '+996', code: 'KG' },
    { name: 'Latvia', dial_code: '+371', code: 'LV' },
    { name: 'Lebanon', dial_code: '+961', code: 'LB' },
    { name: 'Lesotho', dial_code: '+266', code: 'LS' },
    { name: 'Liberia', dial_code: '+231', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', dial_code: '+218', code: 'LY' },
    { name: 'Liechtenstein', dial_code: '+423', code: 'LI' },
    { name: 'Lithuania', dial_code: '+370', code: 'LT' },
    { name: 'Luxembourg', dial_code: '+352', code: 'LU' },
    { name: 'Macao', dial_code: '+853', code: 'MO' },
    { name: 'Madagascar', dial_code: '+261', code: 'MG' },
    { name: 'Malawi', dial_code: '+265', code: 'MW' },
    { name: 'Malaysia', dial_code: '+60', code: 'MY' },
    { name: 'Maldives', dial_code: '+960', code: 'MV' },
    { name: 'Mali', dial_code: '+223', code: 'ML' },
    { name: 'Malta', dial_code: '+356', code: 'MT' },
    { name: 'Marshall Islands', dial_code: '+692', code: 'MH' },
    { name: 'Martinique', dial_code: '+596', code: 'MQ' },
    { name: 'Mauritania', dial_code: '+222', code: 'MR' },
    { name: 'Mauritius', dial_code: '+230', code: 'MU' },
    { name: 'Mayotte', dial_code: '+262', code: 'YT' },
    { name: 'Mexico', dial_code: '+52', code: 'MX' },
    { name: 'Micronesia', dial_code: '+691', code: 'FM' },
    { name: 'Moldova', dial_code: '+373', code: 'MD' },
    { name: 'Monaco', dial_code: '+377', code: 'MC' },
    { name: 'Mongolia', dial_code: '+976', code: 'MN' },
    { name: 'Montenegro', dial_code: '+382', code: 'ME' },
    { name: 'Montserrat', dial_code: '+1664', code: 'MS' },
    { name: 'Morocco', dial_code: '+212', code: 'MA' },
    { name: 'Mozambique', dial_code: '+258', code: 'MZ' },
    { name: 'Myanmar', dial_code: '+95', code: 'MM' },
    { name: 'Namibia', dial_code: '+264', code: 'NA' },
    { name: 'Nauru', dial_code: '+674', code: 'NR' },
    { name: 'Nepal', dial_code: '+977', code: 'NP' },
    { name: 'Netherlands', dial_code: '+31', code: 'NL' },
    { name: 'New Caledonia', dial_code: '+687', code: 'NC' },
    { name: 'New Zealand', dial_code: '+64', code: 'NZ' },
    { name: 'Nicaragua', dial_code: '+505', code: 'NI' },
    { name: 'Niger', dial_code: '+227', code: 'NE' },
    { name: 'Nigeria', dial_code: '+234', code: 'NG' },
    { name: 'Niue', dial_code: '+683', code: 'NU' },
    { name: 'Norfolk Island', dial_code: '+672', code: 'NF' },
    { name: 'North Macedonia', dial_code: '+389', code: 'MK' },
    { name: 'Northern Mariana Islands', dial_code: '+1670', code: 'MP' },
    { name: 'Norway', dial_code: '+47', code: 'NO' },
    { name: 'Oman', dial_code: '+968', code: 'OM' },
    { name: 'Pakistan', dial_code: '+92', code: 'PK' },
    { name: 'Palau', dial_code: '+680', code: 'PW' },
    { name: 'Panama', dial_code: '+507', code: 'PA' },
    { name: 'Papua New Guinea', dial_code: '+675', code: 'PG' },
    { name: 'Paraguay', dial_code: '+595', code: 'PY' },
    { name: 'Peru', dial_code: '+51', code: 'PE' },
    { name: 'Philippines', dial_code: '+63', code: 'PH' },
    { name: 'Poland', dial_code: '+48', code: 'PL' },
    { name: 'Portugal', dial_code: '+351', code: 'PT' },
    { name: 'Puerto Rico', dial_code: '+1939', code: 'PR' },
    { name: 'Qatar', dial_code: '+974', code: 'QA' },
    { name: 'Romania', dial_code: '+40', code: 'RO' },
    { name: 'Russia', dial_code: '+7', code: 'RU' },
    { name: 'Rwanda', dial_code: '+250', code: 'RW' },
    { name: 'Samoa', dial_code: '+685', code: 'WS' },
    { name: 'San Marino', dial_code: '+378', code: 'SM' },
    { name: 'Sao Tome and Principe', dial_code: '+239', code: 'ST' },
    { name: 'Saudi Arabia', dial_code: '+966', code: 'SA' },
    { name: 'Senegal', dial_code: '+221', code: 'SN' },
    { name: 'Serbia', dial_code: '+381', code: 'RS' },
    { name: 'Seychelles', dial_code: '+248', code: 'SC' },
    { name: 'Sierra Leone', dial_code: '+232', code: 'SL' },
    { name: 'Singapore', dial_code: '+65', code: 'SG' },
    { name: 'Slovakia', dial_code: '+421', code: 'SK' },
    { name: 'Slovenia', dial_code: '+386', code: 'SI' },
    { name: 'Solomon Islands', dial_code: '+677', code: 'SB' },
    { name: 'Somalia', dial_code: '+252', code: 'SO' },
    { name: 'South Africa', dial_code: '+27', code: 'ZA' },
    { name: 'South Georgia', dial_code: '+500', code: 'GS' },
    { name: 'Spain', dial_code: '+34', code: 'ES' },
    { name: 'Sri Lanka', dial_code: '+94', code: 'LK' },
    { name: 'Sudan', dial_code: '+249', code: 'SD' },
    { name: 'Suriname', dial_code: '+597', code: 'SR' },
    { name: 'Sweden', dial_code: '+46', code: 'SE' },
    { name: 'Switzerland', dial_code: '+41', code: 'CH' },
    { name: 'Syrian Arab Republic', dial_code: '+963', code: 'SY' },
    { name: 'Taiwan', dial_code: '+886', code: 'TW' },
    { name: 'Tajikistan', dial_code: '+992', code: 'TJ' },
    { name: 'Tanzania', dial_code: '+255', code: 'TZ' },
    { name: 'Thailand', dial_code: '+66', code: 'TH' },
    { name: 'Timor-Leste', dial_code: '+670', code: 'TL' },
    { name: 'Togo', dial_code: '+228', code: 'TG' },
    { name: 'Tokelau', dial_code: '+690', code: 'TK' },
    { name: 'Tonga', dial_code: '+676', code: 'TO' },
    { name: 'Trinidad and Tobago', dial_code: '+1868', code: 'TT' },
    { name: 'Tunisia', dial_code: '+216', code: 'TN' },
    { name: 'Turkey', dial_code: '+90', code: 'TR' },
    { name: 'Turkmenistan', dial_code: '+993', code: 'TM' },
    { name: 'Turks and Caicos Islands', dial_code: '+1649', code: 'TC' },
    { name: 'Tuvalu', dial_code: '+688', code: 'TV' },
    { name: 'Uganda', dial_code: '+256', code: 'UG' },
    { name: 'Ukraine', dial_code: '+380', code: 'UA' },
    { name: 'United Arab Emirates', dial_code: '+971', code: 'AE' },
    { name: 'Uruguay', dial_code: '+598', code: 'UY' },
    { name: 'Uzbekistan', dial_code: '+998', code: 'UZ' },
    { name: 'Vanuatu', dial_code: '+678', code: 'VU' },
    { name: 'Venezuela', dial_code: '+58', code: 'VE' },
    { name: 'Viet Nam', dial_code: '+84', code: 'VN' },
    { name: 'Virgin Islands, British', dial_code: '+1284', code: 'VG' },
    { name: 'Virgin Islands, U.S.', dial_code: '+1340', code: 'VI' },
    { name: 'Wallis and Futuna', dial_code: '+681', code: 'WF' },
    { name: 'Yemen', dial_code: '+967', code: 'YE' },
    { name: 'Zambia', dial_code: '+260', code: 'ZM' },
    { name: 'Zimbabwe', dial_code: '+263', code: 'ZW' },
  ];
```

# src/lib/devices.ts

```ts
export const deviceTypes = [
    { "value": "smart-tv-samsung", "label": "Smart TV (Samsung)" },
    { "value": "smart-tv-lg", "label": "Smart TV (LG)" },
    { "value": "smart-tv-other", "label": "Smart TV (Other)" },
    { "value": "amazon-fire-stick", "label": "Amazon Fire Stick" },
    { "value": "android-box", "label": "Android Box / TV" },
    { "value": "android-phone-tablet", "label": "Android Phone / Tablet" },
    { "value": "apple-tv", "label": "Apple TV" },
    { "value": "iphone-ipad", "label": "iPhone / iPad" },
    { "value": "mag-box", "label": "MAG Box" },
    { "value": "windows-pc", "label": "Windows PC" },
    { "value": "macbook-imac", "label": "Macbook / iMac" },
    { "value": "other", "label": "Other" },
];

```

# src/lib/dictionaries.ts

```ts
import 'server-only';
import type {Locale} from './i18n-config';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  de: () => import('@/dictionaries/de.json').then(module => module.default),
  es: () => import('@/dictionaries/es.json').then(module => module.default),
  fr: () => import('@/dictionaries/fr.json').then(module => module.default),
  nl: () => import('@/dictionaries/nl.json').then(module => module.default),
  pt: () => import('@/dictionaries/pt.json').then(module => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
};

```

# src/lib/form-state.ts

```ts
export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  type?: 'error' | 'success';
} | null;

```

# src/lib/i18n-config.ts

```ts
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'es', 'fr', 'nl', 'pt'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

```

# src/lib/placeholder-images.json

```json
{
  "placeholderImages": [
    {
      "id": "hero-home",
      "description": "Abstract streaming lights background for the hero section.",
      "imageUrl": "https://images.unsplash.com/photo-1548580076-4d4f83ca48c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHN0cmVhbXxlbnwwfHx8fDE3NTg2MjgwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "abstract stream"
    },
    {
      "id": "feature-global",
      "description": "Icon representing global network.",
      "imageUrl": "https://images.unsplash.com/photo-1584931423298-c576fda54bd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z2xvYmFsJTIwbmV0d29ya3xlbnwwfHx8fDE3NTg1OTczMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "global network"
    },
    {
      "id": "feature-hd",
      "description": "Icon representing high definition quality.",
      "imageUrl": "https://images.unsplash.com/photo-1708019033492-96a5b44e3423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxoaWdoJTIwZGVmaW5pdGlvbnxlbnwwfHx8fDE3NTg2MjgwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "high definition"
    },
    {
      "id": "feature-devices",
      "description": "Icon representing multi-device support.",
      "imageUrl": "https://images.unsplash.com/photo-1713164394509-79e8c579c860?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtdWx0aXBsZSUyMGRldmljZXN8ZW58MHx8fHwxNzU4NjI4MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "multiple devices"
    },
    {
      "id": "avatar-1",
      "description": "User avatar for testimonials.",
      "imageUrl": "https://images.unsplash.com/photo-1710974481447-fb001ad9ad5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc1ODU4NDcwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "person face"
    },
    {
      "id": "avatar-2",
      "description": "User avatar for testimonials.",
      "imageUrl": "https://images.unsplash.com/photo-1599566147214-ce487862ea4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc1ODU4NDcwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "person face"
    },
    {
      "id": "avatar-3",
      "description": "User avatar for testimonials.",
      "imageUrl": "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cGVyc29uJTIwZmFjZXxlbnwwfHx8fDE3NTg1ODQ3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "person face"
    },
    {
      "id": "story-1",
      "description": "Customer feedback story 1",
      "imageUrl": "/images/wp1.webp",
      "imageHint": "feedback chat"
    },
    {
      "id": "story-2",
      "description": "Customer feedback story 2",
      "imageUrl": "/images/wp2.webp",
      "imageHint": "feedback chat"
    },
    {
      "id": "story-3",
      "description": "Customer feedback story 3",
      "imageUrl": "/images/wp3.webp",
      "imageHint": "feedback chat"
    },
    {
      "id": "story-4",
      "description": "Customer feedback story 4",
      "imageUrl": "/images/wp4.webp",
      "imageHint": "feedback chat"
    },
    {
      "id": "story-5",
      "description": "Customer feedback story 5",
      "imageUrl": "/images/wp5.webp",
      "imageHint": "feedback chat"
    },
    {
      "id": "favorite-devices",
      "description": "Illustration of a person using multiple devices for streaming.",
      "imageUrl": "https://images.unsplash.com/photo-1758272423042-fb02e32195f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzdHJlYW1pbmclMjBkZXZpY2VzfGVufDB8fHx8MTc1ODY1MDQ5OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "streaming devices"
    },
    {
      "id": "flawless-streaming",
      "description": "A person holding a remote, pointing at a screen with many channels.",
      "imageUrl": "https://images.unsplash.com/photo-1563029960-ed4228d0996a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtZWRpYSUyMHdhbGx8ZW58MHx8fHwxNzU4NjUwODM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "media wall"
    }
  ]
}
```

# src/lib/placeholder-images.ts

```ts
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

```

# src/lib/schemas.ts

```ts
import { z } from 'zod';

// The schema should only validate the fields a user can see and interact with.
export const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number including country code.'),
  plan: z.string().min(1, 'A plan must be selected.'), // This is the unique plan slug
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

export const contactSchema = z.object({
    name: z.string().min(2, 'name: Name must be at least 2 characters.'),
    email: z.string().email('email: Please enter a valid email address.'),
    message: z.string().min(10, 'message: Message must be at least 10 characters.'),
});

export type ContactSchema = z.infer<typeof contactSchema>;
```

# src/lib/sheets.ts

```ts
import { google } from 'googleapis';

type LeadData = {
  timestamp: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  planName: string;
  planPrice: string;
  ip?: string | null;
};

export async function saveLead(data: LeadData): Promise<void> {
  // Check for all required environment variables
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Sheets API credentials are not configured in environment variables.');
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Use the sheet name from the environment variable, or default to 'Leads'
    const range = process.env.GOOGLE_SHEET_NAME || 'Leads'; 

    const ipLocation = data.ip || 'Unknown';

    // The order of values MUST match the column order in your Google Sheet
    const values = [
      [
        data.timestamp,
        data.orderNumber,
        data.name,
        data.email,
        data.phone,
        data.planName,
        data.planPrice,
        ipLocation,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Successfully saved order to Google Sheet:', data.orderNumber);

  } catch (err) {
    console.error('Error appending data to Google Sheet:', err);
    throw new Error('Failed to save lead to Google Sheets.');
  }
}
```

# src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# src/middleware.ts

```ts
import {NextRequest, NextResponse} from 'next/server';
import {i18n} from './lib/i18n-config';
import {match as matchLocale} from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  const languages = new Negotiator({headers: negotiatorHeaders}).languages();

  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (error) {
    // Return default locale if match fails
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, Next.js specific paths, and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    /\.(.*)$/.test(pathname)
  ) {
    return;
  }
  
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};

    
```

# tailwind.config.ts

```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

