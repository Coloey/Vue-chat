import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router"
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
const app=createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
