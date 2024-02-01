import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { SettingsPayload } from 'types'

interface NavbarProps {
  header: SettingsPayload['header']
  resume?: SettingsPayload['resume']
}

export function Navbar({ header, resume }: NavbarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { menuItems, blackWhiteHeader } = header

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const home = menuItems.filter((item) => item._type === 'home')
  const links = menuItems.filter((item) => item._type !== 'home')

  return (
    <nav
      className={`fixed top-0 z-10 flex w-full flex-wrap items-center justify-between gap-x-5 border-b border-black px-4 py-3 md:justify-start md:px-12 md:py-4 ${
        blackWhiteHeader ? 'bg-white' : 'bg-black text-white'
      }`}
    >
      {home &&
        home.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)

          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`text-2xl font-medium italic transition-all duration-300 ${
                blackWhiteHeader ? 'hover:text-pink-300' : 'hover:opacity-80'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
      <div className="block md:hidden">
        <button
          onClick={handleToggle}
          className={`flex items-center rounded px-3 py-2 transition-all duration-300 ${
            blackWhiteHeader ? 'hover:text-pink-300' : 'hover:opacity-80'
          }`}
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
      <div
        className={`block w-full md:flex md:w-auto md:items-center ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="md:flex-grow">
          {links &&
            links.map((menuItem, key) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)

              if (!href) {
                return null
              }
              return (
                <Link
                  key={key}
                  className={`text-md mb-2 mr-4 mt-4 block font-medium uppercase transition-all duration-300 md:mb-0 md:mt-0 md:inline-block ${
                    router.pathname === href ? 'font-semibold' : ''
                  } ${
                    blackWhiteHeader
                      ? 'hover:text-pink-300'
                      : 'hover:opacity-80'
                  }`}
                  href={href}
                >
                  {menuItem.title}
                </Link>
              )
            })}
          {resume && (
            <Link
              className={`text-md mb-2 mr-4 mt-4 block font-medium uppercase transition-all duration-300 md:mb-0 md:mt-0 md:inline-block ${
                blackWhiteHeader ? 'hover:text-pink-300' : 'hover:opacity-80'
              }`}
              href="/uploads/resume.pdf"
            >
              Resume
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
