import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

export default function IntegrationCard({ integration }) {
  const { name, status, description, stats, icon: Icon } = integration

  return (
    <div className="card group hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg group-hover:scale-110 transition-transform">
          <Icon className="text-primary-600" size={32} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-neutral-900">{name}</h3>
          <p className="text-sm text-neutral-600 mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {status === 'active' ? (
            <CheckCircle2 className="text-success-600" size={20} />
          ) : (
            <AlertCircle className="text-warning-600" size={20} />
          )}
          <span className={status === 'active' ? 'badge-success' : 'badge-warning'}>
            {status === 'active' ? 'Активен' : 'Настройка'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="p-3 bg-neutral-50 rounded-lg border border-neutral-100"
          >
            <p className="text-xs text-neutral-600 uppercase tracking-wide mb-1">
              {key === 'products' ? 'Товары' : key === 'orders' ? 'Заказы' : key === 'agents' ? 'Агенты' : 'Транзакции'}
            </p>
            <p className="text-2xl font-bold text-neutral-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="btn-secondary flex-1">Настройки</button>
        <button className="btn-primary flex-1 flex items-center justify-center gap-2">
          <RefreshCw size={16} />
          Синхронизировать
        </button>
      </div>
    </div>
  )
}

