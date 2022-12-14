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

  // === source_key: Key ====
  const source_account_hash_str =
    "c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37"; // user 3 account-hash - nctl-view-user-account user=3

  const source_account_hash_Uint8Array = Uint8Array.from(
    Buffer.from(source_account_hash_str, "hex")
  );
  const source_account_hash = new CLAccountHash(source_account_hash_Uint8Array);

  const source_key = new CLKey(source_account_hash);

  // === target_key: Key ====
  const target_account_hash_str =
    "9a870ea7582557f33f15e8ddcfb5660501da88ad5570325af665c37dbc3d1aff"; // user 4 account-hash - nctl-view-user-account user=4

  const target_account_hash_Uint8Array = Uint8Array.from(
    Buffer.from(target_account_hash_str, "hex")
  );
  const target_account_hash = new CLAccountHash(target_account_hash_Uint8Array);

  const target_key = new CLKey(target_account_hash);

  // Args end
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
      "transfer",
      RuntimeArgs.fromMap({
        token_id,
        source_key,
        target_key,
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );
  deploy = client.signDeploy(deploy, keyPairofContract);

  let deployHash = await client.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};

main();
