// 导入视图
import App from '../App'; // 主视图
import Register from '../pages/register'; // 注册视图
import Login from '../pages/login'; // 登录视图

// 配置路由表(URL跟视图一一对应)
const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    }
]

// 导出路由表
export default routes;