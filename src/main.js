import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router"

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/display.css'
const app=createApp(App)
app.use(ElementPlus)
app.use(store)
/*app.use(SocketIO,{
    connection:'http://127.0.0.1:3007'
})*/
app.use(router).mount('#app')
