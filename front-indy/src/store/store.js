
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import { pool } from './pool'


export default new Vuex.Store({
    modules: {
        pool
    },
    strict: process.env.NODE_ENV !== 'production'
})
