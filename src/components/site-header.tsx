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
