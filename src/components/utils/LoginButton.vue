<template>
  <Button class="flex flex-row gap-1 items-center" @click="push">
    {{ t('header.login') }} <LogIn :size="18" />
  </Button>
</template>
<script setup lang="ts">
import { useCallbackUriStore } from '@/stores/callbackUri'
import { LogIn } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/button/Button.vue'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

const authStore = useCallbackUriStore()
const url = new URL(`${window.origin}/api/auth/login/discord`)

function push() {
  authStore.setCallbackUrl(window.location.pathname)
  window.location.href = url.toString()
}
</script>
