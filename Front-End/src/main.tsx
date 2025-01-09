import { createRoot } from 'react-dom/client'

// 引入移动端适配
import 'amfe-flexible'

// 引入公共样式
import './index.css'

// 导入路由内置组件
import { HashRouter } from 'react-router-dom'
// 导入项目配置的路由对象
import Router from './router/index'

// 导入Store
import store from './store/index'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <HashRouter>
      <Router />
    </HashRouter>
  </Provider>
)
