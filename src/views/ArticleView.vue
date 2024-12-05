<script setup lang="ts">
import { apiClient } from '@/axios'
import Markdown from '@/components/utils/Markdown.vue'
import Card from '@/components/ui/card/Card.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import UserAuthor from '@/components/utils/UserAuthor.vue'
import { useAuthStore } from '@/stores/authStore'
import type { Article } from '@/types/model'
import { computeMarkdown } from '@/utils/computeMarkdown'
import { useQuery } from '@tanstack/vue-query'
import { useClipboard, useTitle } from '@vueuse/core'
import gsap from 'gsap'
import { Calendar, Check, Edit, Eye, Link2, Lock, Trash, Trash2 } from 'lucide-vue-next'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { toast } from '@/components/ui/toast'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const { t } = useI18n()

const { id } = route.params

const { data, refetch } = useQuery({
  queryKey: ['article', id],
  queryFn: () =>
    apiClient
      .get(`/article/${encodeURIComponent(id.toString())}`)
      .then((res) => res.data as Article),
})

const { d } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

const markdown = computeMarkdown(() => data.value?.content.replace(/\\n/gm, '\n') ?? '', {
  gfm: true,
})

const { copy, copied, isSupported } = useClipboard()

function copyLink() {
  copy(window.location.href)
  if (!isSupported) {
    toast({
      title: t('toast.copy.isNotSupported'),
    })
  }
}

function deleteArticle() {
  apiClient.delete(`article/${id}/delete`)
  router.push('/')
}

onMounted(() => {
  apiClient.post(`article/${id}/view`)
  refetch()
})

const canModerate = computed(() => {
  return data.value?.author.id == auth.user?.id || auth.user?.roles.includes('MODERATOR')
})
const canEdit = computed(() => {
  return data.value?.author.id == auth.user?.id || auth.user?.roles.includes('ADMIN')
})

const title = computed(() => `${data.value?.title ?? 'Loading...'} | GistBoard`)
useTitle(title)
</script>

<template>
  <div class="flex flex-row gap-6 pb-16" v-if="data">
    <Card class="p-6 w-full">
      <Markdown :html="markdown" />
    </Card>
    <div class="w-fit min-w-96">
      <Card class="p-6 flex flex-col space-y-4">
        <CardTitle class="font-bold flex flex-row justify-between items-center gap-4">
          <span class="flex flex-row gap-2">
            <Lock v-if="data.private" class="text-red-500" />
            {{ data?.title }}
          </span>
          <div class="grid gap-2 grid-flow-col">
            <Link2 class="cursor-pointer" v-if="!copied" :onclick="copyLink" />
            <Check v-else-if="copied" class="text-green-500" />
            <Trash2 @click="deleteArticle" v-if="canModerate" class="text-red-500 cursor-pointer" />
            <RouterLink :to="`/article/${id}/update`">
              <Edit v-if="canEdit" class="cursor-pointer" />
            </RouterLink>
          </div>
        </CardTitle>
        <UserAuthor :user="data!!.author" />
        <div class="flex flex-row gap-2 justify-between">
          <div class="flex flex-row gap-1 items-center text-muted-foreground font-semibold text-sm">
            <Calendar :size="16" :stroke-width="2.75" />
            {{ d(new Date(data.createdAt), 'short') }}
          </div>
          <div class="flex flex-row gap-1 items-center text-muted-foreground font-semibold">
            <Eye :size="16" :stroke-width="2.75" />
            {{ data.views }}
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
