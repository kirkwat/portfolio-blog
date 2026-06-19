import type { HomePageQueryResult } from '@/sanity.types';

import { ContentSection } from './content-section';
import { LandingSection } from './landing-section';
import { ShowcaseSection } from './showcase-section';

export interface HomePageProps {
  data: NonNullable<HomePageQueryResult>;
}

export function HomePage({ data }: HomePageProps) {
  const { title, landingSection, contentSection, showcaseSection } = data;

  return (
    <div className="mx-auto max-w-7xl">
      <LandingSection title={title} landingSection={landingSection} />
      <ContentSection contentSection={contentSection} />
      <ShowcaseSection showcaseSection={showcaseSection} />
    </div>
  );
}
