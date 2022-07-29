export const PATH_TO_SOURCE_KEYS = `/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1`;

// Path to an ERC20 samrt contract wasm file.
export const PATH_TO_CONTRACT_MINT =
  process.env.PATH_TO_CONTRACT_MINT ||
  "/home/jh/caspereco/cep-78-enhanced-nft/client/mint_session/target/wasm32-unknown-unknown/release/mint_call.wasm";

export const PATH_TO_CONTRACT_CEP78 =
  "/home/jh/caspereco/cep-78-enhanced-nft/contract/target/wasm32-unknown-unknown/release/contract.wasm";
export const PATH_TO_CONTRACT_BALANCE =
  "/home/jh/caspereco/cep-78-enhanced-nft/client/balance_of_session/target/wasm32-unknown-unknown/release/balance_of_call.wasm";

// Gas price to be offered.
export const DEPLOY_GAS_PRICE = process.env.CSPR_INTS_DEPLOY_GAS_PRICE
  ? parseInt(process.env.CSPR_INTS_DEPLOY_GAS_PRICE)
  : 1;

// Address of target node.
export const DEPLOY_NODE_ADDRESS =
  process.env.CSPR_INTS_DEPLOY_NODE_ADDRESS || "http://localhost:11101/rpc";
// process.env.CSPR_INTS_DEPLOY_NODE_ADDRESS || "http://3.208.91.63:7777/rpc";

// Time interval in milliseconds after which deploy will not be processed by a node.
export const DEPLOY_TTL_MS = process.env.CSPR_INTS_DEPLOY_TTL_MS || 1800000;
