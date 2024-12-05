<script setup lang="ts">
import { apiClient } from '@/axios'
import type { PageDTO } from '@/types/dto'
import type { Article } from '@/types/model'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import NoteCard from './NoteCard.vue'
import { LoaderCircle, ServerCrash } from 'lucide-vue-next'
import { size } from 'lodash'
import { useDebounceFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    size: number
    url: string
    sort?: string
    query?: string
  }>(),
  {
    sort: 'id,ASC',
  },
)

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  isError,
  refetch
} = useInfiniteQuery({
  queryKey: ['notes'],
  initialPageParam: 0,
  retryDelay: 1000,
  queryFn: ({ pageParam }) => {
    const params = new URLSearchParams()
    params.append('page', pageParam.toString())
    params.append('size', props.size.toString())
    params.append('sort', props.sort)
    if (props.query) params.append('query', props.query)

    return apiClient
      .get(`${props.url}?${params.toString()}`)
      .then((d) => d.data as PageDTO<Article>)
  },
  getNextPageParam: (lastPage, allPages) => {
    return allPages.length <= lastPage.page.totalPages ? lastPage.page.number + 1 : undefined
  },
  getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
    return firstPageParam - 1
  },
})

const debounceRefetch = useDebounceFn(refetch, 500)

watch(
  () => [props.sort, props.query],
  () => {
    console.log('REFETCH')
    debounceRefetch()
  },
)

function fetchNextPageDebounce() {
  if (!hasNextPage.value || isFetchingNextPage.value) return
  fetchNextPage()
}

onMounted(() => {
  window.addEventListener('scroll', fetchNextPageDebounce)
})

onUnmounted(() => {
  window.removeEventListener('scroll', fetchNextPageDebounce)
})

const emit = defineEmits<{
  (e: 'totalElements', value: number): void
}>()

watch(
  () => data.value,
  () => {
    const total = data.value?.pages[0].page.totalElements
    if (flatNotes.value.length <= 0) {
      emit('totalElements', 0)
    } else if (total) {
      emit('totalElements', total)
    }
  },
)

const flatNotes = computed(() => data.value?.pages.map((dto) => dto.content).flat() ?? [])
</script>

<template>
  <div v-if="isPending" class="flex flex-col items-center w-full">
    <span class="text-md flex flex-row items-center gap-2 my-6">
      <LoaderCircle class="animate-spin" :size="24" /> Loading...
    </span>
  </div>
  <span v-else-if="isError" class="py-6 flex flex-col gap-2 items-center">
    <ServerCrash class="text-primary" :size="48" /> {{ t('notes.list.error') }}
    <span>
      {{ error!!.message }}
    </span>
  </span>
  <div v-else-if="data">
    <div class="grid grid-cols-1 lg:mx-0 mx-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-2">
      <NoteCard v-for="note in flatNotes" :key="note.id" :data="note" />
    </div>
    <div class="w-full flex flex-col items-center my-6">
      <button @click="() => fetchNextPage()" :disabled="!hasNextPage || isFetchingNextPage">
        <span v-if="isFetchingNextPage" class="text-md flex flex-row items-center gap-2">
          <LoaderCircle class="animate-spin" :size="24" /> Loading...
        </span>
      </button>
    </div>
  </div>
</template>
