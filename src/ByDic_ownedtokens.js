import { CasperServiceByJsonRPC, CLList } from "casper-js-sdk";
import * as constants from "../constants";

const main = async () => {
  let client = new CasperServiceByJsonRPC(
    // constants.NCTL_ADDRESS
    constants.DEPLOY_NODE_ADDRESS
  );

  const state_root_hash = await client.getStateRootHash();

  // method1: get dictionary item by uref
  const dictionary_item_value_1 = await client.getDictionaryItemByURef(
    state_root_hash,
    "c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37", // account-hash
    "uref-a2a6ab18a4decde812e4ff35ccb86f91bf711732fa6d27991573de04e5007b60-007" //dictionary uref of owned_tokens
  );

  console.log("\n\ndictionary_item_value_1 =>");

  while (dictionary_item_value_1.CLValue.size() > 0) {
    console.log(dictionary_item_value_1.CLValue.pop().data.toString());
  }

  // method2: get dictionary item by name
  const contract_hash =
    "hash-4d294d081b0d84338a42e5a911eecb8da3491ff158162173cd15e8a1335736a2"; //contract hash
  const dictionary_name = "owned_tokens";
  const dictionary_item_key =
    "c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37"; // account-hash
  const dictionary_item_value_2 = await client.getDictionaryItemByName(
    state_root_hash,
    contract_hash,
    dictionary_name,
    dictionary_item_key
  );

  console.log("\n\ndictionary_item_value_2 =>");

  while (dictionary_item_value_2.CLValue.size() > 0) {
    console.log(dictionary_item_value_2.CLValue.pop().data.toString());
  }
};

main();

// {
//     "id": 1,
//     "jsonrpc":"2.0",
//     "method":"state_get_dictionary_item",
//      "params": {
//         "state_root_hash": "36618983b6e9281c6c77a769a34cc1f49dcbc9777944738332736b4c1d0912fc",
//         "dictionary_identifier": {
//           "URef": {
//             "seed_uref": "uref-a2a6ab18a4decde812e4ff35ccb86f91bf711732fa6d27991573de04e5007b60-007",
//             "dictionary_item_key": "c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37"
//           }
//         }
//       }
// }

// {
//     "jsonrpc": "2.0",
//     "id": 1,
//     "result": {
//         "api_version": "1.0.0",
//         "dictionary_key": "dictionary-7d20d59d1fe367b22cccc8d16e8daff32ac336513e6b17c06fc5c4634c5142cb",
//         "stored_value": {
//             "CLValue": {
//                 "cl_type": {
//                     "List": "U64"
//                 },
//                 "bytes": "0200000000000000000000000100000000000000",
//                 "parsed": [
//                     0,
//                     1
//                 ]
//             }
//         },
