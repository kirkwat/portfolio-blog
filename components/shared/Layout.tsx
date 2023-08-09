import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import { SettingsPayload } from 'types'

const fallbackSettings: SettingsPayload = {
  header: {},
  footer: {},
  socials: {},
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
    <div className="flex min-h-screen flex-col justify-between bg-white text-black selection:bg-pink-200 selection:text-white">
      {preview && <PreviewBanner />}
      <Navbar header={settings.header} resume={settings.resume} />
      <main className="mx-auto mb-auto mt-20 px-4">{children}</main>
      {settings.footer && (
        <Footer footer={settings.footer} socials={settings.socials} />
      )}
    </div>
  )
}
