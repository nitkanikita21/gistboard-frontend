<script setup lang="ts">
import { ClipboardPaste, SquareCode } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

defineProps<{
  phrase?: string
}>()
</script>

<template>
  <RouterLink to="/" class="flex flex-row gap-2 items-center text-primary">
    <SquareCode v-if="phrase" :size="48" />
    <SquareCode v-else :size="38" />
    <div class="flex flex-col justify-center">
      <span class="text-xl font-bold">GistBoard</span>
      <span v-if="phrase" class="text-sm text-secondary-foreground">{{ phrase }}</span>
    </div>
  </RouterLink>
</template>
