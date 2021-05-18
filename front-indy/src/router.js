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
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/'
        }

    ]
})

export default router
