import { createRoot } from 'react-dom/client'

// 引入移动端适配
import 'amfe-flexible'

import './index.css'

// 导入路由内置组件
import { HashRouter } from 'react-router-dom'
// 导入项目配置的路由对象
import Router from './router/index'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Router />
  </HashRouter>
)
