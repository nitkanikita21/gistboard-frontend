<script setup lang="ts">
import LoginButton from '@/components/utils/LoginButton.vue'
import { useAuthStore } from '@/stores/authStore'
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import Button from '@/components/ui/button/Button.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuLabel from '@/components/ui/dropdown-menu/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue'
import { ChevronDown, ChevronUp, Files, LogOut, Plus, User } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import UserAuthor from '@/components/utils/UserAuthor.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function logout() {
  await authStore.logout()
}
function toProfile() {
  router.push('/profile')
}
function toCreateGist() {
  router.push('/article/create')
}

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
})

const toggleState = ref(false)

console.log(authStore.user)
</script>

<template>
  <DropdownMenu v-if="authStore.isAuthenticated" v-model:open="toggleState">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" className="flex items-center space-x-2 px-2 py-1.5">
        <UserAuthor :user="authStore.user!!" />
        <ChevronDown v-if="toggleState" />
        <ChevronUp v-else />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuLabel>{{ t('header.menu.title') }}</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem :onclick="toCreateGist">
        <Plus className="mr-2 h-4 w-4" />
        <span>{{ t('header.menu.create') }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem :onclick="toProfile">
        <Files className="mr-2 h-4 w-4" />
        <span>{{ t('header.menu.all_acticles') }}</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        class="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-950"
        :onclick="logout"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>{{ t('header.menu.logout') }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <LoginButton v-else />
</template>
