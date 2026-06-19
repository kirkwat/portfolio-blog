import Link from 'next/link';

import { FaGithub } from 'react-icons/fa';

import { Socials } from '@/components/socials';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type {
  SettingsQueryResult,
  SiteSettingsQueryResult,
} from '@/sanity.types';

interface FooterProps {
  footer: NonNullable<SettingsQueryResult>['footer'];
  socials?: NonNullable<SiteSettingsQueryResult>['socials'];
}

export function Footer({ footer, socials }: FooterProps) {
  const { footerText, blackWhiteFooter } = footer ?? {};
  return (
    <>
      {blackWhiteFooter && (
        <Separator className="bg-foreground mx-auto mt-8 max-w-2xl" />
      )}
      <footer
        className={cn(
          'bottom-0 grid w-full grid-cols-1 gap-5 py-10 text-center',
          !blackWhiteFooter && 'bg-foreground text-background mt-8',
        )}
      >
        {footerText && <div className="text-md">{footerText}</div>}
        <Socials socials={socials} />
        <div className="icons flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Link
                    href="https://github.com/kirkwat/portfolio-blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-primary w-5 transition-colors duration-200"
                  />
                }
              >
                <FaGithub size={32} />
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </footer>
    </>
  );
}
