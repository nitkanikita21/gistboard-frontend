<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Input from '../ui/input/Input.vue'
import Select from '../ui/select/Select.vue'
import SelectContent from '../ui/select/SelectContent.vue'
import SelectGroup from '../ui/select/SelectGroup.vue'
import SelectItem from '../ui/select/SelectItem.vue'
import SelectTrigger from '../ui/select/SelectTrigger.vue'
import SelectValue from '../ui/select/SelectValue.vue'
import NotesList from './NotesList.vue'
import { computed, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import { useDebounce, useStorage } from '@vueuse/core'
import Separator from '../ui/separator/Separator.vue'

const props = defineProps<{
  url: string
}>()

const sortBy = useStorage<'createdAt' | 'views' | 'id'>('sortBy', 'createdAt', localStorage)
const sortOrder = useStorage<'asc' | 'desc'>('sortOrder', 'asc', localStorage)
const query = defineModel<string | number | undefined>()

const sort = computed(() => `${sortBy.value},${sortOrder.value}`)

const { t } = useI18n()

const foundedCount = ref(0)
const foundedCountFormatted = computed(() =>
  t('notes.view.foundedCount', { count: foundedCount.value }),
)
</script>
<template>
  <div class="flex flex-col gap-6">
    <div class="w-full flex flex-row">
      <div class="relative w-full items-center grow">
        <Input
          v-model:model-value="query"
          type="search"
          placeholder="My cool title"
          class="border-r-0 rounded-r-none pl-10"
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>
      <Select v-model="sortBy">
        <SelectTrigger class="rounded-none w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="createdAt"> {{ t('notes.view.sortBy.date') }} </SelectItem>
            <SelectItem value="views"> {{ t('notes.view.sortBy.view') }} </SelectItem>
            <SelectItem value="id"> {{ t('notes.view.sortBy.id') }} </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select v-model="sortOrder">
        <SelectTrigger class="rounded-l-none w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="asc"> {{ t('notes.view.sortOrder.asc') }} </SelectItem>
            <SelectItem value="desc"> {{ t('notes.view.sortOrder.desc') }} </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Separator :label="foundedCountFormatted" />
    <NotesList
      :url="url"
      :size="20"
      :sort="sort"
      @total-elements="(n) => (foundedCount = n)"
      :query="query as string | undefined"
    />
  </div>
</template>
