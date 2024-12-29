// 导入视图
import App from '../App'; // 主视图
import Register from '../pages/register'; // 注册视图
import Login from '../pages/login'; // 登录视图
import UserAgreement from '../components/UserAgreement'; // 用户协议视图
import PrivacyPolicy from '../components/PrivacyPolicy'; // 隐私政策视图
import HomeView from '../pages/home'; // 首页视图

// 蒙版路径
const maskArray = [
    {
        path: 'userAgreement',
        element: <UserAgreement />
    },
    {
        path: 'privacyPolicy',
        element: <PrivacyPolicy />
    }
];

// 配置路由表(URL跟视图一一对应)
const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'register',
                element: <Register />,
                children: maskArray
            },
            {
                path: 'login',
                element: <Login />,
                children: maskArray
            },
        ]
    },
    {
        path: '/home',
        element: <HomeView />
    }
]

// 导出路由表
export default routes;