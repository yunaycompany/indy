import api from '../helpers/api'

export const credentialService = {
    createCredentialDefinition,
    createCredentialOffer,
    sendCredential,
    storeCredential
}


function createCredentialDefinition(data)  {
    return api.post('credentialDefinition', data)
}

function createCredentialOffer(data)  {
    return api.post('credentialOffer', data)
}


function sendCredential(data)  {
    return api.post('credential', data)
}


function storeCredential(data)  {
    return api.post('credential/store', data)
}