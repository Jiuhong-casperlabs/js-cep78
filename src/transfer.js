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
    "4d294d081b0d84338a42e5a911eecb8da3491ff158162173cd15e8a1335736a2"; // contract hash
  const contracthashbytearray = Uint8Array.from(Buffer.from(hash1, "hex"));

  // Args
  //=== token_id: U64 ===
  const token_id = new CLU64(0);

  // === source_key: Key ====
  const source_account_hash_str =
    "7b360ce84a4f3f3d22b810b99f11342d5ceaaaa99466c9e7a6cf2f2283f604e3"; // user 2 account-hash

  const source_account_hash_Uint8Array = Uint8Array.from(
    Buffer.from(source_account_hash_str, "hex")
  );
  const source_account_hash = new CLAccountHash(source_account_hash_Uint8Array);

  const source_key = new CLKey(source_account_hash);

  // === target_key: Key ====
  const target_account_hash_str =
    "c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37"; // user 3 account-hash

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
