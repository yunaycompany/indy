import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./components/AppMain.vue')
        },
        {
            path: '/wallet',
            name: 'wallet',
            component: () => import('./components/Wallet.vue')
        },
        {
            path: '/schema',
            name: 'schema',
            component: () => import('./components/Schema.vue')
        },
        {
            path: '/credential',
            name: 'credential',
            component: () => import('./components/Credential.vue')
        },
        {
            path: '/request',
            name: 'request',
            component: () => import('./components/Request.vue')
        },
        {
            path: '/verify',
            name: 'verify',
            component: () => import('./components/Verify.vue')
        },
        {
            path: '*',
            redirect: '/'
        }

    ]
})

export default router
