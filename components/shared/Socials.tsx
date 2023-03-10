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
          <a
            href={linkedin}
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaLinkedin className="heart-icon" />
          </a>
        )}
        {instagram && instagram.length > 0 && (
          <a
            href={instagram}
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaInstagram />
          </a>
        )}
        {tiktok && tiktok.length > 0 && (
          <a
            href={tiktok}
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaTiktok />
          </a>
        )}
        {pinterest && pinterest.length > 0 && (
          <a
            href={pinterest}
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaPinterest />
          </a>
        )}
        {vsco && vsco.length > 0 && (
          <a
            href={vsco}
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <SiVsco />
          </a>
        )}
        {twitter && twitter.length > 0 && (
          <a
            href={twitter}
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaTwitter />
          </a>
        )}
        {youtube && youtube.length > 0 && (
          <a
            href={youtube}
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaYoutube />
          </a>
        )}
        {facebook && facebook.length > 0 && (
          <a
            href={facebook}
            className={`duration-100 hover:scale-125 ${
              footer ? 'mx-2 w-5' : 'mx-1 w-5 lg:w-10'
            }`}
          >
            <FaFacebook />
          </a>
        )}
      </IconContext.Provider>
    </div>
  )
}
