import { Socials } from 'components/shared/Socials'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { SettingsPayload } from 'types'

interface FooterProps {
  footer?: SettingsPayload['footer']
  socials?: SettingsPayload['socials']
}

export function Footer({ footer, socials }: FooterProps) {
  const { footerText, blackWhiteFooter } = footer
  return (
    <>
      {blackWhiteFooter && (
        <div className="mx-auto mt-8 max-w-2xl border-t border-black px-40 md:px-60" />
      )}
      <footer
        className={`bottom-0 grid w-full grid-cols-1 gap-5 py-10 text-center ${
          blackWhiteFooter ? '' : 'mt-8 bg-black text-white'
        }`}
      >
        {footerText && <div className="text-md">{footerText}</div>}
        <Socials socials={socials} />
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
