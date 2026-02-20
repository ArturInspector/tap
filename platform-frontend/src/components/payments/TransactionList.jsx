import { useState } from 'react'
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle, Filter } from 'lucide-react'
import TAPStatusBadge from './TAPStatusBadge'

export default function TransactionList({ transactions = [], loading = false }) {
  const [filter, setFilter] = useState('all') // all, payment, withdrawal, tap_verified

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-neutral-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true
    if (filter === 'payment') return t.transaction_type === 'payment'
    if (filter === 'withdrawal') return t.transaction_type === 'withdrawal'
    if (filter === 'tap_verified') return t.tap_verified === true
    return true
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-600" />
      case 'failed':
        return <XCircle size={16} className="text-red-600" />
      default:
        return <Clock size={16} className="text-yellow-600" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершена'
      case 'failed':
        return 'Ошибка'
      case 'processing':
        return 'Обработка'
      default:
        return 'Ожидание'
    }
  }

  return (
    <div className="card border-0 shadow-lg ring-1 ring-black/5">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
        <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          Транзакции
          <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">{transactions.length}</span>
        </h3>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-neutral-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input text-sm"
          >
            <option value="all">Все</option>
            <option value="payment">Платежи</option>
            <option value="withdrawal">Выводы</option>
            <option value="tap_verified">TAP Verified</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-500">Нет транзакций</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-5 border border-neutral-100 rounded-xl hover:border-primary-200 hover:bg-neutral-50/50 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {transaction.transaction_type === 'payment' ? (
                    <div className="p-2 bg-green-50 rounded-lg">
                      <ArrowDownRight size={18} className="text-green-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <ArrowUpRight size={18} className="text-blue-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {transaction.transaction_type === 'payment' ? 'Платеж' : 'Вывод'}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {formatDate(transaction.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(transaction.status)}
                  <span className="text-sm text-neutral-600">
                    {getStatusText(transaction.status)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-neutral-600">Сумма: </span>
                    <span className="font-semibold text-neutral-900">
                      {transaction.currency_original === 'USD' ? '$' : ''}
                      {parseFloat(transaction.amount_original).toFixed(2)}{' '}
                      {transaction.currency_original}
                    </span>
                    {transaction.amount_converted && (
                      <span className="text-neutral-500 ml-2">
                        ({parseFloat(transaction.amount_converted).toFixed(2)} {transaction.currency_converted})
                      </span>
                    )}
                  </div>
                  {transaction.fee_amount > 0 && (
                    <div>
                      <span className="text-neutral-600">Комиссия: </span>
                      <span className="text-neutral-900">
                        ${parseFloat(transaction.fee_amount).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {transaction.tap_verified !== null && (
                    <TAPStatusBadge
                      verified={transaction.tap_verified}
                      agentId={transaction.tap_agent_id}
                    />
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-600">К получению</p>
                  <p className="font-bold text-neutral-900">
                    {transaction.currency_original === 'USD' ? '$' : ''}
                    {parseFloat(transaction.net_amount).toFixed(2)}{' '}
                    {transaction.currency_original}
                  </p>
                </div>
              </div>

              {transaction.description && (
                <div className="mt-2 pt-2 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500">{transaction.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

