import 'virtual:windi.css'
import { createApp } from 'vue'
import App from './App.vue'
import routers from './router/index'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import "ant-design-vue/dist/antd.less"
import message from 'ant-design-vue/es/message'
import Antd from 'ant-design-vue'

moment.locale('zh-cn')

const app = createApp(App)
const router = routers
app.config.productionTip = false

app.config.globalProperties.$message = message
app.provide('message', message)

app.use(Antd)
app.use(router).mount('#app')
