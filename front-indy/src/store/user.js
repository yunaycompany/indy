
import {userService} from '../services/user.service';
const state = {
    wallet: ''
}

const actions = {
    createWalletDid({commit}, clientId) {
        return userService.createWalletDid(clientId).then(
            response => {
                commit('createWalletSuccess', response)
            }
        );
    },
}

const mutations = {
    createWalletSuccess(state, response) {
        state.wallet = response;
    },
}


export const user = {
    namespaced: true,
    state,
    actions,
    mutations
}
