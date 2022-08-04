import { CasperServiceByJsonRPC } from "casper-js-sdk";
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
    "c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37", // account hash
    "uref-544b4c487d0373c23c04bcae6d6ed3080cb19aa15a50b74bf5a926ed6c3034ca-007" //dictionary uref of balance
  );
  console.log(
    "\n\ndictionary_item_value_1 =>",
    dictionary_item_value_1.CLValue.data.toString()
  );

  // method2: get dictionary item by name
  const contract_hash =
    "hash-4d294d081b0d84338a42e5a911eecb8da3491ff158162173cd15e8a1335736a2"; //contract hash
  const dictionary_name = "balances";
  const dictionary_item_key =
    "c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37"; // account hash
  const dictionary_item_value_2 = await client.getDictionaryItemByName(
    state_root_hash,
    contract_hash,
    dictionary_name,
    dictionary_item_key
  );
  console.log(
    "\n\ndictionary_item_value_2 =>",
    dictionary_item_value_2.CLValue.data.toString()
  );
};

main();

// {
//     "id": 1,
//     "jsonrpc":"2.0",
//     "method":"state_get_dictionary_item",
//      "params": {
//         "state_root_hash": "ce8e7988e05820bb6c4477d4a0b81e11b4b78b3a1810e48951f7a9a25564884b",
//         "dictionary_identifier": {
//           "URef": {
//             "seed_uref": "uref-544b4c487d0373c23c04bcae6d6ed3080cb19aa15a50b74bf5a926ed6c3034ca-007",
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
//         "dictionary_key": "dictionary-d09214f8b47e3699403f2bc835a1bfd3cde1612a2ded276d09ce167dec096f7d",
//         "stored_value": {
//             "CLValue": {
//                 "cl_type": "U64",
//                 "bytes": "0200000000000000",
//                 "parsed": 2
//             }
//         },
