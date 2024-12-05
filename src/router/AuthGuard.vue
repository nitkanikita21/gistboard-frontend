<script setup lang="ts">
import { useToast } from '@/components/ui/toast'
import { useAuthStore } from '@/stores/authStore'
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()
const toast = useToast()
const { t } = useI18n()

let task: string | number | NodeJS.Timeout | undefined

onMounted(() => {
  task = setInterval(() => {
    if (route.meta.protected && !auth.isAuthenticated) {
      router.push('/')
    }
  }, 100)
})

onUnmounted(() => {
  clearInterval(task)
})
</script>

<template></template>
