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
    constants.PATH_TO_SOURCE_KEYS // user 1
  );

  //cep78 contract-hash
  const hash1 =
    "8c1159fcb53bc8419656d9c9876f17aa346690855d86552a293430876e69896f";
  const contracthashbytearray = new CLByteArray(
    Uint8Array.from(Buffer.from(hash1, "hex"))
  );
  const contracthash = new CLKey(contracthashbytearray);

  //=== token_owner: Key (user 2)===
  const hexString =
    "0179bb9a60ed8701d943a724577ebb51c1c28a7e07291468075582dbc75a505bec"; //public key - nctl-view-user-account user=2

  const accounthash = new CLAccountHash(
    CLPublicKey.fromHex(hexString).toAccountHash()
  );

  const token_owner = new CLKey(accounthash);

  // === token_meta_data: string ===
  const meta_data_json = {
    name: "John Doe",
    symbol: "abc",
    token_uri: "https://www.barfoo.com",
  };

  const token_meta_data = new CLString(JSON.stringify(meta_data_json));

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
        nft_contract_hash: contracthash,
        token_owner,
        token_meta_data,
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );
  deploy = client.signDeploy(deploy, keyPairofContract);

  let deployHash = await client.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};

main();
