import { TrendingUp, ShoppingCart, Zap } from 'lucide-react'

export default function DashboardPage() {
  const metrics = [
    { label: 'Заказы сегодня', value: '15', icon: ShoppingCart, trend: '+12%' },
    { label: 'Выручка', value: '$2,450', icon: TrendingUp, trend: '+8%' },
    { label: 'TAP заказы', value: '3', icon: Zap, trend: '20%' },
  ]

  const recentOrders = [
    { id: '#1234', amount: '$150', source: 'AI Agent', status: 'success' },
    { id: '#1235', amount: '$200', source: 'Web', status: 'success' },
    { id: '#1236', amount: '$80', source: 'AI Agent', status: 'pending' },
  ]

  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-600">{metric.label}</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">{metric.value}</p>
                <p className="text-sm text-success-600 mt-1">{metric.trend}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <metric.icon className="text-primary-600" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card">
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">Последние заказы</h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-neutral-100 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="font-medium text-neutral-900">{order.id}</span>
                <span className="text-neutral-600">{order.source}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-neutral-900">{order.amount}</span>
                <span
                  className={
                    order.status === 'success' ? 'badge-success' : 'badge-warning'
                  }
                >
                  {order.status === 'success' ? 'Выполнен' : 'В обработке'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

