const indy = require('indy-sdk');
const connection = require('../helpers/connection.js');
const pool = require('../helpers/pool')
const user = require('../helpers/user')

const {BadRequest,NotFound, ApiError} = require('../helpers/error')

exports.createProofRequest = async (req, res, next) => {
    var body = req.body;
    try {
        
        if (!body.name) {
            throw new BadRequest('Name of proof is required');
        }
        if (!body.credDefId) {
            throw new BadRequest('Credential Definition ID is required');
        }
        if (!body.holderDid) {
            throw new BadRequest('Holder DID is required');
        }
        if (!body.masterSecretId) {
            throw new BadRequest('Master Secret ID is required');
        }
        if (!body.attributes) {
            throw new BadRequest('Attributes are required');
        }
        if (!body.predicates) {
            throw new BadRequest('Predicates are required');
        }

        const credDefId = body.credDefId
        const masterSecretId = body.masterSecretId
        const holderDid = body.holderDid
        const nameOfRequest = body.name

        const attributes = body.attributes
        const predicates = body.predicates

        const poolHandle = await pool

        const walletHandle = body.walletHandle 
         // este usuario, lo primero que tiene que hacer es solicitar una prueba
        // para ello genera un proof request
        nonce = await indy.generateNonce();
        let proofRequest = {
            'nonce': nonce,
            'name': nameOfRequest,
            'version': '0.2',
            'ver': '1.0',
            'requested_attributes': attributes,
            /*{
                'attr1_referent': {
                    'name': 'first_name',
                    'restrictions': [{ 'cred_def_id': credDefId }]
                },
                'attr2_referent': {
                    'name': 'last_name',
                    'restrictions': [{ 'cred_def_id': credDefId }]
                },
                'attr3_referent': {
                    'name': 'employee_status',
                    'restrictions': [{ 'cred_def_id': credDefId }]
                }

            },*/
            'requested_predicates': predicates //{
                /*'predicate1_referent': {
                    'name': 'salary',
                    'p_type': '>=',
                    'p_value': 5000,
                    restrictions': [{ 'cred_def_id': credDefId }]
                }*/
            //}
        };
        
        console.log("VERIFIER: DATOS DEL PROOF REQUEST")
        console.log(JSON.stringify(proofRequest, null, 4))
        // el verifier, le hace llegar el contenido del proof request
        // al holder
        console.log("HOLDER: BUSCANDO EN LA WALLET CREDENCIALES QUE PRUEBEN LA SOLICITUD RECIBIDA")
        const proofData = await user.buildProof(
            walletHandle,//Holder
            holderDid,
            poolHandle,
            proofRequest,
            masterSecretId,
        )
        console.log("HOLDER: PRUEBA CREADA")
        console.log(JSON.stringify(proofData, null, 4))

        const response = {
            proofData: proofData,
            nonce: nonce,
            status: true
        }
       

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}



exports.verifiy = async (req, res, next) => {
    var body = req.body;
    try {
        
        if (!body.verifierDid) {
            throw new BadRequest('Verifier DID is required');
        }
        if (!body.proofData) {
            throw new BadRequest('Proof Data is required');
        }
        if (!body.name) {
            throw new BadRequest('Credential Definition ID is required');
        }
        if (!body.predicates) {
            throw new BadRequest('Predicates are required');
        }
        if (!body.attributes) {
            throw new BadRequest('Attributes are required');
        }

        const proofData = body.proofData
        const verifierDid = body.verifierDid
        const nameOfRequest  = body.name
        const nonce = body.nonce
        const poolHandle = await pool
        const attributes = body.attributes
        const predicates = body.predicates

        
        // una vez creada, se enviara la prueba al verifier para que la procese
        
        // el verifier, la recibe y empieza a verificar su validez
        console.log("VERIFIER: CONTENIDO VISIBLE DE LA PRUEBA")
        console.log(JSON.stringify(proofData['requested_proof'], null, 4))

        console.log("VERIFIER: OBTENIENDO INFORMACION ADICIONAL DE LA RED ANTES DE VERIFICAR PRUEBA")
        console.log(JSON.stringify(proofData['identifiers'], null, 4))
       
            //move to body params
        let proofRequest = {
            'nonce': nonce,
            'name': nameOfRequest,
            'version': '0.2',
            'ver': '1.0',
            'requested_attributes': attributes,
            'requested_predicates': predicates//{
                /*'predicate1_referent': {
                    'name': 'salary',
                    'p_type': '>=',
                    'p_value': 5000,
                    restrictions': [{ 'cred_def_id': credDefId }]
                }*/
            //}
        };

        const [schemasJson, credDefsJson, revocRefDefsJson, revocRegsJson] = await connection.verifierGetEntitiesFromLedger(
            poolHandle,
            verifierDid,
            proofData['identifiers'],
            'VERIFIER',
        );


        const isValid = await indy.verifierVerifyProof(
            proofRequest,
            proofData,
            schemasJson,
            credDefsJson,
            revocRefDefsJson,
            revocRegsJson
        );
        console.log("VERIFIER: PRUEBA VERIFICADA?");
        console.log(isValid);

        const response = {
            isValid: isValid,
            status: true
        }

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}