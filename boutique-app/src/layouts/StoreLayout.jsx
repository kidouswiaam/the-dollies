import { Outlet } from 'react-router-dom'
import { Moon, Sun, Menu, X, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useStore } from '../contexts/StoreContext'
import SocialIcons from '../components/storefront/SocialIcons'
import { buildWhatsAppGeneralLink } from '../lib/whatsapp'
import { BRAND_NAME } from '../lib/brand'

export default function StoreLayout() {
  const { theme, toggle } = useTheme()
  const { settings } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const brandName = settings?.boutique_name || BRAND_NAME

  const nav = [
    { href: '/', label: 'Home' },
    { href: '/#dolls', label: 'Dolls' },
    { href: '/#patterns', label: 'Patterns' },
    { href: '/#catalog', label: 'Shop' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ]

  const waLink = settings?.whatsapp_number
    ? buildWhatsAppGeneralLink(settings.whatsapp_number, brandName)
    : '#'

  return (
    <div className="min-h-screen flex flex-col body-grain">
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[4.25rem]">
          <a href="/" className="font-display text-xl sm:text-2xl font-semibold text-dark tracking-tight shrink-0">
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt={brandName} className="h-9" />
            ) : (
              <>The Dollies</>
            )}
          </a>

          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <SocialIcons settings={settings} className="hidden sm:flex" />
            {settings?.whatsapp_number && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-whatsapp"
              >
                <MessageCircle size={17} strokeWidth={2} />
                <span>WhatsApp</span>
              </a>
            )}
            <button
              type="button"
              onClick={toggle}
              className="p-2 text-dark/70 hover:text-dark rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              className="md:hidden p-2 text-dark"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-dark/8 bg-cream"
            >
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3.5 font-semibold text-dark border-b border-dark/6 last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-6 py-4 flex items-center gap-4">
                <SocialIcons settings={settings} />
                {settings?.whatsapp_number && (
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="nav-whatsapp !inline-flex">
                    <MessageCircle size={17} />
                    WhatsApp
                  </a>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 relative z-[1]">
        <Outlet />
      </main>

      <footer className="relative z-[1] border-t border-dark/8 bg-cream py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-display text-xl text-dark">{brandName}</p>
          <p className="text-sm text-muted mt-1">Handmade crochet dolls with love</p>
          <SocialIcons settings={settings} className="justify-center mt-6" />
          <p className="text-xs text-dark/50 mt-8">
            &copy; {new Date().getFullYear()} {brandName}
          </p>
          <a href="/admin/login" className="inline-block mt-3 text-xs text-dark/40 hover:text-primary">
            Admin
          </a>
        </div>
      </footer>
    </div>
  )
}
