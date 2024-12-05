<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import HeaderLayout from './components/layout/Header.vue'
import hljs from 'highlight.js'
import './assets/atom-one-dark.css'
import ToastProvider from './components/ui/toast/ToastProvider.vue'
import Toaster from './components/ui/toast/Toaster.vue'
import Footer from './components/layout/Footer.vue'
import AuthGuard from './router/AuthGuard.vue'

const route = useRoute()

hljs.highlightAll()
</script>

<template>
  <ToastProvider>
    <Toaster />
    <div class="flex flex-col w-full items-center text-white dark h-screen">
      <div
        v-if="route.meta.header"
        class="sticky top-0 z-10 w-full flex flex-col items-center border-b"
      >
        <HeaderLayout class="lg:w-[80vw]" />
      </div>
      <div class="flex flex-col lg:w-[80vw] w-full pt-4 flex-grow">
        <RouterView />
      </div>
      <Footer v-if="route.meta.header" />
      <AuthGuard v-if="route.meta.protected" />
    </div>
  </ToastProvider>
</template>

<style scoped></style>
