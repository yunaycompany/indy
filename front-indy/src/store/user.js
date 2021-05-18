
import {userService} from '../services/user.service';
const state = {
    wallet: ''
}

const actions = {
    createWalletDid({commit}, data) {
        return userService.createWalletDid(data).then(
            response => {
                commit('createWalletSuccess', response)
            }
        );
    },
}

const mutations = {
    createWalletSuccess(state, response) {
        console.log(response)
        state.wallet = response;
    },
}


export const user = {
    namespaced: true,
    state,
    actions,
    mutations
}
