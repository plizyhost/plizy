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
