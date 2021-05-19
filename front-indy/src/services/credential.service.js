import api from '../helpers/api'

export const credentialService = {
    createCredentialDefinition,
    createCredentialOffer
}


function createCredentialDefinition(data)  {
    return api.post('credentialDefinition', data)
}

function createCredentialOffer(data)  {
    return api.post('credentialOffer', data)
}

