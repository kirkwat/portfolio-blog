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
import { SettingsPayload } from 'types'

interface SocialsProps {
  settings?: SettingsPayload
  footer?: boolean
}

export function Socials({ settings, footer = false }: SocialsProps) {
  const { facebook, instagram, linkedin, pinterest, tiktok, youtube, twitter } =
    settings ?? {}

  return (
    <div className="flex justify-center">
      <IconContext.Provider
        value={
          footer
            ? { size: '2rem', color: 'white' }
            : { size: '2.5rem', color: 'black' }
        }
      >
        {linkedin && linkedin.length > 0 && (
          <a href={linkedin} className={footer ? 'mx-2' : 'mx-1'}>
            <FaLinkedin />
          </a>
        )}
        {instagram && instagram.length > 0 && (
          <a href={instagram} className={footer ? 'mx-2' : 'mx-1'}>
            <FaInstagram />
          </a>
        )}
        {tiktok && tiktok.length > 0 && (
          <a href={instagram} className={footer ? 'mx-2' : 'mx-1'}>
            <FaTiktok />
          </a>
        )}
        {pinterest && pinterest.length > 0 && (
          <a href={instagram} className={footer ? 'mx-2' : 'mx-1'}>
            <FaPinterest />
          </a>
        )}
        {twitter && twitter.length > 0 && (
          <a href={instagram} className={footer ? 'mx-2' : 'mx-1'}>
            <FaTwitter />
          </a>
        )}
        {youtube && youtube.length > 0 && (
          <a href={instagram} className={footer ? 'mx-2' : 'mx-1'}>
            <FaYoutube />
          </a>
        )}
        {facebook && facebook.length > 0 && (
          <a href={instagram} className={footer ? 'mx-2' : 'mx-1'}>
            <FaFacebook />
          </a>
        )}
      </IconContext.Provider>
    </div>
  )
}
