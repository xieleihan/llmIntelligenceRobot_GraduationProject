import { createWebHashHistory, createRouter } from 'vue-router';

// 导入图标信息
import logo from '../assets/images/peacock_flat.png';

// 导入工具
import { getCookie } from '../utils/index';

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
            breadcrumb: '首页',
            requiresAuth: true
        },
        component: () => import('../views/HomePages.vue'), // 主页
        children: [
            {
                path: 'systemInfo',
                component: () => import('../views/Modules/System/SysteminfoPages.vue'), // 系统信息
                meta: {
                    breadcrumb: '系统信息',
                    icon: logo,
                    requiresAuth: true
                },
            },
            {
                path: 'serverStatus',
                component: () => import('../views/Modules/System/ServerstatusPages.vue'), // 系统状态
                meta: {
                    breadcrumb: '系统状态',
                    icon: logo,
                    requiresAuth: true
                },
            },
            {
                path: 'systemLog',
                component: () => import('../views/Modules/System/LogmanagementPages.vue'), // 系统日志
                meta: {
                    breadcrumb: '系统日志',
                    icon: logo,
                    requiresAuth: true
                },
            },
            {
                path: 'changeApi',
                component: () => import('../views/Modules/System/ChangeApikeypages.vue'), // API管理
                meta: {
                    breadcrumb: 'API管理',
                    icon: logo,
                    requiresAuth: true
                },
            },
            {
                path: 'about',
                component: () => import('../views/Modules/About/AboutPages.vue'), // 关于
                meta: {
                    breadcrumb: '关于',
                    icon: logo,
                    requiresAuth: true
                }
            },
            {
                path: 'contactus',
                component: () => import('../views/Modules/About/ContactusPages.vue'), // 联系我们
                meta: {
                    breadcrumb: '联系我们',
                    icon: logo,
                    requiresAuth: true
                }
            },
            {
                path: 'userInfo',
                component: () => import('../views/Modules/User/UserinfoPages.vue'), // 用户信息
                meta: {
                    breadcrumb: '用户信息',
                    icon: logo,
                    requiresAuth: true
                }
            },
            {
                path: 'sendEmail',
                component: () => import('../views/Modules/User/SenduseremailPages.vue'), // 发送邮件
                meta: {
                    breadcrumb: '发送邮件',
                    icon: logo,
                    requiresAuth: true
                }
            },
            {
                path: 'userLog',
                component: () => import('../views/Modules/User/UserlogsPages.vue'), // 用户日志
                meta: {
                    breadcrumb: '用户日志',
                    icon: logo,
                    requiresAuth: true
                }
            }
        ]
    }
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some((record: any) => record.meta.requiresAuth)) {
        // 获取cookies中是否有auto_token字段
        const token = getCookie('AUTO_TOKEN');;
        if (!token) {
            next({
                path: '/start',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 保证一定要调用 next()
    }
});

export default router;