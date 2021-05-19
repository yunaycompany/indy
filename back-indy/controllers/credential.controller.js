const indy = require('indy-sdk');
const user = require('../helpers/user');
const pool = require('../helpers/pool')
const encoder = require('../helpers/encoder.js');
const connection = require('../helpers/connection.js');
const { BadRequest, NotFound, ApiError } = require('../helpers/error')


exports.createCredentialDefinition = async (req, res, next) => {
    var body = req.body;
    try {

        if (!body.did) {
            throw new BadRequest('Issuer Did is required');
        }
        
        if (!body.schemaId) {
            throw new BadRequest('Wallet Schema is required');
        }

        const poolHandle = await pool
        const issuerDid = body.credDefId
        const schemaId = body.schemaId


        const walletHandle = body.walletHandle 
        
        const [, readedSchema] = await connection.getSchema(poolHandle, issuerDid, schemaId);

        // register the credential definition
        
        console.log("CREANDO LA CREDENTIAL DEFINITION");
        const [credDefId, defJson] = await indy.issuerCreateAndStoreCredentialDef(
            walletHandle,
            issuerDid,
            readedSchema,
            'TAG1',
            'CL',
            '{"support_revocation": false}'
        );
        console.log("CREDENTIAL DEFINITION CREADA");
        console.log(credDefId);
        console.log(defJson);
        console.log("sending credential definition to ledger")
        const credDefRegResponse = await connection.sendCredDef(
            poolHandle,
            walletHandle,
            issuerDid,
            defJson
        );
        console.log("CREDENTIAL DEFINITION REGISTRATION");
        console.log(credDefRegResponse);
        

        const response = {
            credDefId: credDefId,
            credDef: defJson,
            status: true
        }
        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}

exports.createCredentialOffer = async(req, res, next) =>{
    var body = req.body;
    try {

        if (!body.credDefId) {
            throw new BadRequest('Credential Definition ID is required');
        }

        
        const credDefId = body.credDefId


        const walletHandle = body.walletHandle 

        console.log("CREANDO LA OFERTA DEL CREDENCIAL PARA EL USUARIO")
        const credOffer = await indy.issuerCreateCredentialOffer(
            walletHandle,
            credDefId
        );
        console.log("OFERTA DE CREDENCIAL CREADA")
        console.log(credOffer);

        const response = {
            credOffer: credOffer,
            status: true
        }
       
        
        res.status(200).send(response);


    } catch (e) {
        next(e)
    }
}

exports.createCredentialRequest = async(req, res, next)=>{
    var body = req.body;
    try {

        if (!body.holderDID) {
            throw new BadRequest('Holder ID is required');
        }

        if (!body.credOffer) {
            throw new BadRequest('Credential Offer is required');
        }
        if (!body.defJson) {
            throw new BadRequest('Definition Json is required');
        }

        if (!body.masterSecretId) {
            throw new BadRequest('Master Secret ID is required');
        }
       
        const holderDID = body.holderDID
        const credOffer = body.credOffer
        const defJson = body.defJson
        const masterSecretId = body.masterSecretId

        const walletHandle = body.walletHandle 
    
        console.log("HOLDER: ACEPTANDO LA OFERTA DEL CREDENTIAL Y GENERANDO RESPUESTA");
        const [credReq, credReqMetadata] = await indy.proverCreateCredentialReq(
            walletHandle,//holder
            holderDID,
            credOffer,
            defJson,
            masterSecretId);

        console.log("HOLDER: RESPUESTA A LA OFERTA")
        console.log(credReq);
        console.log("HOLDER: RESPUESTA METADATA")
        console.log(credReqMetadata);

        const response = {
            credReq: credReq,
            credReqMetadata: credReqMetadata,
            status: true
        }
        
        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}



exports.createCredential = async(req, res, next)=>{
    var body = req.body;
    try {

       

        if (!body.credReq) {
            throw new BadRequest('Credential Request is required');
        }

        if (!body.credOffer) {
            throw new BadRequest('Credential Offer is required');
        }

        const credOffer = body.credOffer
        const credReq = body.credReq
        
        const walletHandle = body.walletHandle 
    
        // ahora que el usuario A ya ha aceptado la oferta, 
        // se envia la respuesta de vuelta al issuer, para que este la procese y emita la credencial

        // credential values tiene que tener la misma informacion que nuestro schema
        // 'first_name', 'last_name', 'salary', 'employee_status', 'experience'
        let credentialValues = {
            "first_name": { "raw": "Jhon", "encoded": encoder.encodeCredValue("Jhon") },
            "last_name": { "raw": "Doe", "encoded": encoder.encodeCredValue("Doe") },
            "salary": { "raw": "20000", "encoded": encoder.encodeCredValue(20000) },
            "employee_status": { "raw": "hired", "encoded": encoder.encodeCredValue("hired") },
            "experience": { "raw": "2", "encoded": encoder.encodeCredValue(2) },
        };
        console.log("ISSUER: CREANDO CREDENCIAL CON LOS DATOS")
        console.log(JSON.stringify(credentialValues, null, 4));
        let [credentialData] = await indy.issuerCreateCredential(
            walletHandle,//Issuer
            credOffer,
            credReq,
            credentialValues,
            null,
            -1
        );
        console.log("ISSUER: CREDENCIAL CREADO")
        console.log(JSON.stringify(credentialData));

        const response = {
            credentialData: credentialData,
            status: true
        }
        
        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}



exports.holderStoreCredential = async(req, res, next)=>{
    var body = req.body;
    try {

        if (!body.credReqMetadata) {
            throw new BadRequest('Credential Metadata is required');
        }

        if (!body.credentialData) {
            throw new BadRequest('Credential Data is required');
        }

        if (!body.defJson) {
            throw new BadRequest('Credential Definition JSON is required');
        }


        
        const credReqMetadata = body.credReqMetadata
        const defJson = body.defJson
        const credentialData =body.credentialData




        const walletHandle = body.walletHandle 
       // ahora que la credencial esta creada,
       // se le envia al usuario para que la verifique y la guarde en su wallet
       console.log("HOLDER: GUARDANDO CREDENCIAL EN WALLET")
       const id = await indy.proverStoreCredential(
           walletHandle,//Holder
           null,
           credReqMetadata,
           credentialData,
           defJson,
           null
       );
       console.log("HOLDER: CREDENCIAL GUARDADO CON EL ID")
       console.log(id);

        const response = {
            id: id,
            status: true
        }
       
        
        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}