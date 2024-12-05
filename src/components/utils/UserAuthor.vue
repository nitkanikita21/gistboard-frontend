<script setup lang="ts">
import type { User } from '@/types/model'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import { Shield, ShieldPlus } from 'lucide-vue-next'
import { onMounted } from 'vue'

const props = defineProps<{
  user: User | null
}>()
</script>

<template>
  <div class="flex flex-row gap-2 items-center" v-if="props.user">
    <Avatar class="h-8 w-8 rounded-full shrink-0 overflow-hidden">
      <AvatarImage :src="props.user.avatarUrl" alt="{username}" />
      <AvatarFallback>{{ props.user.username.charAt(0) }}</AvatarFallback>
    </Avatar>
    <span
      v-if="props.user.roles.includes('ADMIN')"
      class="font-medium text-orange-600 flex flex-row gap-1 items-center"
    >
      <ShieldPlus :size="18" /> {{ props.user.username }}
    </span>
    <span
      v-else-if="props.user.roles.includes('MODERATOR')"
      class="font-medium text-green-600 flex flex-row gap-1 items-center"
    >
      <Shield :size="18" /> {{ props.user.username }}
    </span>
    <span v-else class="font-medium">
      {{ props.user.username }}
    </span>
  </div>
</template>
