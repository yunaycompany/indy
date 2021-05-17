const indy = require('indy-sdk');
const user = require('../helpers/user');
const {WALLET_TYPE} = require('../helpers/walletType');

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
        console.log(walletType)

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

exports.createMasterRequest = async (req, res, next) => {
    var body = req.body;
    try {
        if (!body.walletName) {
            throw new BadRequest('Wallet Name is required');
        }
        if (!body.walletPassword) {
            throw new BadRequest('Wallet Password is required');
        }


        const walletName = body.walletName
        const walletPassword = body.walletPassword


        let walletHandle = await user.openWallet(walletName, walletPassword);

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
        await indy.closeWallet(walletHandle)
        
        res.status(200).send(response);
    } catch (e) {
        next(e)
    }
}