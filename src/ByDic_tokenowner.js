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
    "0", // token identifier 0 / 1 / 2
    "uref-862011b97ffecde0ca664ab66f27a711a64d6609fcebbc8f6d9bcfc6b083fd33-007" //dictionary uref of token owner
  );
  console.log(
    "\n\ndictionary_item_value_1 =>",
    Buffer.from(dictionary_item_value_1.CLValue.data.data).toString("hex") //account-hash
  );

  // method2: get dictionary item by name
  const contract_hash =
    "hash-4d294d081b0d84338a42e5a911eecb8da3491ff158162173cd15e8a1335736a2"; //contract hash
  const dictionary_name = "token_owners";
  const dictionary_item_key = "0"; // token identifier 0 / 1 / 2
  const dictionary_item_value_2 = await client.getDictionaryItemByName(
    state_root_hash,
    contract_hash,
    dictionary_name,
    dictionary_item_key
  );
  console.log(
    "\n\ndictionary_item_value_2 =>",
    Buffer.from(dictionary_item_value_2.CLValue.data.data).toString("hex") //account-hash
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
//             "seed_uref": "uref-862011b97ffecde0ca664ab66f27a711a64d6609fcebbc8f6d9bcfc6b083fd33-007",
//             "dictionary_item_key": "1"
//           }
//         }
//       }
// }

// {
//     "jsonrpc": "2.0",
//     "id": 1,
//     "result": {
//         "api_version": "1.0.0",
//         "dictionary_key": "dictionary-b03fe61d252fd74b95f7d9304b7233293a68f2aa21eb932f716f6efd0647e7b7",
//         "stored_value": {
//             "CLValue": {
//                 "cl_type": "Key",
//                 "bytes": "00c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37",
//                 "parsed": {
//                     "Account": "account-hash-c0bd01f900afddbf23d1b275f5bb967b958ca2515dcbd48bd0dd11eab8e47e37"
//                 }
//             }
//         },
