import { useState, useEffect } from 'react'
import { Wallet, ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react'
import { platformAPI } from '../services/api'
import BalanceCard from '../components/payments/BalanceCard'
import TransactionList from '../components/payments/TransactionList'

export default function PaymentsPage() {
  const [merchantId, setMerchantId] = useState(null)
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedId = localStorage.getItem('merchant_id')
    if (storedId) {
      setMerchantId(parseInt(storedId))
    } else {
      window.location.href = '/register'
    }
  }, [])

  useEffect(() => {
    if (merchantId) {
      loadData()
      const interval = setInterval(loadData, 3000)
      return () => clearInterval(interval)
    }
  }, [merchantId])

  const loadData = async () => {
    if (!merchantId) return
    
    try {
      setLoading(true)
      const [balanceData, transactionsData] = await Promise.all([
        platformAPI.getMerchantBalance(merchantId),
        platformAPI.getTransactions({ merchant_id: merchantId, limit: 50 })
      ])
      setBalance(balanceData)
      setTransactions(transactionsData.transactions || [])
    } catch (error) {
      console.error('Failed to load payments data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Payments</h1>
          <p className="text-neutral-600 mt-1">Balance and transaction management</p>
        </div>
      </div>

      {/* Balance Card */}
      <BalanceCard balance={balance} loading={loading} />

      {/* Transactions */}
      <TransactionList transactions={transactions} loading={loading} />
    </div>
  )
}

