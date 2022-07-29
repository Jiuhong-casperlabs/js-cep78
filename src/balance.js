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

  //=== cep78 contract-hash ===
  const hash1 =
    "62991807466f8b768557ac2d4538614975df54cda74295f9e94435a89365a4f9";
  const contracthashbytearray = new CLByteArray(
    Uint8Array.from(Buffer.from(hash1, "hex"))
  );
  const nft_contract_hash = new CLKey(contracthashbytearray);

  //=== token_owner: Key ===
  const hexString =
    "01728e64fdedd75ff64858a27abde9c0c5caa5a04564b0953b3ed4988f8102687c"; // the installer

  const accounthash = new CLAccountHash(
    CLPublicKey.fromHex(hexString).toAccountHash()
  );

  const token_owner = new CLKey(accounthash);

  // === key_name: string ===
  const key_name = new CLString("mybalance");

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      // "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(constants.PATH_TO_CONTRACT_BALANCE),
      RuntimeArgs.fromMap({
        nft_contract_hash,
        key_name,
        token_owner,
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );
  deploy = client.signDeploy(deploy, keyPairofContract);

  let deployHash = await client.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};

main();
