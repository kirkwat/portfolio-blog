import { CustomPortableText } from 'components/shared/CustomPortableText'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
  subtitle?: string
}
export function Header(props: HeaderProps) {
  const { title, subtitle, description, centered = false } = props
  if (!description && !subtitle && !title) {
    return null
  }
  return (
    <div className={`my-8 ${centered ? 'text-center' : ''}`}>
      {/* Title */}
      {title && (
        <h1 className="mb-2 text-4xl font-medium uppercase italic tracking-tight md:mb-4 lg:text-5xl">
          {title}
        </h1>
      )}
      {/* Description */}
      {description && (
        <h2 className="mb-4 font-serif text-lg opacity-80 sm:text-xl md:mb-8 md:text-2xl">
          <CustomPortableText value={description} />
        </h2>
      )}
      {/* Subtitle */}
      {subtitle && (
        <div className="mb-4 font-serif text-lg opacity-80 sm:text-xl md:mb-8 md:text-2xl">
          {subtitle}
        </div>
      )}
      <div className="mx-auto mt-8 w-1/2 border-t border-black" />
    </div>
  )
}
