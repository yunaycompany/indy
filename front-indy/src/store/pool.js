import poolService from '../services/pool.service'
const state = {
    poolHandle: null,
}

const actions ={
   async initPool({commit}){
        const response = await poolService.initPool();
        commit('finishInitPool', response)
    }
}

const mutations = {
    finishInitPool(state, response) {
        console.log('atroden')
        console.log(response)
      state.poolHandle = response
    }
}

export const user = {
    namespaced: true,
    state,
    actions,
    mutations
  }