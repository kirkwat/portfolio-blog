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
    <div className={`${centered ? 'text-center' : ''}`}>
      {/* Title */}
      {title && (
        <div className="mb-2 text-4xl font-medium leading-tight tracking-tighter md:mb-4 md:leading-none lg:text-5xl">
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className="mb-4 font-serif text-lg opacity-80 sm:text-xl md:mb-6 md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
      {/* Subtitle */}
      {subtitle && (
        <div className="mb-4 font-serif text-lg opacity-80 sm:text-xl md:mb-6 md:text-2xl">
          {subtitle}
        </div>
      )}
    </div>
  )
}
