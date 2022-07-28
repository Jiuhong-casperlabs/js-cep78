import {
    DeployUtil,
    CasperClient,
    RuntimeArgs,
    CLString,
    CLPublicKey,
    CLByteArray,
    CLKey,
    CLAccountHash,
} from "casper-js-sdk";
import * as utils from "../utils.js";
import * as constants from "../constants";

const main = async () => {
    //Step 1: Set casper node client
    const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

    //Step 2: Set contract operator key pair
    const keyPairofContract = utils.getKeyPairOfContract(
        constants.PATH_TO_SOURCE_KEYS
    );

    //cep78 contract-hash
    const hash1 = "fbf80361bdd0dc837d012ce8ec600b69da97ff9e5b938933531f6cfac890f6ea"
    const contracthashbytearray = new CLByteArray(Uint8Array.from(Buffer.from(hash1, 'hex')));
    const contracthash = new CLKey(contracthashbytearray);

    //=== token_owner: Key ===
    const hexString =
        "01187a3f420e11affb20b51e69f32fb5f159f33aefd4c3dcd16b1dc12267ea259e";

    const accounthash = new CLAccountHash(
        CLPublicKey.fromHex(hexString).toAccountHash()
    );

    const token_owner = new CLKey(accounthash);

    // === token_meta_data: string === 
    const meta_data_json = {
        "name": "John Doe",
        "symbol": "abc",
        "token_uri": "https://www.barfoo.com"
    }

    const token_meta_data = new CLString(JSON.stringify(meta_data_json))

    let deploy = DeployUtil.makeDeploy(
        new DeployUtil.DeployParams(
            keyPairofContract.publicKey,
            "casper-net-1",
            // "casper-test",
            constants.DEPLOY_GAS_PRICE,
            constants.DEPLOY_TTL_MS
        ),
        DeployUtil.ExecutableDeployItem.newModuleBytes(
            utils.getBinary(constants.PATH_TO_CONTRACT_MINT),
            RuntimeArgs.fromMap({
                "nft_contract_hash": contracthash,
                "token_owner": token_owner,
                "token_meta_data": token_meta_data
            })
        ),
        DeployUtil.standardPayment(10000000000)
    );
    deploy = client.signDeploy(deploy, keyPairofContract);

    let deployHash = await client.putDeploy(deploy);
    console.log(`deploy hash = ${deployHash}`);
};

main();

