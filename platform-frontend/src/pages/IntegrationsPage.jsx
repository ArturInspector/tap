import IntegrationCard from '../components/integrations/IntegrationCard'
import { Package, Plug } from 'lucide-react'

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'Shopify',
      status: 'active',
      description: 'mystore.myshopify.com',
      stats: { products: 50, orders: 12 },
      icon: Package,
    },
    {
      name: 'TAP Protocol',
      status: 'active',
      description: 'Agent ID: agent-123abc',
      stats: { agents: 1, transactions: 3 },
      icon: Plug,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-neutral-900">Интеграции</h2>
        <p className="text-neutral-600 mt-2">
          Управление подключенными платформами и настройка TAP Protocol
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.name} integration={integration} />
        ))}
      </div>
    </div>
  )
}

