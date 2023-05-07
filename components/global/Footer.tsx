import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Socials } from 'components/shared/Socials'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { SettingsPayload } from 'types'

export function Footer({ settings }: { settings: SettingsPayload }) {
  return (
    <footer className="bottom-0 grid w-full grid-cols-1 gap-4 bg-black py-5 text-center">
      {settings.footer && (
        <CustomPortableText
          paragraphClasses="text-md text-white"
          value={settings.footer}
        />
      )}
      <Socials settings={settings} footer />
      <div className="icons flex justify-center">
        <Link
          href="https://github.com/kirkwat/portfolio-blog"
          target="_blank"
          rel="noopener noreferrer"
          className="w-5 duration-100 hover:scale-125"
        >
          <FaGithub size={34} color="white" />
        </Link>
      </div>
    </footer>
  )
}
