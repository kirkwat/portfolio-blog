import type { ShowcaseContent } from 'types'

export interface PostSectionProps {
  showcasePosts?: ShowcaseContent[]
}

export function PostSection({ showcasePosts }: PostSectionProps) {
  return (
    <section>
      <div className="text-5xl text-pink-400">postSection</div>
    </section>
  )
}
