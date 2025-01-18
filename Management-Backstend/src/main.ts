// 导入vue
import { createApp } from 'vue';
// 导入全局样式
import './style.css';
// 导入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入根页面
import App from './App.vue';
// 导入路由表
import router from './router';
// 导入flexible
import 'amfe-flexible';
// 导入存储库
import store from './store/index';
// 引入Echarts
import * as echarts from 'echarts'

const app = createApp(App);
// createApp(App).mount('#app')

// echarts挂载到全局
app.config.globalProperties.$echarts = echarts
// 使用element-plus
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 使用路由
app.use(router);
// 使用存储库
app.use(store);

// 挂载
app.mount('#app');
