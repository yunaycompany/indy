
import {userService} from '../services/user.service';
const state = {
    wallet: '',
    user: ''
}

const actions = {
    createWalletDid({commit}, data) {
        commit('createWalletRequest')
        return userService.createWalletDid(data).then(
            response => {
                commit('createWalletSuccess', response)
            }
        );
    },
    login({commit}, data) {
        commit('loginRequest')
        return userService.login(data).then(
            response => {
                commit('loginSuccess', response)
            }
        );
    },
    logout({commit}) {
        commit('loginRequest')
        return userService.logout()
    },

}

const mutations = {
    createWalletRequest(state) {
        state.wallet = '';
    },
    createWalletSuccess(state, response) {
        state.wallet = response;
    },
    loginRequest(state){
        state.user = ''
    },
    loginSuccess(state, response) {
        state.user = response;
    }
}


export const user = {
    namespaced: true,
    state,
    actions,
    mutations
}
