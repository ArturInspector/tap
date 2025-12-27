import axios from 'axios'

const API_BASE = 'http://localhost:8003'

export const platformAPI = {
  // Merchants
  getMerchant: async (merchantId) => {
    const response = await axios.get(`${API_BASE}/merchants/${merchantId}`)
    return response.data
  },

  // Integrations
  getIntegrations: async (merchantId) => {
    const response = await axios.get(`${API_BASE}/integrations/${merchantId}`)
    return response.data
  },

  setupShopify: async (merchantId, credentials) => {
    const response = await axios.post(`${API_BASE}/integrations/shopify/setup`, {
      merchantId,
      credentials
    })
    return response.data
  },

  // Analytics
  getAnalytics: async (merchantId, filters = {}) => {
    const response = await axios.get(`${API_BASE}/analytics/${merchantId}`, {
      params: filters
    })
    return response.data
  }
}

