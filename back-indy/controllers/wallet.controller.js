const indy = require('indy-sdk');
const user = require('../helpers/user');
const { WALLET_TYPE } = require('../helpers/walletType');

const { BadRequest, NotFound, ApiError } = require('../helpers/error')


exports.createWallet = async (req, res, next) => {
    var body = req.body;
    try {
        if (!body.name) {
            throw new BadRequest('Wallet Name is required');
        }
        if (!body.password) {
            throw new BadRequest('Wallet Password is required');
        }
        if (!body.type) {
            throw new BadRequest('Wallet Type is required');
        }
        const walletName = body.name
        const walletPassword = body.password
        const walletType = body.type

        let userWallet = await user.createWalletDid(walletName, walletPassword);
        let did = userWallet.did
        let key = userWallet.verkey
        let wallethandle = userWallet.wh;
        switch (walletType) {
            // create issuer wallet
            case WALLET_TYPE.ISSUER:
                let stewardDidInfo = {
                    'seed': '000000000000000000000000Steward1'
                };

                const [issuerDid, verkey] = await indy.createAndStoreMyDid(wallethandle, stewardDidInfo);
                did = issuerDid
                key = verkey

                let didMeta = JSON.stringify({
                    primary: true,
                    schemas: [],
                    credential_definitions: []
                });
                await indy.setDidMetadata(wallethandle, did, didMeta);
                break;
            default:
                break;
        }




        console.log("DID: " + did);
        console.log("VERKEY: " + key)

        const response = {
            DID: did,
            key: key,
            status: true
        }
        await indy.closeWallet(wallethandle)

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}
exports.loginWallet = async (req, res, next) => {
    var body = req.body;
    try {
        if (!body.name) {
            throw new BadRequest('Wallet Name is required');
        }
        if (!body.password) {
            throw new BadRequest('Wallet Password is required');
        }

        const walletName = body.name
        const walletPassword = body.password


        let walletHandle = await user.openWallet(walletName, walletPassword);

        req.session.walletHandle = walletHandle;

        const response = {
            walletHandle: walletHandle,
            status: true
        }

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}
exports.logoutWallet = async (req, res, next) => {
    try {
        const walletHandle = req.session.walletHandle 

        await indy.closeWallet(walletHandle)
        const response = {
            status: true
        }

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}

exports.createMasterRequest = async (req, res, next) => {
    try {

        const walletHandle = req.session.walletHandle

        const masterSecretId = await indy.proverCreateMasterSecret(
            walletHandle, //Holder
            null
        );
        console.log("HOLDER: MASTER SECRET ID")
        console.log(masterSecretId);

        const response = {
            masterSecretId: masterSecretId,
            status: true
        }

        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}