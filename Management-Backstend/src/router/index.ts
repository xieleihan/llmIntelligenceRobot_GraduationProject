import { createWebHashHistory, createRouter } from 'vue-router';

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
        component: () => import('../views/HomePages.vue'), // 主页
    }
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;