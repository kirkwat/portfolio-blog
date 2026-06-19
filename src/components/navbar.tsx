'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, X } from 'lucide-react';
import { createDataAttribute, stegaClean } from 'next-sanity';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { SettingsQueryResult } from '@/sanity.types';
import { studioUrl } from '@/sanity/lib/api';
import { resolveHref } from '@/sanity/lib/utils';

interface NavbarProps {
  data: SettingsQueryResult;
  blackWhiteHeader?: boolean | null;
  resume?: string | null;
}

export function Navbar({ data, blackWhiteHeader, resume }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu after navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const menuItems = data?.menuItems ?? [];
  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null;

  const home = menuItems.filter((item) => item._type === 'home');
  const links = menuItems.filter((item) => item._type !== 'home');

  const hoverClass = blackWhiteHeader
    ? 'hover:text-primary'
    : 'hover:opacity-80';

  const menuLinks = links.map((menuItem, key) => {
    const href = resolveHref(menuItem?._type, menuItem?.slug);

    if (!href) {
      return null;
    }
    return (
      <Link
        key={key}
        className={cn(
          'text-md mt-4 mr-4 mb-2 block font-medium uppercase transition-all duration-300 md:mt-0 md:mb-0 md:inline-block',
          pathname === href && 'font-semibold',
          hoverClass,
        )}
        data-sanity={dataAttribute?.([
          'header',
          'menuItems',
          // typegen loses the array-item `_key` through this projection (types it `null`);
          // the value exists at runtime — fall back to '' rather than assert.
          { _key: menuItem._key ?? '' },
        ])}
        href={href}
      >
        {stegaClean(menuItem.title)}
      </Link>
    );
  });

  const resumeLink = resume && (
    <Link
      className={cn(
        'text-md mt-4 mr-4 mb-2 block font-medium uppercase transition-all duration-300 md:mt-0 md:mb-0 md:inline-block',
        hoverClass,
      )}
      href={resume}
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </Link>
  );

  return (
    <nav
      className={cn(
        'border-foreground fixed top-0 z-[60] flex w-full flex-wrap items-center justify-between gap-x-5 border-b px-4 py-3 md:justify-start md:px-12 md:py-4',
        blackWhiteHeader ? 'bg-background' : 'bg-foreground text-background',
      )}
      data-sanity={dataAttribute?.(['header', 'menuItems'])}
    >
      {home.map((menuItem, key) => {
        const href = resolveHref(menuItem?._type, menuItem?.slug);

        if (!href) {
          return null;
        }
        return (
          <Link
            key={key}
            className={cn(
              'text-2xl font-medium italic transition-all duration-300',
              hoverClass,
            )}
            data-sanity={dataAttribute?.([
              'header',
              'menuItems',
              // typegen loses the array-item `_key` through this projection (types it `null`);
              // the value exists at runtime — fall back to '' rather than assert.
              { _key: menuItem._key ?? '' },
            ])}
            href={href}
          >
            {stegaClean(menuItem.title)}
          </Link>
        );
      })}
      <div className="block md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal="trap-focus">
          <SheetTrigger
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className={cn(
              'flex items-center rounded-sm px-3 py-2 transition-all duration-300',
              hoverClass,
            )}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </SheetTrigger>
          <SheetContent
            side="top"
            showCloseButton={false}
            className={cn(
              'border-foreground top-[63px] z-50 gap-0 border-b px-4 pb-3 text-base shadow-none md:hidden',
              blackWhiteHeader
                ? 'bg-background text-foreground'
                : 'bg-foreground text-background',
            )}
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div>
              {menuLinks}
              {resumeLink}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden w-full md:flex md:w-auto md:items-center">
        <div className="md:grow">
          {menuLinks}
          {resumeLink}
        </div>
      </div>
    </nav>
  );
}
