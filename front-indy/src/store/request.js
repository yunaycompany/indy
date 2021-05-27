
import {requestService} from '../services/request.service';
const state = {
    masterRequest: '',
    credReq: ''
}

const actions = {
    createMasterRequest({commit, dispatch}, data) {
        commit('createMasterRequestRequest')
        return requestService.createMasterRequest(data).then(
            response => {
                console.log(data)
                commit('createMasterRequestSuccess', response)
                data.masterSecretId = response.masterSecretId
                dispatch('createCredentialRequest', data)
            }
        );
    },
    createCredentialRequest({commit}, data) {
        commit('createCredentialRequest')
        return requestService.createCredentialRequest(data).then(
            response => {
                commit('createCredentialRequestSuccess', response)
            }
        );
    },
    
}

const mutations = {
    createMasterRequestRequest(state) {
        state.masterRequest = '';
    },
    createMasterRequestSuccess(state, response) {
        state.masterRequest = response;
    },
    createCredentialRequest(state){
        state.credReq = ''
    },
    createCredentialRequestSuccess(state, response) {
        state.credReq = response;
    },
}


export const request = {
    namespaced: true,
    state,
    actions,
    mutations
}
