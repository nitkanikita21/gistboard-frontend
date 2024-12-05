<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useAuthStore } from '@/stores/authStore'
import { useCallbackUriStore } from '@/stores/callbackUri'
import { useTitle } from '@vueuse/core'
import { Check } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const redirectStore = useCallbackUriStore()
const authStore = useAuthStore()
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

const isManual = route.query.manual == 'true'

authStore.checkAuth()

if (!isManual) {
  setTimeout(() => {
    router.push(redirectStore.callbackUrl)
  }, 2000)
}
useTitle(`GistBoard`)
</script>

<template>
  <main class="flex flex-col justify-center items-center gap-4 flex-grow">
    <Check :size="48" class="size-52 text-primary" />
    <h1 v-if="isManual" class="text-white text-2xl w-4/12 text-center">{{ t('test') }}</h1>
    <h1 v-else class="text-white text-2xl w-4/12 text-center">{{ t('success.login') }}</h1>
    <Button v-if="isManual" :onclick="() => router.push(redirectStore.callbackUrl)">{{
      t('success.redirect_button')
    }}</Button>
  </main>
</template>
