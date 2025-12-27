import { useState } from 'react'
import { Calendar, Filter, Download, Bot, Store, TrendingUp } from 'lucide-react'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedAgent, setSelectedAgent] = useState('all')

  // Mock data - в реальности будет из API
  const ordersData = [
    {
      id: '#1234',
      date: '2024-01-20',
      time: '14:32',
      platform: 'Shopify',
      agent: 'ChatGPT-4',
      agentId: 'agent-chatgpt-4',
      customer: 'customer@example.com',
      amount: 150,
      status: 'completed',
      items: 2,
    },
    {
      id: '#1235',
      date: '2024-01-20',
      time: '14:15',
      platform: 'Shopify',
      agent: null,
      agentId: null,
      customer: 'buyer@example.com',
      amount: 200,
      status: 'completed',
      items: 3,
    },
    {
      id: '#1236',
      date: '2024-01-20',
      time: '13:45',
      platform: 'Amazon',
      agent: 'Claude-3',
      agentId: 'agent-claude-3',
      customer: 'user@example.com',
      amount: 80,
      status: 'pending',
      items: 1,
    },
    {
      id: '#1237',
      date: '2024-01-20',
      time: '12:20',
      platform: 'Shopify',
      agent: 'GPT-4o',
      agentId: 'agent-gpt-4o',
      customer: 'client@example.com',
      amount: 320,
      status: 'completed',
      items: 4,
    },
    {
      id: '#1238',
      date: '2024-01-19',
      time: '18:10',
      platform: 'Shopify',
      agent: 'ChatGPT-4',
      agentId: 'agent-chatgpt-4',
      customer: 'buyer2@example.com',
      amount: 95,
      status: 'completed',
      items: 1,
    },
  ]

  const agents = ['ChatGPT-4', 'Claude-3', 'GPT-4o']
  const platforms = ['Shopify', 'Amazon']

  // Фильтрация
  const filteredOrders = ordersData.filter((order) => {
    if (selectedPlatform !== 'all' && order.platform !== selectedPlatform) return false
    if (selectedAgent !== 'all') {
      if (selectedAgent === 'none' && order.agent !== null) return false
      if (selectedAgent !== 'none' && order.agent !== selectedAgent) return false
    }
    return true
  })

  // Статистика
  const stats = {
    total: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum, o) => sum + o.amount, 0),
    aiOrders: filteredOrders.filter((o) => o.agent !== null).length,
    webOrders: filteredOrders.filter((o) => o.agent === null).length,
    aiRevenue: filteredOrders.filter((o) => o.agent !== null).reduce((sum, o) => sum + o.amount, 0),
    webRevenue: filteredOrders.filter((o) => o.agent === null).reduce((sum, o) => sum + o.amount, 0),
  }

  // Группировка по агентам
  const agentStats = filteredOrders
    .filter((o) => o.agent)
    .reduce((acc, order) => {
      const key = order.agent
      if (!acc[key]) {
        acc[key] = { name: order.agent, orders: 0, revenue: 0, platform: order.platform }
      }
      acc[key].orders++
      acc[key].revenue += order.amount
      return acc
    }, {})

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-neutral-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input"
            >
              <option value="7d">Последние 7 дней</option>
              <option value="30d">Последние 30 дней</option>
              <option value="90d">Последние 90 дней</option>
              <option value="all">Все время</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Store size={18} className="text-neutral-400" />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="input"
            >
              <option value="all">Все платформы</option>
              {platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Bot size={18} className="text-neutral-400" />
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="input"
            >
              <option value="all">Все источники</option>
              <option value="none">Только Web</option>
              {agents.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-secondary ml-auto flex items-center gap-2">
            <Download size={18} />
            Экспорт
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">Всего заказов</p>
            <TrendingUp className="text-primary-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats.total}</p>
          <p className="text-sm text-neutral-600 mt-1">
            {stats.aiOrders} AI • {stats.webOrders} Web
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">Общая выручка</p>
            <TrendingUp className="text-success-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-neutral-900">${stats.totalRevenue}</p>
          <p className="text-sm text-neutral-600 mt-1">
            ${stats.aiRevenue} AI • ${stats.webRevenue} Web
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">AI заказы</p>
            <Bot className="text-purple-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats.aiOrders}</p>
          <p className="text-sm text-success-600 mt-1">
            {stats.total > 0 ? Math.round((stats.aiOrders / stats.total) * 100) : 0}% от всех
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">AI выручка</p>
            <Bot className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-neutral-900">${stats.aiRevenue}</p>
          <p className="text-sm text-success-600 mt-1">
            {stats.totalRevenue > 0
              ? Math.round((stats.aiRevenue / stats.totalRevenue) * 100)
              : 0}
            % от общей
          </p>
        </div>
      </div>

      {/* Agent Stats */}
      {Object.keys(agentStats).length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Статистика по агентам</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(agentStats).map((agent) => (
              <div
                key={agent.name}
                className="p-4 border border-neutral-100 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Bot className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{agent.name}</p>
                    <p className="text-xs text-neutral-600">{agent.platform}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Заказов:</span>
                    <span className="font-semibold text-neutral-900">{agent.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Выручка:</span>
                    <span className="font-semibold text-neutral-900">${agent.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Средний чек:</span>
                    <span className="font-semibold text-neutral-900">
                      ${Math.round(agent.revenue / agent.orders)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-neutral-900">Детализация заказов</h3>
          <span className="text-sm text-neutral-600">Найдено: {filteredOrders.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата/Время</th>
                <th>Платформа</th>
                <th>Источник</th>
                <th>Агент</th>
                <th>Клиент</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="font-medium text-primary-600">{order.id}</span>
                  </td>
                  <td>
                    <div>
                      <div className="text-neutral-900">{order.date}</div>
                      <div className="text-xs text-neutral-500">{order.time}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Store size={14} className="text-neutral-400" />
                      <span>{order.platform}</span>
                    </div>
                  </td>
                  <td>
                    {order.agent ? (
                      <span className="badge-info">AI Agent</span>
                    ) : (
                      <span className="badge-warning">Web</span>
                    )}
                  </td>
                  <td>
                    {order.agent ? (
                      <div className="flex items-center gap-2">
                        <Bot size={14} className="text-primary-600" />
                        <span className="text-sm">{order.agent}</span>
                      </div>
                    ) : (
                      <span className="text-neutral-400 text-sm">—</span>
                    )}
                  </td>
                  <td>
                    <span className="text-sm text-neutral-600">{order.customer}</span>
                  </td>
                  <td>
                    <span className="font-semibold text-neutral-900">${order.amount}</span>
                  </td>
                  <td>
                    <span
                      className={
                        order.status === 'completed' ? 'badge-success' : 'badge-warning'
                      }
                    >
                      {order.status === 'completed' ? 'Выполнен' : 'В обработке'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

