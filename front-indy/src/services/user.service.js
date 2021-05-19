import api from '../helpers/api'

export const userService = {
    createWalletDid,
    login,
    logout
}


function createWalletDid(data)  {
    return api.post('wallet', data)
}

function login(data)  {
    return api.post('login', data)
}


function logout()  {
    return api.post('logout', {})
}
