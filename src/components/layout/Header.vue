<script setup lang="ts">
import { ClipboardPaste } from 'lucide-vue-next'
import LanguageSelector from '@/components/utils/LanguageSelector.vue'
import UserLogin from '@/components/utils/UserLogin.vue'
import Logo from '@/components/utils/Logo.vue'
</script>
<template>
  <nav class="flex flex-row justify-between py-4 bg-background">
    <Logo />
    <div class="flex flex-row gap-4 items-center">
      <UserLogin />
      <LanguageSelector />
    </div>
  </nav>
</template>
