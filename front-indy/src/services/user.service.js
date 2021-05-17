import api from '../helpers/api'

export const userService = {
    createWalletDid
}


function createWalletDid(user)  {
    return api.post('test', user)
}
