import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { MenuItem } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
}

export function Navbar({ menuItems }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="fixed top-0 z-10 flex w-full flex-wrap items-center justify-between gap-x-5 bg-black py-3 px-4 shadow-lg md:justify-start md:py-4 md:px-12">
        {menuItems &&
          menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                className={`text-2xl text-white hover:opacity-80 md:text-3xl ${
                  menuItem?._type === 'home' ? 'font-bold' : ''
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
            className="flex items-center rounded border border-black px-3 py-2"
          >
            {isOpen ? (
              <FaTimes size={22} color="white" />
            ) : (
              <FaBars size={22} color="white" />
            )}
          </button>
        </div>
        <div
          className={`block w-full md:flex md:w-auto md:items-center ${
            isOpen ? '' : 'hidden'
          }`}
        >
          <div className="md:flex-grow">
            <Link
              href="/posts"
              className="text-md mt-4 mr-4 block uppercase text-white hover:opacity-80 md:mt-0 md:inline-block md:text-lg"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-md mt-4 mb-2 mr-4 block uppercase text-white hover:opacity-80 md:mt-0 md:mb-0 md:inline-block md:text-lg"
            >
              Projects
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
