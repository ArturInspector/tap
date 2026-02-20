import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Wallet } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Payments', path: '/payments', icon: Wallet },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-neutral-100 flex flex-col">
      <div className="p-6 border-b border-neutral-100">
        <h1 className="text-xl font-bold text-neutral-900">TAPay</h1>
        <p className="text-sm text-neutral-600 mt-1">Payment Gateway</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
            M
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">Merchant</p>
            <p className="text-xs text-neutral-600 truncate">merchant@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

