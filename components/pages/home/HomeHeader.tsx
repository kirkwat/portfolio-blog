import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import { Socials } from 'components/shared/Socials'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { FaGraduationCap } from 'react-icons/fa'
import { HomePagePayload, SettingsPayload } from 'types'

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
      <div className="mx-auto grid max-w-screen-xl grid-cols-12 px-5 pt-3 pb-5 lg:pb-32 xl:px-10">
        <div className="col-span-12 py-4 lg:col-span-4 lg:row-span-4 lg:pr-4 lg:pl-0">
          <div className="mx-auto h-52 w-52 overflow-hidden rounded-full md:h-64 md:w-64">
            <Image
              src={urlForImage(avatar)
                ?.height(1500)
                .width(1500)
                .fit('crop')
                .url()}
              width={1500}
              height={1500}
              sizes={'100vw'}
              alt={title}
            />
          </div>
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
        <div className="col-span-12 place-self-end pt-3 pb-0 text-xl lg:col-span-8 lg:pl-4 lg:text-2xl xl:place-self-center">
          <div className="pb-3 text-3xl font-bold lg:text-4xl">About Me</div>
          <CustomPortableText
            value={overview}
            paragraphClasses="font-serif text-gray-600"
          />
        </div>
        {interests && interests.length > 0 && (
          <div className="col-span-12 py-4 md:col-span-5 lg:col-span-3 lg:pr-3 lg:pl-4">
            <div className="pb-2 text-2xl font-bold lg:pb-3 lg:text-3xl">
              Interests
            </div>
            <ul className="list-inside list-disc font-serif text-lg text-gray-600 marker:text-black lg:text-xl">
              {interests.map((interest, key) => {
                return <li key={key}>{interest}</li>
              })}
            </ul>
          </div>
        )}
        {degrees && degrees.length > 0 && (
          <div className="col-span-12 py-4 md:col-span-7 lg:col-span-5 lg:pl-0 lg:pr-0">
            <div className="pb-2 text-2xl font-bold lg:pb-3 lg:text-3xl">
              Education
            </div>
            <ul>
              {degrees.map((degree, key) => {
                return (
                  <li key={key} className="flex flex-row">
                    <span className="inline-block bg-center bg-no-repeat align-middle">
                      <FaGraduationCap size={29} />
                    </span>
                    <div className="flex flex-col pl-3">
                      <span className="text-xl lg:text-2xl">
                        {degree.major}, {degree.year}
                      </span>
                      <span className="text-md font-serif text-gray-600 lg:text-lg">
                        {degree.college}
                      </span>
                    </div>
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
