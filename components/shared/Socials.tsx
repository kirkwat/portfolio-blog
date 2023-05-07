import Link from 'next/link'
import { IconContext } from 'react-icons'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import { SiVsco } from 'react-icons/si'
import { SettingsPayload } from 'types'

interface SocialsProps {
  settings?: SettingsPayload
  footer?: boolean
}

export function Socials({ settings, footer = false }: SocialsProps) {
  const {
    facebook,
    instagram,
    linkedin,
    pinterest,
    vsco,
    tiktok,
    youtube,
    twitter,
  } = settings ?? {}

  return (
    <div
      className={`icons flex justify-center ${footer ? '' : 'gap-2 lg:gap-0'}`}
    >
      <IconContext.Provider
        value={
          footer
            ? { size: '34', color: 'white' }
            : { size: '41', color: 'rgb(37 99 235)' }
        }
      >
        {linkedin && linkedin.length > 0 && (
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaLinkedin className="heart-icon" />
          </Link>
        )}
        {instagram && instagram.length > 0 && (
          <Link
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaInstagram />
          </Link>
        )}
        {tiktok && tiktok.length > 0 && (
          <Link
            href={tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaTiktok />
          </Link>
        )}
        {pinterest && pinterest.length > 0 && (
          <Link
            href={pinterest}
            target="_blank"
            rel="noopener noreferrer"
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaPinterest />
          </Link>
        )}
        {vsco && vsco.length > 0 && (
          <Link
            href={vsco}
            target="_blank"
            rel="noopener noreferrer"
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <SiVsco />
          </Link>
        )}
        {twitter && twitter.length > 0 && (
          <Link
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaTwitter />
          </Link>
        )}
        {youtube && youtube.length > 0 && (
          <Link
            href={youtube}
            target="_blank"
            rel="noopener noreferrer"
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaYoutube />
          </Link>
        )}
        {facebook && facebook.length > 0 && (
          <Link
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaFacebook />
          </Link>
        )}
      </IconContext.Provider>
    </div>
  )
}
