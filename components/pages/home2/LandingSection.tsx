export interface LandingSectionProps {
  title?: string
  overview?: string
}

export function LandingSection({ title, overview }: LandingSectionProps) {
  return (
    <section>
      <div className="text-5xl text-pink-400">{title}</div>
    </section>
  )
}
