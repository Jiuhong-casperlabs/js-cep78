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
    "uref-0b483035ca9bdac5b2200ad4d73ab4d92d4955cdff69b2d04babbb2ed6dfdbfa-007" //dictionary uref of operator
  );

  console.log("\n\ndictionary_item_value_1 =>");

  if (dictionary_item_value_1.CLValue.isSome()) {
    console.log(
      Buffer.from(
        dictionary_item_value_1.CLValue.value().unwrap().data.data
      ).toString("hex") //account-hash
    );
  } else {
    console.log("None");
  }

  // // method2: get dictionary item by name
  // const contract_hash =
  //   "hash-9c49de9de33d424de344bd044c85d0a8ffcabb50534a9518c05dc2344e090aa5"; //contract hash
  // const dictionary_name = "operator";
  // const dictionary_item_key = "0"; // token identifier 0 / 1 / 2
  // const dictionary_item_value_2 = await client.getDictionaryItemByName(
  //   state_root_hash,
  //   contract_hash,
  //   dictionary_name,
  //   dictionary_item_key
  // );

  // console.log("\n\ndictionary_item_value_2 =>");

  // if (dictionary_item_value_2.CLValue.isSome()) {
  //   console.log(
  //     Buffer.from(
  //       dictionary_item_value_2.CLValue.value().unwrap().data.data
  //     ).toString("hex") //account-hash
  //   );
  // } else {
  //   console.log("None");
  // }
};

main();

// {
//     "id": 1,
//     "jsonrpc":"2.0",
//     "method":"state_get_dictionary_item",
//      "params": {
//         "state_root_hash": "3d949e2042e3677c98f8ad61d14330a8ca41b1c649e19e6181630b54cd41a236",
//         "dictionary_identifier": {
//           "URef": {
//             "seed_uref": "uref-6a6e1571168efc6c7a660aec83cceac4ede0214eff77bb2025e2cc4f85c648df-007",
//             "dictionary_item_key": "0"
//           }
//         }
//       }
// }

// {
//     "jsonrpc": "2.0",
//     "id": 1,
//     "result": {
//         "api_version": "1.0.0",
//         "dictionary_key": "dictionary-17f4266b9b2b92d1d0687b813a033eb0bdb48e9e23d7e15b5caf8809978cad55",
//         "stored_value": {
//             "CLValue": {
//                 "cl_type": {
//                     "Option": "Key"
//                 },
//                 "bytes": "01000bbe95e3c8491fa10eccf95999d960da7f3aaaecf0b9d3c899c07f9049e14e59",
//                 "parsed": {
//                     "Account": "account-hash-0bbe95e3c8491fa10eccf95999d960da7f3aaaecf0b9d3c899c07f9049e14e59"
//                 }
//             }
//         },
