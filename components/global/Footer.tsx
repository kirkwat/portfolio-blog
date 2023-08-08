import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Socials } from 'components/shared/Socials'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { SettingsPayload } from 'types'

export function Footer({ settings }: { settings: SettingsPayload }) {
  return (
    <>
      <div className="mx-auto mt-8 max-w-2xl border-t border-black px-40 md:px-60" />
      <footer className="bottom-0 grid w-full grid-cols-1 gap-5 py-10 text-center">
        {settings.footer && (
          <CustomPortableText
            paragraphClasses="text-md text-white"
            value={settings.footer}
          />
        )}
        <Socials settings={settings} />
        <div className="icons flex justify-center">
          <Link
            href="https://github.com/kirkwat/portfolio-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="w-5 transition-colors duration-200 hover:text-pink-300"
          >
            <FaGithub size={32} />
          </Link>
        </div>
      </footer>
    </>
  )
}
