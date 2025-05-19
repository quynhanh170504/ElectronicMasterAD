import axios from 'axios'
import { store } from '~/redux/store.js'

// Instance WITHOUT auth (for public requests)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// Instance WITH auth (for protected requests)
export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// Request interceptor: gắn accessToken vào header Authorization
apiAuth.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.user?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: chuyển hướng về /login nếu bị lỗi 401
apiAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
