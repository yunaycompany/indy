
import {credentialService} from '../services/credential.service';
const state = {
    credDef: '',
    credOffer: ''
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
}


export const credential = {
    namespaced: true,
    state,
    actions,
    mutations
}
