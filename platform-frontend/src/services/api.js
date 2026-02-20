// Mock API for demo (no backend calls)
const mockBalance = {
  merchant_id: 1,
  available_usd: 10250.0,
  available_kgs: 850000.0,
  pending_usd: 500.0,
  pending_kgs: 0.0,
  total_received_usd: 45000.0,
  total_fees_usd: 900.0
}

const baseTransactions = [
  { id: 1, amount_original: 150, currency_original: 'USD', tap_verified: true, tap_agent_id: 'chatgpt-4', status: 'completed', transaction_type: 'payment', fee_amount: 3, net_amount: 147, description: 'Payment from ChatGPT', created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 2, amount_original: 220, currency_original: 'USD', tap_verified: true, tap_agent_id: 'claude-3', status: 'completed', transaction_type: 'payment', fee_amount: 4.4, net_amount: 215.6, description: 'Payment from Claude', created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: 3, amount_original: 85, currency_original: 'USD', tap_verified: false, tap_agent_id: 'alexa-ai', status: 'completed', transaction_type: 'payment', fee_amount: 1.7, net_amount: 83.3, description: 'Payment from Alexa', created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: 4, amount_original: 300, currency_original: 'USD', tap_verified: true, tap_agent_id: 'gpt-4o', status: 'completed', transaction_type: 'payment', fee_amount: 6, net_amount: 294, description: 'Payment from GPT-4o', created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: 5, amount_original: 120, currency_original: 'USD', tap_verified: true, tap_agent_id: 'chatgpt-4', status: 'processing', transaction_type: 'payment', fee_amount: 2.4, net_amount: 117.6, description: 'Processing payment', created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: 6, amount_original: 175, currency_original: 'USD', tap_verified: false, tap_agent_id: 'claude-3', status: 'completed', transaction_type: 'payment', fee_amount: 3.5, net_amount: 171.5, description: 'Payment from Claude', created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { id: 7, amount_original: 95, currency_original: 'USD', tap_verified: true, tap_agent_id: 'alexa-ai', status: 'completed', transaction_type: 'payment', fee_amount: 1.9, net_amount: 93.1, description: 'Payment from Alexa', created_at: new Date(Date.now() - 1000 * 60 * 150).toISOString() },
  { id: 8, amount_original: 260, currency_original: 'USD', tap_verified: true, tap_agent_id: 'gpt-4o', status: 'completed', transaction_type: 'payment', fee_amount: 5.2, net_amount: 254.8, description: 'Payment from GPT-4o', created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
  { id: 9, amount_original: 140, currency_original: 'USD', tap_verified: false, tap_agent_id: 'chatgpt-4', status: 'completed', transaction_type: 'payment', fee_amount: 2.8, net_amount: 137.2, description: 'Payment pending verification', created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString() },
  { id: 10, amount_original: 180, currency_original: 'USD', tap_verified: true, tap_agent_id: 'claude-3', status: 'completed', transaction_type: 'payment', fee_amount: 3.6, net_amount: 176.4, description: 'Payment from Claude', created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString() }
]

let mockTransactions = [...baseTransactions]
let nextId = 11

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms))

export const platformAPI = {
  // Merchants (mock)
  createMerchant: async (merchantData) => {
    await delay()
    return { id: 1, ...merchantData }
  },

  getMerchant: async () => {
    await delay()
    return { id: 1, name: 'Demo Merchant', email: 'merchant@example.com' }
  },

  getMerchants: async () => {
    await delay()
    return { merchants: [{ id: 1, name: 'Demo Merchant', email: 'merchant@example.com' }], total: 1 }
  },

  // Payments (mock)
  getMerchantBalance: async () => {
    await delay()
    return mockBalance
  },

  processPayment: async (paymentData) => {
    await delay()
    const fee_amount = Number(paymentData.amount) * 0.02
    const net_amount = Number(paymentData.amount) - fee_amount
    const tx = {
      id: nextId++,
      transaction_type: 'payment',
      status: 'completed',
      amount_original: Number(paymentData.amount),
      currency_original: paymentData.currency || 'USD',
      amount_converted: null,
      currency_converted: null,
      fee_amount,
      net_amount,
      tap_verified: true,
      tap_agent_id: paymentData.tap_agent_id || 'demo-agent',
      description: paymentData.description || 'Test payment from mock agent',
      created_at: new Date().toISOString()
    }
    mockTransactions = [tx, ...mockTransactions].slice(0, 50)
    return tx
  },

  getTransactions: async () => {
    await delay()
    return {
      transactions: mockTransactions,
      total: mockTransactions.length,
      page: 1,
      limit: mockTransactions.length
    }
  },

  getTransaction: async (transactionId) => {
    await delay()
    return mockTransactions.find((t) => t.id === Number(transactionId))
  }
}


