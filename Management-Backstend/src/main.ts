import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import 'amfe-flexible'

// createApp(App).mount('#app')
const app = createApp(App);

app.use(ElementPlus)
app.use(router)

app.mount('#app')
