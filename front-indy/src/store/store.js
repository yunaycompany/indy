import Vue from 'vue'
import Vuex from 'vuex'

import {user} from './user'

import {credential} from './credential'
import {schema} from './schema'
Vue.use(Vuex)



export default new Vuex.Store({
    getters: {},
    mutations: {},
    state: {},
    actions: {},
    modules: {
        user,
        schema,
        credential
    },
    strict: process.env.NODE_ENV !== 'production'
})
