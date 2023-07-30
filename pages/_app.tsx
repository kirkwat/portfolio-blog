import 'styles/index.css'

import { EB_Garamond, IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google'
import { AppProps } from 'next/app'

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const sans = EB_Garamond({
  variable: '--font-sans',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-mono: ${mono.style.fontFamily};
            --font-sans: ${sans.style.fontFamily};
            --font-serif: ${serif.style.fontFamily};
          }
        `}
      </style>

      <Component {...pageProps} />
    </>
  )
}
