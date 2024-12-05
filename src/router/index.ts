import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SuccessLogin from '@/views/SuccessLogin.vue'
import ArticleView from '@/views/ArticleView.vue'
import CreateArticleView from '@/views/CreateArticleView.vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/components/ui/toast'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n'
import Button from '@/components/ui/button/Button.vue'
import LoginButton from '@/components/utils/LoginButton.vue'
import { h } from 'vue'
import UpdateArticleView from '@/views/UpdateArticleView.vue'
import MyProfileView from '@/views/MyProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        header: true,
        protected: false,
      },
    },
    {
      path: '/profile',
      name: 'my profile',
      component: MyProfileView,
      meta: {
        header: true,
        protected: true,
      },
    },
    {
      path: '/article/:id(\\d+)',
      name: 'article',
      component: ArticleView,
      meta: {
        header: true,
        protected: false,
      },
    },
    {
      path: '/article/:id(\\d+)/update',
      name: 'article update',
      component: UpdateArticleView,
      meta: {
        header: true,
        protected: false,
      },
    },
    {
      path: '/success',
      name: 'success login',
      component: SuccessLogin,
      meta: {
        header: false,
        protected: false,
      },
    },
    {
      path: '/article/create',
      name: 'create',
      component: CreateArticleView,
      meta: {
        header: true,
        protected: true,
      },
    },
  ],
})

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  const toast = useToast()
  const { t } = i18n.global

  console.log('ROUTER', from, to)
  console.log('AUTHENTICATED:', auth.isAuthenticated)

  // Якщо маршрут захищений і користувач не авторизований
  if (to.meta.protected && !auth.isAuthenticated) {
    toast.toast({
      title: t('toast.must_logined'),
      action: h(LoginButton),
    })

    // Блокуємо перехід
    return from.path
  }

  // Дозволяємо перехід
  return true
})

export default router

declare module 'vue-router' {
  interface RouteMeta {
    header?: boolean
    protected?: boolean
  }
}
