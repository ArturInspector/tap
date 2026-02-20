import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react'

export default function TAPStatusBadge({ verified, agentId = null }) {
  if (verified) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
        <ShieldCheck size={14} className="text-green-600" />
        <span className="text-sm font-medium text-green-700">TAP Verified</span>
        {agentId && (
          <span className="text-xs text-green-600">({agentId})</span>
        )}
      </div>
    )
  }

  if (verified === false) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
        <ShieldAlert size={14} className="text-yellow-600" />
        <span className="text-sm font-medium text-yellow-700">Not Verified</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg">
      <Shield size={14} className="text-neutral-400" />
      <span className="text-sm font-medium text-neutral-600">No TAP</span>
    </div>
  )
}



