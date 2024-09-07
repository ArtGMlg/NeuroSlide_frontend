import { createApp } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import Vue3ColorPicker from 'vue3-colorpicker'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import 'vue3-colorpicker/style.css'
import 'primeicons/primeicons.css'
import '@/assets/style.css'

createApp(App)
  .use(store)
  .use(router)
  .use(Vue3ColorPicker)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.my-app-dark',
      },
    },
  })
  .component('QuillEditor', QuillEditor)
  .mount('#app')
