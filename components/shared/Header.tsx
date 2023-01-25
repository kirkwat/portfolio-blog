import { CustomPortableText } from 'components/shared/CustomPortableText'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false } = props
  if (!description && !title) {
    return null
  }
  return (
    <div className={`${centered ? 'text-center' : ''}`}>
      {/* Title */}
      {title && (
        <div className="mb-2 text-5xl font-bold leading-tight tracking-tighter md:mb-5 md:text-6xl md:leading-none">
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className="mb-4 font-serif text-lg text-gray-600 sm:text-xl md:mb-6 md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  )
}
