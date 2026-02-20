import { Bell, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/dashboard': { title: 'Дашборд', subtitle: 'Обзор метрик и последних заказов' },
  '/payments': { title: 'Платежи', subtitle: 'История транзакций и выплат' },
  '/analytics': { title: 'Аналитика', subtitle: 'Детальная статистика по заказам и агентам' },
  '/integrations': { title: 'Интеграции', subtitle: 'Управление платформами и TAP Protocol' },
  '/settings': { title: 'Настройки', subtitle: 'Профиль и конфигурация' },
}

export default function Header() {
  const location = useLocation()
  const currentPage = pageTitles[location.pathname] || pageTitles['/dashboard']

  return (
    <header className="bg-white border-b border-neutral-100 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900">{currentPage.title}</h2>
          <p className="text-sm text-neutral-600 mt-1">{currentPage.subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Поиск..."
              className="pl-10 pr-4 py-2 border border-neutral-100 rounded-lg text-sm 
                         focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10
                         w-64"
            />
          </div>
          <button className="p-2 hover:bg-neutral-50 rounded-lg transition-colors relative">
            <Bell size={20} className="text-neutral-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error-600 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  )
}

