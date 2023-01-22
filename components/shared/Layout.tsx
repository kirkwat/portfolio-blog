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
    <div className="flex min-h-screen flex-col bg-white text-black">
      {preview && <PreviewBanner />}
      <Navbar menuItems={settings?.menuItems} />
      <main className="container mx-auto mt-10 px-4 md:mt-16">{children}</main>
      <Footer footer={settings?.footer} />
    </div>
  )
}
