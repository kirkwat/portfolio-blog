import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import { HomePagePayload } from 'types'

export interface LandingSectionProps {
  title: string
  landingSection: HomePagePayload['landingSection']
}

export function LandingSection({ title, landingSection }: LandingSectionProps) {
  const { landingImage, subtitle, aboutMeButton } = landingSection

  return (
    <section className="relative select-none overflow-hidden">
      <div className="aspect-[4/5] overflow-hidden rounded bg-white md:aspect-video">
        <ImageBox
          image={landingImage}
          alt={`Landing image for ${title}`}
          cover
          classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded bg-black opacity-50" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-end p-10 text-center text-white">
        <div className="h-1/2 sm:w-1/2">
          <h1 className="mb-3 text-4xl font-medium italic">{title}</h1>
          <p className="mb-5 font-serif text-sm">{subtitle}</p>
          <Link
            href="/about"
            className="rounded-md bg-pink-200 px-4 py-2 text-sm font-medium text-black shadow-[-2px_-2px_0px_black] transition-all duration-300 hover:bg-pink-300 hover:shadow-[-3px_-3px_0px_black]"
          >
            {aboutMeButton}
          </Link>
        </div>
      </div>
    </section>
  )
}
