
import {verifyService} from '../services/verify.service';
const state = {
    proofData: '',
    proofNonce: '',
    verifyResponse: ''
}

const actions = {
    proofOfRequest({commit}, data) {
        commit('sendProofOfRequest')
        return verifyService.proofOfRequest(data).then(
            response => {
                commit('proofOfRequestSuccess', response)
            }
        );
    },
    verify({commit}, data) {
        commit('sendVerifyRequest')
        return verifyService.verify(data).then(
            response => {
                commit('verifySuccess', response)
            }
        );
    },
    
    
}

const mutations = {
    sendProofOfRequest(state) {
        state.proofData = ''
        state.proofNonce = ''
    },
    proofOfRequestSuccess(state, response) {
        state.proofData = response.proofData;
        state.proofNonce = response.nonce
    },
    sendVerifyRequest(state) {
        state.verifyResponse = ''
    },
    verifySuccess(state, response) {
        state.verifyResponse = response
    },
    

    
}


export const verify = {
    namespaced: true,
    state,
    actions,
    mutations
}
