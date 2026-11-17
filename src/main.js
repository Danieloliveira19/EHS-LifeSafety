import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Registra o Pinia (estado em memória) e o Vue Router na aplicação
app.use(createPinia())
app.use(router)

app.mount('#app')
