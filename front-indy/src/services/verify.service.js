import api from '../helpers/api'

export const verifyService = {
    proofOfRequest,
    verify
}


function proofOfRequest(data)  {
    return api.post('proof', data)
}

function verify(data)  {
    return api.post('verify', data)
}