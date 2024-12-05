<script setup lang="ts">
import NotesView from '@/components/articles/NotesView.vue'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import UserAuthor from '@/components/utils/UserAuthor.vue'
import { useAuthStore } from '@/stores/authStore'
import { useI18n } from 'vue-i18n'

const { user } = useAuthStore()
const { t } = useI18n()
</script>

<template>
  <main class="pt-2 pb-16 gap-2 flex flex-col" v-if="user">
    <h1 class="text-4xl font-bold">{{ t('profile.my_profile') }}</h1>
    <NotesView url="/article/all/my" class="my-2" />
  </main>
</template>
