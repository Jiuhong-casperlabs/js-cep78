import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLList,
  CLOption,
  CLByteArray,
} from "casper-js-sdk";
import * as utils from "../../utils.js";
import * as constants from "../../constants";
import { Some } from "ts-results";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  //cep78 contract-hash
  const cep78_contract_hash_str =
    "65053b7ee7602a9c4feb171396fcaf0315eef38b321e79bcb0bd92b7cf001631";
  const cep78_contract_hash_array = Uint8Array.from(
    Buffer.from(cep78_contract_hash_str, "hex")
  );

  //contract hash 1  - minting contract
  const contract_hash_1_str =
    "99d69094de50f91495b25857bbf43b2488871be224fdc4c0893680620863bf97";
  const contract_hash_1_array = new CLByteArray(
    Uint8Array.from(Buffer.from(contract_hash_1_str, "hex"))
  );

  // Vec<ContractHash>
  const contract_whitelist = new CLOption(
    Some(new CLList([contract_hash_1_array]))
  );

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      // "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      cep78_contract_hash_array,
      "set_variables",
      RuntimeArgs.fromMap({
        contract_whitelist,
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );
  deploy = client.signDeploy(deploy, keyPairofContract);

  let deployHash = await client.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};

main();
