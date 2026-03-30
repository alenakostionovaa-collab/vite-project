import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
const pinia = createPinia()
createApp(App)
  .use(pinia) // используем хранение
  .use(router)   // 👈 ВОТ ЭТО ВАЖНО
  .mount('#app')
