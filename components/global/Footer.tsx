import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Socials } from 'components/shared/Socials'
import { FaGithub } from 'react-icons/fa'
import { SettingsPayload } from 'types'

export function Footer({ settings }: { settings: SettingsPayload }) {
  return (
    <footer className="bottom-0 grid w-full grid-cols-1 gap-4 bg-black py-5 text-center md:py-10">
      {settings.footer && (
        <CustomPortableText
          paragraphClasses="text-md text-white"
          value={settings.footer}
        />
      )}
      <Socials settings={settings} footer />
      <div className="flex justify-center">
        <a href="https://github.com/kirkwat/portfolio-blog">
          <FaGithub size="2rem" color="white" />
        </a>
      </div>
    </footer>
  )
}
