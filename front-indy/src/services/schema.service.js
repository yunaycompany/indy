import api from '../helpers/api'

export const schemaService = {
    createSchema,
    getSchemas
}


function createSchema(data)  {
    return api.post('schema', data)
}

function getSchemas(data)  {
    return api.post('schemas', data)
}

