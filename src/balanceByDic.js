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
    "c171fb059cef34de1e954724dcd31a69bdc48bd0967e27987e42e90d171fbc79",
    "uref-5814fa2fd886d8c82187cf5b5991dbcf16032d4e47ef7d4ccae2633cde31b62d-007"
  );
  console.log(
    "\n\ndictionary_item_value_1 =>",
    dictionary_item_value_1.CLValue.data.toString()
  );

  // method2: get dictionary item by name
  const contract_hash =
    "hash-2eacf586c19893ee5cf795a951267f358a7e47b1de81ea49fef19e7bdf514430";
  const dictionary_name = "balances";
  const dictionary_item_key =
    "c171fb059cef34de1e954724dcd31a69bdc48bd0967e27987e42e90d171fbc79";
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
