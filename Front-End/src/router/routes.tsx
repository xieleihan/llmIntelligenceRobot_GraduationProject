// 导入视图
import App from '../App'; // 主视图
import Register from '../pages/register'; // 注册视图
import Login from '../pages/login'; // 登录视图
import UserAgreement from '../components/UserAgreement'; // 用户协议视图
import PrivacyPolicy from '../components/PrivacyPolicy'; // 隐私政策视图
import HomeView from '../pages/home'; // 首页视图
import ErrorView from '../pages/ErrorPages'; // 错误视图
import ContactUs from '../pages/Modules/home/ContactUs'; // 联系我们视图
import UserInfo from '../pages/Modules/home/UserInfo'; // 用户信息视图
import SettingPage from '../pages/Modules/home/SettingPage'; // 设置视图
import AuthorizationPages from '../pages/Modules/home/AuthorizationPages'; // 授权视图
import FilePages from '../pages/Modules/home/FilePages'; // 文件视图
import PayPages from '../pages/Modules/home/PayPages';

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
    },
    {
        path: '/contact',
        element: <ContactUs />
    },
    {
        path: '/userinfo',
        element: <UserInfo />
    },
    {
        path: '/setting',
        element: <SettingPage />
    },
    {
        path: '/authorization',
        element: <AuthorizationPages />
    },
    {
        path: '/file',
        element: <FilePages />
    },
    {
        path: '/pay',
        element: <PayPages />
    },
    {
        path: '*',
        element: <ErrorView />,
    },
]

// 导出路由表
export default routes;