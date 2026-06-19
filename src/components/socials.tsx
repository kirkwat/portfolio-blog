import Link from 'next/link';

import type { IconType } from 'react-icons';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { SiVsco } from 'react-icons/si';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { SiteSettingsQueryResult } from '@/sanity.types';

interface SocialsProps {
  socials?: NonNullable<SiteSettingsQueryResult>['socials'];
}

export function Socials({ socials }: SocialsProps) {
  const {
    facebook,
    instagram,
    linkedin,
    pinterest,
    vsco,
    tiktok,
    youtube,
    twitter,
  } = socials ?? {};

  const socialLinks: Array<{
    label: string;
    href: string | null | undefined;
    icon: IconType;
  }> = [
    { label: 'LinkedIn', href: linkedin, icon: FaLinkedin },
    { label: 'Instagram', href: instagram, icon: FaInstagram },
    { label: 'TikTok', href: tiktok, icon: FaTiktok },
    { label: 'Pinterest', href: pinterest, icon: FaPinterest },
    { label: 'VSCO', href: vsco, icon: SiVsco },
    { label: 'Twitter', href: twitter, icon: FaTwitter },
    { label: 'YouTube', href: youtube, icon: FaYoutube },
    { label: 'Facebook', href: facebook, icon: FaFacebook },
  ];

  return (
    <TooltipProvider>
      <div className="icons flex justify-center gap-2">
        {socialLinks.map(
          ({ label, href, icon: Icon }) =>
            href &&
            href.length > 0 && (
              <Tooltip key={label}>
                <TooltipTrigger
                  render={
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="hover:text-primary mx-2 w-5 transition-colors duration-200"
                    />
                  }
                >
                  <Icon size={32} />
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ),
        )}
      </div>
    </TooltipProvider>
  );
}
