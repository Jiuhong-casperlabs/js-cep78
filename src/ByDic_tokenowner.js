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
//         "state_root_hash": "932032a9653584642fa728acc95576415d15704da2cfcf372e226b8137b01851",
//         "dictionary_identifier": {
//           "URef": {
//             "seed_uref": "uref-862011b97ffecde0ca664ab66f27a711a64d6609fcebbc8f6d9bcfc6b083fd33-007",
//             "dictionary_item_key": "0"
//           }
//         }
//       }
// }
