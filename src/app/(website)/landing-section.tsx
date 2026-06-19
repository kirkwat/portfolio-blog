import Link from 'next/link';

import ImageBox from '@/components/image-box';
import { Button } from '@/components/ui/button';
import type { HomePageQueryResult } from '@/sanity.types';

export interface LandingSectionProps {
  title: string | null;
  landingSection: NonNullable<HomePageQueryResult>['landingSection'];
}

export function LandingSection({ title, landingSection }: LandingSectionProps) {
  if (!landingSection) {
    return null;
  }
  const { landingImage, subtitle, aboutMeButton } = landingSection;

  return (
    <section className="relative overflow-hidden select-none">
      <div className="bg-background aspect-4/5 overflow-hidden rounded-sm md:aspect-video">
        <ImageBox
          image={landingImage}
          alt={`Landing image for ${title}`}
          cover
        />
        <div className="bg-foreground absolute top-0 right-0 bottom-0 left-0 overflow-hidden rounded-sm opacity-50" />
      </div>
      <div className="text-background absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-end p-10 text-center">
        <div className="h-1/2 sm:w-1/2">
          <h1 className="mb-3 text-4xl font-medium italic">{title}</h1>
          <p className="mb-5 font-serif text-sm">{subtitle}</p>
          <Button
            variant="cta"
            nativeButton={false}
            render={<Link href="/about" />}
          >
            {aboutMeButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
