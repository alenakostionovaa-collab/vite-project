import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
createApp(App)
  .use(router)   // 👈 ВОТ ЭТО ВАЖНО
  .mount('#app')
