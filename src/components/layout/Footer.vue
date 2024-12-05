<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Logo from '@/components/utils/Logo.vue'

const { t } = useI18n()
</script>

<template>
  <div class="border-t py-6 w-full items-center flex flex-col">
    <Logo :phrase="t('phrase')" />
  </div>
</template>
