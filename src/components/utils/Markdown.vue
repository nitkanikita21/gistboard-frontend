<template>
  <main
    v-html="html"
    :class="
      cn([
        'dark:prose-invert prose max-w-max',
        'prose-img:my-0 prose-img:inline-block',
        'prose-h1:block prose-h1:items-center',
        'prose-a:inline prose-a:text-primary prose-a:underline-offset-4 prose-a:font-medium',
        'prose-code:after:content-none prose-code:before:content-none',
      ])
    "
  ></main>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  html: string | null
}>()
</script>
