import api from '../helpers/api'

export const userService = {
    createWalletDid
}


function createWalletDid(data)  {
    return api.post('wallet', data)
}
