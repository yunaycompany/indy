import Vue from 'vue'
import Vuex from 'vuex'

import {user} from './user'
import {credential} from './credential'
import {request} from './request'
import {schema} from './schema'

import {verify} from './verify'
Vue.use(Vuex)



export default new Vuex.Store({
    getters: {},
    mutations: {},
    state: {},
    actions: {},
    modules: {
        user,
        schema,
        credential,
        request,
        verify
    },
    strict: process.env.NODE_ENV !== 'production'
})
