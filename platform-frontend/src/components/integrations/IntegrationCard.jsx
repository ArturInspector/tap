export default function IntegrationCard({ integration }) {
  const { name, status, description, stats, icon: Icon } = integration

  return (
    <div className="card">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-neutral-50 rounded-lg">
          <Icon className="text-primary-600" size={32} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-neutral-900">{name}</h3>
          <p className="text-sm text-neutral-600 mt-1">{description}</p>
        </div>
        <span className={status === 'active' ? 'badge-success' : 'badge-warning'}>
          {status === 'active' ? 'Активен' : 'Настройка'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key}>
            <p className="text-sm text-neutral-600 capitalize">{key}</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="btn-secondary flex-1">Настройки</button>
        <button className="btn-primary flex-1">Синхронизировать</button>
      </div>
    </div>
  )
}

