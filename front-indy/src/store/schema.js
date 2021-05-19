
import {schemaService} from '../services/schema.service';
const state = {
    schemas: [],
    schema: ''
}

const actions = {
    createSchema({commit}, data) {
        commit('createSchemaRequest')
        return schemaService.createSchema(data).then(
            response => {
                commit('createSchemaSuccess', response)
            }
        );
    },
    getSchemas({commit}, data) {
        commit('getSchemasRequest')
        return schemaService.getSchemas(data).then(
            response => {
                commit('getSchemasRequestSuccess', response)
            }
        );
    },
}

const mutations = {
    createSchemaRequest(state) {
        state.schema = '';
    },
    createSchemaSuccess(state, response) {
        state.schema = response;
    },
    getSchemasRequest(state){
        state.schemas = []
    },
    getSchemasRequestSuccess(state, response) {
        state.schemas = response;
    },
}


export const schema = {
    namespaced: true,
    state,
    actions,
    mutations
}
