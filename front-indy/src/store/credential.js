
import {credentialService} from '../services/credential.service';
const state = {
    credDef: '',
    credOffer: '',
    credentialData: '',
    credentialStoreId: ''
}

const actions = {
    createCredentialDefinition({commit}, data) {
        commit('createCredentialDefintionRequest')
        return credentialService.createCredentialDefinition(data).then(
            response => {
                commit('createCredentialDefintionSuccess', response)
            }
        );
    },
    createCredentialOffer({commit}, data) {
        commit('createCredentialOfferRequest')
        return credentialService.createCredentialOffer(data).then(
            response => {
                commit('createCredentialOfferSuccess', response)
            }
        );
    },
    sendCredential({commit}, data) {
        commit('sendCredential')
        return credentialService.sendCredential(data).then(
            response => {
                commit('sendCredentialSuccess', response)
            }
        );
    },
    storeCredential({commit}, data) {
        commit('storeCredentialRequest')
        return credentialService.storeCredential(data).then(
            response => {
                commit('storeCredentialSuccess', response)
            }
        );
    },
    
}

const mutations = {
    createCredentialDefintionRequest(state) {
        state.credDef = '';
    },
    createCredentialDefintionSuccess(state, response) {
        state.credDef = response;
    },
    createCredentialOfferRequest(state){
        state.credOffer = ''
    },
    createCredentialOfferSuccess(state, response) {
        state.credOffer = response;
    },
    sendCredential(state){
        state.credentialData = ''
    },
    sendCredentialSuccess(state, response) {
        state.credentialData = response;
    },
    storeCredentialRequest(state){
        state.credentialStoreId = ''
    },
    storeCredentialSuccess(state, response) {
        state.credentialStoreId = response;
    },
}


export const credential = {
    namespaced: true,
    state,
    actions,
    mutations
}
