const indy = require('indy-sdk');
const connection = require('../helpers/connection.js');
const pool = require('../helpers/pool')
const user = require('../helpers/user')

const {BadRequest,NotFound, ApiError} = require('../helpers/error')

exports.createSchema = async (req, res, next) => {
    var body = req.body;
    try {
        if (!body.did) {
            throw new BadRequest('Issuer Did is required');
        }
        
        if (!body.name) {
            throw new BadRequest('Schema Name is required');
        }
        if (!body.version) {
            throw new BadRequest('Schema Version is required');
        }
        console.log("CREANDO SCHEMA EN LOCAL")
        const poolHandle = await pool
        const issuerDid = body.did
        const walletHandle = body.walletHandle 
        const schemaName = 'Job-Certificate',
         schemaAttributes = 
        [
            'first_name',
            'last_name',
            'salary',
            'employee_status',
            'experience'
        ]

        const version =randomVersion();
        const [schemaId, schema] = await indy.issuerCreateSchema(
            issuerDid,
            schemaName,
            version,
            schemaAttributes
        );
        console.log(schemaId);
        console.log(schema);


        console.log("REGISTRANDO SCHEMA EN LA RED")
        const result = await connection.sendSchema(poolHandle, walletHandle, issuerDid, schema);
        console.log(result);
        const response = {
            schemaId: schemaId,
            schema: schema,
            status: true
        }

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}

exports.getSchema = async (req, res, next) => {
    try {
        if (!req.params.did) {
            throw new BadRequest('Issuer Did is required');
        }
        if (!req.params.schemaId) {
            throw new BadRequest('Schema ID is required');
        }
        console.log("GET SCHEMA EN LOCAL")

        const issuerDid = req.params.did
        const schemaId = req.params.schemaId
        const poolHandle = await pool

console.log(issuerDid)
console.log(schemaId)
        // create credential definition
        const [, readed] = await connection.getSchema(poolHandle, issuerDid, schemaId);
        console.log("SCHEMA LEIDO DE LA RED");
        console.log(readed);
        
        const response = {
            schemaId: schemaId,
            schema: readed,
            status: true
        }

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}


exports.getSchemas = async (req, res, next) => {
    try {
        var body = req.body;
        if (!body.did) {
            throw new BadRequest('Issuer Did is required');
        }

        const issuerDid = body.did
        const poolHandle = await pool

        const walletHandle = body.wh 

        // create credential definition
        const schemas = await connection.getSchemas(poolHandle, walletHandle, issuerDid);
        
        
        const response = {
            schemas: schemas,
            status: true
        }

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}

function randomVersion() {
    return "1." + (new Date().getTime() % 100000).toString()
}