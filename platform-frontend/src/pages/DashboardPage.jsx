import { useState } from 'react'
import { TrendingUp, ShoppingCart, Zap, Bot, Store, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('today')

  const metrics = [
    { 
      label: 'Заказы сегодня', 
      value: '15', 
      change: '+12%',
      trend: 'up',
      icon: ShoppingCart, 
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Выручка', 
      value: '$2,450', 
      change: '+8%',
      trend: 'up',
      icon: TrendingUp, 
      gradient: 'from-green-500 to-green-600'
    },
    { 
      label: 'TAP заказы', 
      value: '3', 
      change: '20%',
      trend: 'neutral',
      icon: Zap, 
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'AI агенты', 
      value: '5', 
      change: '+2',
      trend: 'up',
      icon: Bot, 
      gradient: 'from-orange-500 to-orange-600'
    },
  ]

  const platformStats = [
    { name: 'Shopify', orders: 12, revenue: '$1,840', growth: '+15%', active: true },
    { name: 'Amazon', orders: 3, revenue: '$610', growth: '+5%', active: true },
  ]

  const recentOrders = [
    { 
      id: '#1234', 
      amount: '$150', 
      source: 'AI Agent', 
      agent: 'ChatGPT-4',
      platform: 'Shopify',
      status: 'success',
      time: '2 мин назад'
    },
    { 
      id: '#1235', 
      amount: '$200', 
      source: 'Web', 
      agent: null,
      platform: 'Shopify',
      status: 'success',
      time: '15 мин назад'
    },
    { 
      id: '#1236', 
      amount: '$80', 
      source: 'AI Agent', 
      agent: 'Claude-3',
      platform: 'Amazon',
      status: 'pending',
      time: '1 час назад'
    },
    { 
      id: '#1237', 
      amount: '$320', 
      source: 'AI Agent', 
      agent: 'GPT-4o',
      platform: 'Shopify',
      status: 'success',
      time: '2 часа назад'
    },
  ]

  const topAgents = [
    { name: 'ChatGPT-4', orders: 8, revenue: '$1,240', platform: 'Shopify' },
    { name: 'Claude-3', orders: 4, revenue: '$680', platform: 'Amazon' },
    { name: 'GPT-4o', orders: 2, revenue: '$320', platform: 'Shopify' },
  ]

  return (
    <div className="space-y-8">
      {/* Time Range Filter */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-neutral-50 p-1 rounded-lg">
          {['today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {range === 'today' ? 'Сегодня' : range === 'week' ? 'Неделя' : 'Месяц'}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics with Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="card-gradient relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <metric.icon size={24} className="text-white" />
                </div>
                {metric.trend === 'up' && (
                  <div className="flex items-center gap-1 text-green-200 text-sm">
                    <ArrowUpRight size={16} />
                    <span>{metric.change}</span>
                  </div>
                )}
                {metric.trend === 'down' && (
                  <div className="flex items-center gap-1 text-red-200 text-sm">
                    <ArrowDownRight size={16} />
                    <span>{metric.change}</span>
                  </div>
                )}
                {metric.trend === 'neutral' && (
                  <span className="text-white/80 text-sm">{metric.change}</span>
                )}
              </div>
              <p className="text-white/80 text-sm mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-white">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Stats */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral-900">Платформы</h3>
          <Store className="text-neutral-400" size={20} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platformStats.map((platform) => (
            <div
              key={platform.name}
              className="p-4 border border-neutral-100 rounded-lg hover:border-primary-600/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600/10 rounded-lg flex items-center justify-center">
                    <Store className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{platform.name}</p>
                    <p className="text-xs text-neutral-600">{platform.orders} заказов</p>
                  </div>
                </div>
                <span className={platform.active ? 'badge-success' : 'badge-warning'}>
                  {platform.active ? 'Активна' : 'Неактивна'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-neutral-900">{platform.revenue}</p>
                  <p className="text-xs text-success-600">{platform.growth}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-neutral-900">Последние заказы</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Все заказы →
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 border border-neutral-100 rounded-lg hover:border-primary-600/50 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-neutral-900">{order.id}</span>
                    <span className="text-xs text-neutral-500">{order.time}</span>
                  </div>
                  <span className={order.status === 'success' ? 'badge-success' : 'badge-warning'}>
                    {order.status === 'success' ? 'Выполнен' : 'В обработке'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Store size={14} className="text-neutral-400" />
                      <span className="text-neutral-600">{order.platform}</span>
                    </div>
                    {order.agent && (
                      <div className="flex items-center gap-2">
                        <Bot size={14} className="text-primary-600" />
                        <span className="text-primary-600 font-medium">{order.agent}</span>
                      </div>
                    )}
                    {!order.agent && (
                      <span className="text-neutral-400 text-xs">Web</span>
                    )}
                  </div>
                  <span className="font-bold text-neutral-900">{order.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agents */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-neutral-900">Топ AI агенты</h3>
            <Bot className="text-neutral-400" size={20} />
          </div>
          <div className="space-y-4">
            {topAgents.map((agent, index) => (
              <div
                key={agent.name}
                className="flex items-center justify-between p-4 border border-neutral-100 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{agent.name}</p>
                    <p className="text-xs text-neutral-600">{agent.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-900">{agent.revenue}</p>
                  <p className="text-xs text-neutral-600">{agent.orders} заказов</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
