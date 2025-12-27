import { Bell } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-neutral-100 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900">Dashboard</h2>
          <p className="text-sm text-neutral-600 mt-1">Добро пожаловать в панель управления</p>
        </div>

        <button className="p-2 hover:bg-neutral-50 rounded-lg transition-colors relative">
          <Bell size={20} className="text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error-600 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}

