import { useState, useEffect } from 'react'
import { TrendingUp, ShoppingCart, Zap, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'
import { platformAPI } from '../services/api'
import BalanceCard from '../components/payments/BalanceCard'
import TransactionList from '../components/payments/TransactionList'

export default function DashboardPage() {
  const [merchantId, setMerchantId] = useState(1)
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedId = localStorage.getItem('merchant_id')
    if (storedId) setMerchantId(parseInt(storedId))

    loadData()
    const interval = setInterval(loadData, 3000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      const [balanceData, transactionsData] = await Promise.all([
        platformAPI.getMerchantBalance(merchantId),
        platformAPI.getTransactions({ merchant_id: merchantId, limit: 50 })
      ])
      
      setBalance(balanceData)
      setTransactions(transactionsData.transactions || [])
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const tapVerifiedCount = transactions.filter(t => t.tap_verified).length
  const totalVolume = transactions.reduce((sum, t) => sum + parseFloat(t.amount_original || 0), 0)

  const metrics = [
    { 
      label: 'Транзакции за сегодня', 
      value: transactions.length.toString(), 
      change: tapVerifiedCount > 0 ? `${Math.round((tapVerifiedCount / transactions.length) * 100)}% Verified` : '0%',
      trend: 'up',
      icon: ShoppingCart, 
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Активные AI агенты', 
      value: '3', 
      change: 'ChatGPT, Claude, Alexa',
      trend: 'neutral',
      icon: Zap, 
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Сэкономлено времени', 
      value: '12ч', 
      change: 'по сравнению с ручным',
      trend: 'up',
      icon: TrendingUp, 
      gradient: 'from-green-500 to-green-600'
    },
    { 
      label: 'Выручка за сегодня', 
      value: '$' + totalVolume.toFixed(0), 
      change: (balance?.available_kgs?.toFixed(0) || '0') + ' KGS',
      trend: 'up',
      icon: Wallet, 
      gradient: 'from-orange-500 to-orange-600'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Balance Card */}
      <BalanceCard balance={balance} loading={loading} />

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

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-neutral-900">Последние транзакции</h3>
        </div>
        <TransactionList transactions={transactions.slice(0, 10)} loading={loading} />
      </div>
    </div>
  )
}
