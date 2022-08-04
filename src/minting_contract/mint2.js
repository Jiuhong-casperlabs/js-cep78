import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLKey,
  CLAccountHash,
  CLString,
  CLByteArray,
  CLPublicKey,
} from "casper-js-sdk";
import * as utils from "../../utils.js";
import * as constants from "../../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  //minting_contract contract-hash
  const minting_contract_hash_str =
    "99d69094de50f91495b25857bbf43b2488871be224fdc4c0893680620863bf97";
  const minting_contract_hash_array = Uint8Array.from(
    Buffer.from(minting_contract_hash_str, "hex")
  );

  //cep78 contract-hash
  const cep78_contract_hash_str =
    "65053b7ee7602a9c4feb171396fcaf0315eef38b321e79bcb0bd92b7cf001631";
  const cep78_contract_hash_array = new CLByteArray(
    Uint8Array.from(Buffer.from(cep78_contract_hash_str, "hex"))
  );
  const cep78_contract_hash_key = new CLKey(cep78_contract_hash_array);

  //=== token_owner: Key (user 2)===
  const hexString =
    "015931cd457cedc64d6724033f393ee93201ab2d81d3a598464646d7c05851d923"; //public key - nctl-view-user-account user=2

  const accounthash = new CLAccountHash(
    CLPublicKey.fromHex(hexString).toAccountHash()
  );

  const token_owner = new CLKey(accounthash);

  // === token_meta_data: string ===
  const meta_data_json = {
    name: "John Doe",
    symbol: "abc",
    token_uri: "https://www.barfoo.com",
  };

  const token_meta_data = new CLString(JSON.stringify(meta_data_json));

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      // "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      minting_contract_hash_array,
      "mint",
      RuntimeArgs.fromMap({
        nft_contract_hash: cep78_contract_hash_key,
        token_owner,
        token_meta_data,
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );
  deploy = client.signDeploy(deploy, keyPairofContract);

  let deployHash = await client.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};

main();
