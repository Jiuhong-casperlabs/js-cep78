import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLU64,
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
  const hash1 =
    "9c49de9de33d424de344bd044c85d0a8ffcabb50534a9518c05dc2344e090aa5"; // contract hash
  const contracthashbytearray = Uint8Array.from(Buffer.from(hash1, "hex"));

  // Args
  //=== token_id: U64 ===
  const token_id = new CLU64(0);

  // === operator: Key ====
  const operator_account_hash_str =
    "0bbe95e3c8491fa10eccf95999d960da7f3aaaecf0b9d3c899c07f9049e14e59"; // user 1 account-hash

  const operator_account_hash_Uint8Array = Uint8Array.from(
    Buffer.from(operator_account_hash_str, "hex")
  );
  const operator_account_hash = new CLAccountHash(
    operator_account_hash_Uint8Array
  );

  const operator_key = new CLKey(operator_account_hash);
  // ===Args end===

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      // "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contracthashbytearray,
      "approve",
      RuntimeArgs.fromMap({
        token_id,
        operator: operator_key,
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );
  deploy = client.signDeploy(deploy, keyPairofContract);

  let deployHash = await client.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};

main();
