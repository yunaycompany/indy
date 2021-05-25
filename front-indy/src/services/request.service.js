import api from '../helpers/api'

export const requestService = {
    createMasterRequest,
    createCredentialRequest
}


function createMasterRequest(data)  {
    return api.post('masterRequest', data)
}

function createCredentialRequest(data)  {
    return api.post('credentialRequest', data)
}

