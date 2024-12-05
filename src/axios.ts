import axios from 'axios'
import { useAuthStore } from './stores/authStore'
import Cookies from 'js-cookie'
import { useToast } from './components/ui/toast'
import i18n from './i18n'

export const apiClient = axios.create({
  baseURL: `${window.origin}/api`,
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (request) => {
    request.headers.set('Authorization', `Bearer ${Cookies.get('access_token')}`)
    return request
  },
  async (err) => {
    return Promise.reject(err)
  },
)

/* apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Якщо токен закінчився (наприклад, статус 401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Спробуємо оновити токен
      const authStore = useAuthStore()
      try {
        // Спробуємо оновити токен
        await authStore.refreshToken()
        // Повторно відправляємо запит з новим токеном
        return apiClient(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)
 */

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    console.log('Received error:', error)

    const authStore = useAuthStore()
    const toast = useToast()
    const { t } = i18n.global

    if (error.response.data.error) {
      toast.toast({
        title: t('toast.refresh_token_error'),
        description: error,
      })
      return Promise.reject(error)
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const authStore = useAuthStore()
      try {
        console.log('Attempting to refresh token...')
        await authStore.refreshToken()
        console.log('Token refreshed successfully.')
        return apiClient(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        toast.toast({
          title: t('toast.refresh_token_error'),
          description: refreshError instanceof Error ? refreshError.message : String(refreshError),
        })
        await authStore.logout(false)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
