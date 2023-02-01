import type { ProjectPayload, ShowcaseProject } from 'types'

import { CustomPortableText } from '../../shared/CustomPortableText'
import ImageBox from '../../shared/ImageBox'

interface ProjectCardProps {
  project: ProjectPayload | ShowcaseProject
}

export function ProjectListCard(props: ProjectCardProps) {
  const { project } = props

  return (
    <div className="relative h-full overflow-hidden rounded bg-white shadow-md duration-100 ease-in hover:shadow-xl md:h-96">
      <div className="w-full">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="relative mt-1 flex w-full flex-col justify-between p-3 xl:mt-0">
        <div className="mb-2 flex flex-row justify-between">
          {/* Title */}
          <div className=" text-xl font-extrabold tracking-tight md:text-2xl">
            {project.title}
          </div>
        </div>
        {/* Overview  */}
        <CustomPortableText
          value={project.overview}
          paragraphClasses="font-serif text-gray-500 line-clamp-5 lg:line-clamp-6 xl:line-clamp-4 2xl:line-clamp-2"
        />
      </div>
      {/* Tags */}
      <div className="absolute top-0 mx-4 mt-4 flex flex-row flex-wrap gap-2">
        {project.tags?.map((tag, key) => (
          <div
            className="rounded-full bg-white px-3 py-0.5 text-sm font-medium lowercase opacity-70 md:text-lg"
            key={key}
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  )
}
