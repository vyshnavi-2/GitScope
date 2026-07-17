import axios from 'axios'
import {
  API_BASE_URL,
  API_TIMEOUT,
  GITHUB_API_VERSION,
} from '../constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  },
})

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'

    return Promise.reject({
      status: error.response?.status ?? null,
      message,
      originalError: error,
    })
  },
)

export default api
