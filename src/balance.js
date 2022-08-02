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
    "2eacf586c19893ee5cf795a951267f358a7e47b1de81ea49fef19e7bdf514430";
  const contracthashbytearray = new CLByteArray(
    Uint8Array.from(Buffer.from(hash1, "hex"))
  );
  const nft_contract_hash = new CLKey(contracthashbytearray);

  //=== token_owner: Key ===
  const hexString =
    "01e0834208d0a1d05b00d124b74bb3765a04b9d6fd072727a3a4cc12f125f628bb"; // the installer

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

// account named_key
// {
//     "name": "mybalance",
//     "key": "uref-8e48a0d40eb1c077f8162ea5ae6146750ae894125440761c309c8a0f1f723960-007"
// },
//
// {
//     "id": 1,
//     "jsonrpc": "2.0",
//     "method": "state_get_item",
//     "params": {
//         "state_root_hash": "3fa895acad9c321a49923112111bd91d53312cc4fe79ce3971e41c05547cdf0b",
//         "key": "uref-8e48a0d40eb1c077f8162ea5ae6146750ae894125440761c309c8a0f1f723960-007"
//     }
// }
//  =>
//  "stored_value": {
//             "CLValue": {
//                 "cl_type": "U64",
//                 "bytes": "0100000000000000",
//                 "parsed": 1
//             }
//         },
