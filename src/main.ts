import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import dotenv from 'dotenv'

dotenv.config()

createApp(App).use(store).use(router).mount('#app')
