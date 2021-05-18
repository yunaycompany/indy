import Vue from 'vue'
import Vuex from 'vuex'

import {user} from './user'

Vue.use(Vuex)



export default new Vuex.Store({
    getters: {},
    mutations: {},
    state: {},
    actions: {},
    modules: {
        user
    },
    strict: process.env.NODE_ENV !== 'production'
})
