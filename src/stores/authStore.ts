import { apiClient } from '@/axios'
import { useToast } from '@/components/ui/toast'
import i18n from '@/i18n'
import type { User } from '@/types/model'
import Cookies from 'js-cookie'
import { Cookie } from 'lucide-vue-next'
import { defineStore } from 'pinia'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCookies } from '@vueuse/integrations/useCookies'
import { StorageSerializers, useLocalStorage, useStorage } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()
  const { t } = i18n.global
  const router = useRouter()

  const user = useStorage<User | null>('user', null, localStorage, {
    serializer: StorageSerializers.object,
  })
  const cookies = useCookies(['access_token'], {
    autoUpdateDependencies: true,
  })
  const authToken = cookies.get('access_token')

  const isAuthenticated = computed(() => {
    return user.value != null && authToken != null
  })

  function clearAuthInfo() {
    user.value = null
    cookies.remove('access_token')
    toast.toast({
      title: t('toast.logout'),
    })
    if (router.currentRoute.value.meta.protected) {
      router.push('/')
    }
  }
  // Перевіряємо, чи користувач аутентифікований
  const checkAuth = async () => {
    try {
      // Спробуємо отримати доступ до ресурсу
      const response = await apiClient.get('/auth/user')
      user.value = response.data
    } catch (error) {
      clearAuthInfo()
      console.error(error)
      toast.toast({
        title: t('toast.unknown_error'),
        description: error as string,
      })
    }
  }

  // Логаут користувача
  const logout = async (showToast: boolean = true) => {
    try {
      clearAuthInfo()
    } catch (error) {
      console.error('Logout failed:', error)
      if(showToast)toast.toast({
        title: t('toast.logout_error'),
        description: error as string,
      })
    }
  }

  // Оновлення токену за допомогою refresh token
  const refreshToken = async () => {
    try {
      await apiClient.post('/auth/refresh')
      // Після оновлення токену перевіряємо автентифікацію
      await checkAuth()
    } catch (error) {
      console.error('Token refresh failed:', error)
      toast.toast({
        title: t('toast.refresh_token_error'),
        description: error as string,
      })
      await logout(false)
    }
  }

  function pushToLogin() {
    window.location.href = `${window.origin}/api/auth/login/discord`
  }

  return {
    isAuthenticated,
    user,
    logout,
    checkAuth,
    refreshToken,
    pushToLogin,
    // authToken,
  }
})
