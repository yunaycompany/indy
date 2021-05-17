const indy = require('indy-sdk');

const util = require('./util.js');
async function init(){
try {
    // activamos el modo debug para tener más información de los errores que ocurran
     indy.setRuntimeConfig({ collect_backtrace: true })
     indy.setDefaultLogger("debug");

    // creamos la configuracion para conectarnos a la red (pool)
    console.log("creando conexion con pool...");
    const poolName = "pool_config_demo"
    try {
        const path = await util.getPoolGenesisTxnPath(poolName)
        console.log("path value: ", path);
        const config = {
            "genesis_txn": path,
        }
        await indy.createPoolLedgerConfig(poolName, config);
    } catch (err) {
        console.log("pool already exist detected!!")
        // console.error(err)
    }
    // ajustamos la version del protocolo a usar. A partir de indy 1.4 se usa el 2
    await indy.setProtocolVersion(2);

    // nos conectamos a la red (pool)
    console.log("opening pool ledger connection with pool name: ", poolName)
    let poolHandle = await indy.openPoolLedger(poolName);
    console.log("pool handler id: ", poolHandle);
    return poolHandle;
} catch (err) {
    console.error("FALLO GENERAL DEL SCRIPT");
    console.error(err);
    console.error(JSON.stringify(err, null, 4));
    return null;
}}

const poolHandle = init()

module.exports = poolHandle