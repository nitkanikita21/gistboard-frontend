import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCallbackUriStore = defineStore('callbackUri', () => {
  const callbackUrl = ref<string>('/')

  function setCallbackUrl(url: string | null) {
    callbackUrl.value = url ?? '/'
  }

  return { callbackUrl, setCallbackUrl }
})
