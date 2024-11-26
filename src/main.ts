/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { vMaska } from "maska"

const app = createApp(App).directive("maska", vMaska)

registerPlugins(app)

app.mount('#app')
