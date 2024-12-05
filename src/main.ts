import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { gsap } from 'gsap'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import hljs from 'highlight.js'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import i18n from './i18n'




const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(i18n)
app.use(router)
app.use(hljsVuePlugin)

app.mount('#app')
