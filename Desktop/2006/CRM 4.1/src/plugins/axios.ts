// src/plugins/axios.ts
import axios from '@axios'

// Aircall API credentials
const AIRCALL_API_ID = '13aec6a05d57d14406558c002d2cec1b'
const AIRCALL_API_TOKEN = 'e58b1514878bea4326682bc7564e8ffb'

// Create a base64-encoded string of the API ID and Token
const auth = btoa(`${AIRCALL_API_ID}:${AIRCALL_API_TOKEN}`)

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.aircall.io/v1', // Aircall API base URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${auth}`, // Basic Auth header with encoded credentials
  },
})

// Optional: Add request and response interceptors
apiClient.interceptors.request.use(
  config => {
    // Modify request if needed
    return config
  },
  error => {
    // Handle request error
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  response => {
    // Process response data
    return response
  },
  error => {
    // Handle response error
    return Promise.reject(error)
  },
)

export default apiClient
