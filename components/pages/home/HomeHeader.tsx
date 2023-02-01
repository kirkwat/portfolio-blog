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
    <>
      <div className="mx-auto grid max-w-screen-xl grid-cols-6 px-5 pt-3 pb-5 lg:pb-32 xl:px-10">
        <div className="col-span-6 py-4 lg:col-span-2 lg:row-span-2 lg:pr-4 lg:pl-0">
          <ImageBox
            image={avatar}
            alt={title}
            height={1500}
            width={1500}
            classesWrapper="w-52 h-52 md:w-64 md:h-64 overflow-hidden rounded-full mx-auto"
          />
          <h1 className="pt-3 text-center text-3xl lg:text-4xl">{title}</h1>
          <h2 className="text-center text-xl lg:text-2xl">
            <div className="pt-3 text-gray-500">{role}</div>
            <div className="pt-2">
              <a href={school_link} className="text-blue-600 hover:underline">
                {school}
              </a>
            </div>
          </h2>
          <div className="pt-4 pb-4 lg:pb-0">
            <Socials settings={settings} />
          </div>
        </div>
        <div className="col-span-6 place-self-end pt-3 pb-0 text-xl lg:col-span-4 lg:pl-4 lg:text-2xl xl:place-self-center">
          <div className="pb-3 text-4xl font-bold lg:text-5xl">About Me</div>
          <CustomPortableText value={overview} />
        </div>
        {interests && interests.length > 0 && (
          <div className="col-span-6 py-4 md:col-span-3 lg:col-span-2 lg:pr-3 lg:pl-4">
            <div className="pb-2 text-2xl font-bold lg:pb-3 lg:text-3xl">
              Interests
            </div>
            <ul className="list-inside list-disc text-xl lg:text-2xl">
              {interests.map((interest, key) => {
                return <li key={key}>{interest}</li>
              })}
            </ul>
          </div>
        )}
        {degrees && degrees.length > 0 && (
          <div className="col-span-6 py-4 md:col-span-3 lg:col-span-2 lg:pl-3 lg:pr-0">
            <div className="text-2xl font-bold lg:text-3xl">Education</div>
            <ul className="text-xl lg:text-2xl">
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
    </>
  )
}
