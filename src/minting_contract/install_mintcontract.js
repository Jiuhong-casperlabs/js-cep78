import { DeployUtil, CasperClient, RuntimeArgs } from "casper-js-sdk";
import * as utils from "../../utils.js";
import * as constants from "../../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  // nctl-view-user-account
  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      // "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(constants.PATH_TO_CONTRACTMINTING),
      RuntimeArgs.fromMap({})
    ),
    DeployUtil.standardPayment(200000000000)
  );
  deploy = client.signDeploy(deploy, keyPairofContract);

  let deployHash = await client.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};
main();
