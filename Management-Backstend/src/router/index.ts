import { createWebHashHistory, createRouter } from 'vue-router';

// 导入图标信息
import logo from '../assets/images/peacock_flat.png';

const routes: any = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/ErrorPages.vue'), // 404页面
    },
    {
        path: '/',
        redirect: '/start',
    },
    {
        path: '/start',
        name: 'Start',
        component: () => import('../views/StartPages.vue'), // 起始页
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            breadcrumb:'首页'
        },
        component: () => import('../views/HomePages.vue'), // 主页
        children: [
            {
                path: 'systemInfo',
                component: () => import('../views/Modules/System/SysteminfoPages.vue'), // 系统信息
                meta: {
                    breadcrumb: '系统信息',
                    icon: logo
                },
            },
            {
                path: 'serverStatus',
                component: () => import('../views/Modules/System/ServerstatusPages.vue'), // 系统状态
                meta: {
                    breadcrumb: '系统状态',
                    icon: logo
                },
            },
            {
                path: 'systemLog',
                component: () => import('../views/Modules/System/LogmanagementPages.vue'), // 系统日志
                meta: {
                    breadcrumb: '系统日志',
                    icon: logo
                },
            },
            {
                path: 'about',
                component: () => import('../views/Modules/About/AboutPages.vue'), // 关于
                meta: {
                    breadcrumb: '关于',
                    icon: logo
                }
            },
            {
                path: 'contactus',
                component: () => import('../views/Modules/About/ContactusPages.vue'), // 联系我们
                meta: {
                    breadcrumb: '联系我们',
                    icon: logo
                }
            },
            {
                path: 'userInfo',
                component: () => import('../views/Modules/User/UserinfoPages.vue'), // 用户信息
                meta: {
                    breadcrumb: '用户信息',
                    icon: logo
                }
            }
        ]
    }
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;