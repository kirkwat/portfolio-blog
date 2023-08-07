import type { ShowcaseContent } from 'types'

export interface ProjectSectionProps {
  showcaseProjects?: ShowcaseContent[]
}

export function ProjectSection({ showcaseProjects }: ProjectSectionProps) {
  return (
    <section>
      <div className="text-5xl text-pink-400">projectSection</div>
    </section>
  )
}
