import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, Percent, Settings, LogOut, Store, Moon, Sun } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useStore } from '../contexts/StoreContext'

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/promotions', icon: Percent, label: 'Promotions' },
  { to: '/admin/settings', icon: Settings, label: 'Settings', adminOnly: true },
]

export default function AdminLayout() {
  const { signOut, isAdmin } = useAuth()
  const { theme, toggle } = useTheme()
  const { settings } = useStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-stone-100 dark:bg-stone-950">
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800">
        <div className="p-6 border-b border-stone-200 dark:border-stone-800">
          <p className="font-display text-lg font-semibold leading-tight">{settings?.boutique_name || 'Dollies Crochet'}</p>
          <p className="text-xs text-stone-500 mt-1">Studio Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links
            .filter((l) => !l.adminOnly || isAdmin)
            .map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-stone-600 dark:text-stone-400 hover:bg-accent/50 dark:hover:bg-stone-800'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
        </nav>
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg">
            <Store size={18} /> View Store
          </a>
          <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
          <p className="font-display font-semibold">Admin</p>
          <div className="flex gap-2">
            <button type="button" onClick={toggle} className="p-2 rounded-lg border border-stone-300 dark:border-stone-600">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button type="button" onClick={handleLogout} className="p-2 text-red-600"><LogOut size={18} /></button>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="lg:hidden flex overflow-x-auto gap-1 p-2 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
          {links
            .filter((l) => !l.adminOnly || isAdmin)
            .map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `shrink-0 px-3 py-2 text-xs font-medium rounded-full ${isActive ? 'bg-primary text-white' : 'text-stone-600'}`}>
                {label}
              </NavLink>
            ))}
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
