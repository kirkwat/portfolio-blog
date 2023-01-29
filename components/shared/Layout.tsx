import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import { SettingsPayload } from 'types'

const fallbackSettings: SettingsPayload = {
  menuItems: [],
  footer: [],
}

export interface LayoutProps {
  children: React.ReactNode
  settings: SettingsPayload | undefined
  preview?: boolean
}

export default function Layout({
  children,
  settings = fallbackSettings,
  preview,
}: LayoutProps) {
  return (
    <div className="flex h-screen flex-col justify-between bg-white text-black">
      {preview && <PreviewBanner />}
      <Navbar menuItems={settings?.menuItems} />
      <main className="container mx-auto mb-auto mt-10 px-4 md:mt-16">
        {children}
      </main>
      {settings && <Footer settings={settings} />}
    </div>
  )
}
