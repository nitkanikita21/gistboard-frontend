<script setup lang="ts">
import NotesList from '@/components/articles/NotesList.vue'
import NotesView from '@/components/articles/NotesView.vue'
import { useTitle } from '@vueuse/core'

useTitle(`GistBoard`)
</script>

<template>
  <main>
    <NotesView url="/article/all" class="my-2" />
  </main>
</template>
