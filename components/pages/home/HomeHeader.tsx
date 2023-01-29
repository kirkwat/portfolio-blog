import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import { Socials } from 'components/shared/Socials'
import { DegreeItem, HomePagePayload, SettingsPayload } from 'types'

interface HeaderProps {
  page?: HomePagePayload
  settings?: SettingsPayload
}

export function HomeHeader({ page, settings }: HeaderProps) {
  const {
    avatar,
    title = 'Personal website',
    overview,
    role,
    school,
    school_link,
    interests,
    degrees,
  } = page ?? {}

  if (!overview && !title) {
    return null
  }

  return (
    <div>
      {/* Title */}
      {title && (
        <div className="mb-2 text-5xl font-bold leading-tight tracking-tighter md:mb-5 md:text-6xl md:leading-none">
          {title}
        </div>
      )}
      {/* Description */}
      {overview && (
        <div className="mb-4 font-serif text-lg text-gray-600 sm:text-xl md:mb-6 md:text-2xl">
          <CustomPortableText value={overview} />
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
          <h1 className="pt-3 text-center text-5xl">{title}</h1>
          <h2 className="text-center text-2xl">
            <div className="pt-3">{role}</div>
            <div className="pt-2">
              <a href={school_link}>{school}</a>
            </div>
          </h2>
          <div className="pt-4">
            <Socials settings={settings} />
          </div>
        </div>
        <div className="col-span-6 rounded bg-green-400 p-3 pb-0 text-2xl lg:col-span-4">
          <CustomPortableText value={overview} />
        </div>
        <div className="col-span-6 rounded bg-blue-400 p-3 md:col-span-3 lg:col-span-2">
          {interests && interests.length > 0 && (
            <div>
              <div className="text-2xl">Interests</div>
              <ul>
                {interests.map((interest, key) => {
                  return <li key={key}>{interest}</li>
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="col-span-6 rounded bg-blue-400 p-3 md:col-span-3 lg:col-span-2">
          {degrees && degrees.length > 0 && (
            <div>
              <div className="text-2xl">Education</div>
              <ul>
                {degrees.map((degree, key) => {
                  return (
                    <li key={key}>
                      {degree.major}, {degree.year}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
