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
