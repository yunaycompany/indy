var express = require('express');

const {NotFound} = require('../helpers/error')
const walletController = require("../controllers/wallet.controller");
const credentialController = require("../controllers/credential.controller");
const schemaController = require("../controllers/schema.controller");
const verifierController = require("../controllers/verifier.controller");

const router = express.Router();




//Wallet
router.post("/wallet", walletController.createWallet);
router.post("/login", walletController.loginWallet);
router.post("/logout", walletController.logoutWallet);
router.post("/masterRequest", walletController.createMasterRequest);


//Schema
router.post("/schema", schemaController.createSchema);
router.get("/schema/:schemaId/:did", schemaController.getSchema);

//Credential
router.post("/credentialDefinition", credentialController.createCredentialDefinition);
router.post("/credentialOffer", credentialController.createCredentialOffer);
router.post("/credentialRequest", credentialController.createCredentialRequest);
router.post("/credential", credentialController.createCredential);
router.post("/credential/store", credentialController.holderStoreCredential);


//Verifier
router.post("/proof", verifierController.createProofRequest);
router.post("/verify", verifierController.verifiy);


//Route not match
router.use(function (req, res, next) {
    throw new NotFound('Not Found');
});

module.exports = { router };
