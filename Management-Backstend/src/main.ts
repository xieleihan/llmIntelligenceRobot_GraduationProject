// 导入vue
import { createApp } from 'vue';
// 导入全局样式
import './style.css';
// 导入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 导入根页面
import App from './App.vue';
// 导入路由表
import router from './router';
// 导入flexible
import 'amfe-flexible';
// 导入存储库
import store from './store/index';

// createApp(App).mount('#app')
const app = createApp(App);

// 使用element-plus
app.use(ElementPlus);
// 使用路由
app.use(router);
// 使用存储库
app.use(store);

// 挂载
app.mount('#app');
