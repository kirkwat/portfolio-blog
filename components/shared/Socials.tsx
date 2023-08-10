import Link from 'next/link'
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
  socials?: SettingsPayload['socials']
}

export function Socials({ socials }: SocialsProps) {
  const {
    facebook,
    instagram,
    linkedin,
    pinterest,
    vsco,
    tiktok,
    youtube,
    twitter,
  } = socials

  return (
    <div className="icons flex justify-center gap-2">
      {linkedin && linkedin.length > 0 && (
        <Link
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-5 transition-colors duration-200 hover:text-pink-300"
        >
          <FaLinkedin size={32} />
        </Link>
      )}
      {instagram && instagram.length > 0 && (
        <Link
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-5 transition-colors duration-200 hover:text-pink-300"
        >
          <FaInstagram size={32} />
        </Link>
      )}
      {tiktok && tiktok.length > 0 && (
        <Link
          href={tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-5 transition-colors duration-200 hover:text-pink-300"
        >
          <FaTiktok size={32} />
        </Link>
      )}
      {pinterest && pinterest.length > 0 && (
        <Link
          href={pinterest}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-5 transition-colors duration-200 hover:text-pink-300"
        >
          <FaPinterest size={32} />
        </Link>
      )}
      {vsco && vsco.length > 0 && (
        <Link
          href={vsco}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-5 transition-colors duration-200 hover:text-pink-300"
        >
          <SiVsco size={32} />
        </Link>
      )}
      {twitter && twitter.length > 0 && (
        <Link
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-5 transition-colors duration-200 hover:text-pink-300"
        >
          <FaTwitter size={32} />
        </Link>
      )}
      {youtube && youtube.length > 0 && (
        <Link
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-5 transition-colors duration-200 hover:text-pink-300"
        >
          <FaYoutube size={32} />
        </Link>
      )}
      {facebook && facebook.length > 0 && (
        <Link
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 w-5 transition-colors duration-200 hover:text-pink-300"
        >
          <FaFacebook size={32} />
        </Link>
      )}
    </div>
  )
}
