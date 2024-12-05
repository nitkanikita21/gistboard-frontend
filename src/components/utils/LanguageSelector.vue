<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import UkFlag from '@/assets/ukFlag.svg?component'
import EnFlag from '@/assets/gbFlag.svg?component'
// import EnFlag from 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ec-1f1e7.svg?component'

const { locale } = useI18n()

const isTranslated = ref(locale.value == 'uk')

function change() {
  isTranslated.value = !isTranslated.value

  locale.value = isTranslated.value ? 'uk' : 'en'
}
</script>

<template>
  <div
    class="active:scale-95 active:translate-y-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
  >
    <EnFlag @click="change" v-if="isTranslated" class="w-6" />
    <UkFlag @click="change" v-else class="w-6" />
  </div>
</template>
