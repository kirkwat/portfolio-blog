import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import type { Image } from 'sanity'
import type { ShowcaseContent } from 'types'

export interface ProjectSectionProps {
  avatar?: Image
  showcaseProjects?: ShowcaseContent[]
}

export function ProjectSection({
  avatar,
  showcaseProjects,
}: ProjectSectionProps) {
  return (
    <section className="relative select-none overflow-hidden">
      <div className="overflow-hidden rounded bg-white sm:aspect-square md:aspect-video">
        <ImageBox
          image={avatar}
          alt={`Cover image for Project`}
          classesWrapper="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded bg-black opacity-50" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-start justify-end p-10 text-center text-white sm:justify-start sm:text-start">
        <div className="h-1/2 sm:w-1/2 md:w-1/3">
          <h2 className="mb-5 text-3xl font-medium uppercase italic">
            Projects
          </h2>
          <p className="mb-5 font-serif text-sm">
            Welcome to my site! Checkout my blogs, projects and learn more about
            me! Welcome to my site! Checkout my blogs, projects and learn more
            about me!
          </p>
          <Link
            href="/projects"
            className="rounded-md bg-pink-200 px-4 py-2 text-sm font-medium text-black shadow-[-2px_-2px_0px_black] transition-all duration-300 hover:bg-pink-300 hover:shadow-[-3px_-3px_0px_black]"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  )
}
