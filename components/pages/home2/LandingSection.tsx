//TODO: add hover effect to link

import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import type { Image } from 'sanity'

export interface LandingSectionProps {
  title?: string
  avatar?: Image
  overview?: string
}

export function LandingSection({
  title,
  avatar,
  overview,
}: LandingSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="aspect-video overflow-hidden rounded bg-white">
        <ImageBox
          image={avatar}
          alt={`Cover image for ${title}`}
          classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded bg-black opacity-50"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-end p-10 text-center text-white">
        <div className="h-1/2 w-1/2">
          <h1 className="mb-3 text-3xl font-medium italic">{title}</h1>
          <p className="mb-5 font-serif text-sm">
            Welcome to my site! Checkout my blogs, projects and learn more about
            me!
          </p>
          <Link
            href="/about"
            className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-black"
            style={{
              boxShadow: '-2px -2px 0px black',
            }}
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  )
}
