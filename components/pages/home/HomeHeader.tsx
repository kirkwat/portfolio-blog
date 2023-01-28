import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'

interface HeaderProps {
  avatar?: { asset?: any }
  centered?: boolean
  description?: any[]
  title?: string
}
export function HomeHeader(props: HeaderProps) {
  const { title, avatar, description, centered = false } = props
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
      <div className="grid grid-cols-6">
        <div className="col-span-6 rounded bg-red-400 p-3 lg:col-span-2 lg:row-span-2">
          <ImageBox
            image={avatar}
            alt={title}
            height={1500}
            width={1500}
            classesWrapper="rounded-full"
          />
          <h1 className="pt-3 text-5xl">{title}</h1>
          <h2 className="pt-3 text-3xl">
            <p>{title}</p>
            <p>{title}</p>
          </h2>
          <div className="pt-4">logo links go here</div>
        </div>
        <div className="col-span-6 rounded bg-green-400 p-3 text-2xl lg:col-span-4">
          <CustomPortableText value={description} />
        </div>
        <div className="col-span-6 rounded bg-blue-400 p-3 md:col-span-3 lg:col-span-2">
          interests
        </div>
        <div className="col-span-6 rounded bg-blue-400 p-3 md:col-span-3 lg:col-span-2">
          education
        </div>
      </div>
    </div>
  )
}
