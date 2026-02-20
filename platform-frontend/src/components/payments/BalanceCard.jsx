import { Wallet, DollarSign, TrendingUp, Clock } from 'lucide-react'

export default function BalanceCard({ balance, loading = false }) {
  if (loading) {
    return (
      <div className="card-gradient relative overflow-hidden">
        <div className="animate-pulse">
          <div className="h-32 bg-white/20 rounded"></div>
        </div>
      </div>
    )
  }

  const availableUsd = parseFloat(balance?.available_usd || 0)
  const availableKgs = parseFloat(balance?.available_kgs || 0)
  const pendingUsd = parseFloat(balance?.pending_usd || 0)
  const pendingKgs = parseFloat(balance?.pending_kgs || 0)
  const totalReceivedUsd = parseFloat(balance?.total_received_usd || 0)
  const totalFeesUsd = parseFloat(balance?.total_fees_usd || 0)

  return (
    <div className="space-y-4">
      {/* Main Balance Card */}
    <div className="card-gradient relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Wallet size={24} className="text-white" />
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Доступно</p>
              <p className="text-2xl font-bold text-white">
                ${availableUsd.toFixed(2)}
              </p>
              <p className="text-white/80 text-sm mt-1">
                {availableKgs.toFixed(2)} KGS
              </p>
            </div>
          </div>
          
          {(pendingUsd > 0 || pendingKgs > 0) && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Clock size={14} />
                <span>В обработке: ${pendingUsd.toFixed(2)} / {pendingKgs.toFixed(2)} KGS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-success-600" size={18} />
            <p className="text-xs text-neutral-600">Всего получено</p>
          </div>
          <p className="text-xl font-bold text-neutral-900">
            ${totalReceivedUsd.toFixed(2)}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-neutral-400" size={18} />
            <p className="text-xs text-neutral-600">Комиссии</p>
          </div>
          <p className="text-xl font-bold text-neutral-900">
            ${totalFeesUsd.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}



