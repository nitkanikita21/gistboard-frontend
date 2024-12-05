<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import { Eye, Calendar, Lock } from 'lucide-vue-next'
import { computeMarkdown } from '@/utils/computeMarkdown'
import { useRouter } from 'vue-router'
import type { Article } from '@/types/model'
import UserAuthor from '@/components/utils/UserAuthor.vue'
import { truncateText } from '@/lib/utils'

const props = defineProps<{
  data: Article
}>()

const { d } = useI18n({
  inheritLocale: true,
  useScope: 'global',
})

const router = useRouter()

function pushToArticlePage() {
  router.push(`article/${props.data.id}`)
}

const markdown = computeMarkdown(
  () => truncateText(props.data.content, 150).replace(/\\n/gm, ' '),
  {
    breaks: true,
    gfm: true,
  },
)
</script>

<template>
  <Card
    :onclick="pushToArticlePage"
    class="cursor-pointer hover:scale-[1.01] transition-transform duration-300"
  >
    <CardHeader>
      <CardTitle class="flex flex-row justify-between items-center">
        <span class="flex flex-row gap-2">
          <Lock v-if="props.data.private" class="text-red-500" />
          {{ truncateText(props.data.title, 30) }}
        </span>
        <div class="flex flex-row gap-1 items-center text-muted-foreground font-semibold text-sm">
          <Calendar :size="16" :stroke-width="2.75" />
          {{ d(new Date(data.createdAt), 'short') }}
        </div>
      </CardTitle>
      <CardDescription><div v-html="markdown" class="fade h-10"></div></CardDescription>
    </CardHeader>
    <CardFooter class="flex flex-row justify-between text-sm items-center">
      <UserAuthor :user="data.author" class="flex flex-row items-center gap-2" />

      <div class="flex flex-row gap-1 items-center text-muted-foreground font-semibold">
        <Eye :size="16" :stroke-width="2.75" />
        {{ data.views }}
      </div>
    </CardFooter>
  </Card>
</template>
