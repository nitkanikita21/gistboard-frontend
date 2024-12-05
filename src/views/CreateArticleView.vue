<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { z } from 'zod'
import { FormField } from '@/components/ui/form'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormDescription from '@/components/ui/form/FormDescription.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import { computeMarkdown } from '@/utils/computeMarkdown'
import Card from '@/components/ui/card/Card.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import Tabs from '@/components/ui/tabs/Tabs.vue'
import TabsList from '@/components/ui/tabs/TabsList.vue'
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue'
import TabsContent from '@/components/ui/tabs/TabsContent.vue'
import Markdown from '@/components/utils/Markdown.vue'
import ResizablePanelGroup from '@/components/ui/resizable/ResizablePanelGroup.vue'
import { ResizablePanel } from '@/components/ui/resizable'
import ResizableHandle from '@/components/ui/resizable/ResizableHandle.vue'
import { Plus } from 'lucide-vue-next'
import { computed } from 'vue'
import axios from 'axios'
import type { Article } from '@/types/model'
import _ from 'lodash'
import { apiClient } from '@/axios'
import { useTitle } from '@vueuse/core'

const router = useRouter()
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string({ message: t('create.fields.title.required.req') })
      .min(1, { message: t('create.fields.title.required.min', { min: 1 }) })
      .max(36, { message: t('create.fields.title.required.max', { max: 36 }) }),
    content: z
      .string({ message: t('create.fields.content.required.req') })
      .min(1, { message: t('create.fields.content.required.min', { min: 1 }) })
      .max(6_000, { message: t('create.fields.content.required.max', { max: 6_000 }) }),
    isPrivate: z.boolean().default(true),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  const response = await apiClient.post<Article>('/article/new', values)
  router.push(`/article/${response.data.id}`)
})

const markdown = computeMarkdown(() => form.values.content?.replace(/\\n/gm, '\n') ?? '', {
  gfm: true,
})

const rowsTextarea = computed(() =>
  _.clamp((form.values.content ?? '').split('\n').length, 16, 999999999),
)

const title = computed(
  () =>
    `${form.values.title == null || form.values.title == '' ? 'Untitled' : form.values.title} | GistBoard`,
)
useTitle(title)
</script>

<template>
  <main class="pt-2 pb-16">
    <form @submit="onSubmit" class="flex flex-col gap-2">
      <!-- Title -->
      <FormField v-slot="{ componentField }" name="title">
        <FormItem class="flex-none w-1/3">
          <FormLabel>{{ t('create.fields.title.name') }}</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Examples" v-bind="componentField" />
          </FormControl>
          <FormDescription> {{ t('create.fields.title.description') }} </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <div></div>

      <!-- IsPrivate -->
      <FormField v-slot="{ componentField }" name="isPrivate">
        <FormItem
          class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4 flex-none w-1/3"
        >
          <FormControl>
            <Checkbox v-bind:default-checked="false" v-bind="componentField" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel>{{ t('create.fields.isPrivate.name') }}</FormLabel>
            <FormDescription> {{ t('create.fields.isPrivate.description') }} </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <!-- Content -->
      <FormField v-slot="{ componentField }" name="content">
        <FormItem class="">
          <FormLabel>{{ t('create.fields.content.name') }}</FormLabel>
          <ResizablePanelGroup direction="horizontal" class="border rounded-md">
            <ResizablePanel :min-size="24" class="h-fit">
              <FormControl class="h-fit">
                <Textarea
                  :rows="rowsTextarea"
                  v-bind="componentField"
                  class="border-0 resize-none rounded-none"
                  placeholder="# Hello world!"
                />
              </FormControl>
            </ResizablePanel>
            <ResizableHandle with-handle />
            <ResizablePanel class="p-6">
              <Markdown :html="markdown" />
            </ResizablePanel>
          </ResizablePanelGroup>
          <div class="space-y-1 leading-none">
            <FormDescription> {{ t('create.fields.content.description') }} </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <div>
        <Button type="submit">
          <Plus />
          {{ t('create.submit') }}
        </Button>
      </div>
    </form>
  </main>
</template>
