import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLString,
  CLU64,
  CLU8,
  CLOption,
  CLBool,
} from "casper-js-sdk";
import * as utils from "../utils.js";
import * as constants from "../constants";
import { Some } from "ts-results";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  // nctl-view-user-account
  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  //   --session-arg "collection_name:string='enhanced-nft-1'" \
  const collection_name = new CLString("JH-NFT");
  // --session-arg "collection_symbol:string='ENFT-1'" \
  const collection_symbol = new CLString("JH");
  // --session-arg "total_token_supply:u64='10'" \
  const total_token_supply = new CLU64("10");
  // --------------------
  // |    Mode      | u8 |
  // --------------------
  // | Minter       | 0  |
  // --------------------
  // | Assigned     | 1  |
  // --------------------
  // | Transferable | 2  |
  // --------------------
  //
  // --session-arg "ownership_mode:u8='0'" \
  //
  const ownership_mode = new CLU8("2");
  //
  // --------------------
  // |   NFTKind   | u8 |
  // --------------------
  // | Physical    | 0  |
  // --------------------
  // | Digital     | 1  |
  // --------------------
  // | Virtual     | 2  |
  // --------------------
  //
  // --session-arg "nft_kind:u8='1'" \
  //
  const nft_kind = new CLU8(1);
  //
  // --------------------
  // | NFTHolderMode | u8 |
  // --------------------
  // | Accounts      | 0  |
  // --------------------
  // | Contracts     | 1  |
  // --------------------
  // | Mixed         | 2  |
  // --------------------
  //
  // --session-arg "holder_mode:opt_u8='2'" \
  const holder_mode = new CLOption(Some(new CLU8(2)));
  //
  // --------------------
  // | MintingMode | u8 |
  // --------------------
  // | Installer   | 0  |
  // --------------------
  // | Public      | 1  |
  // --------------------
  //
  // Optional
  //
  // --session-arg "json_schema:string='nft-schema'" \
  const json_schema = new CLString("nft-schema");
  //
  // allows minting when true
  //
  // --session-arg "allow_minting:bool='true'" \
  //
  const allow_minting = new CLBool(true);
  //
  // --------------------------
  // | NFTMetadataKind  | u8 |
  // -------------------------
  // | CEP78            | 0  |
  // -------------------------
  // | NFT721           | 1  |
  // -------------------------
  // | Raw              | 2  |
  // -------------------------
  // | CustomValidated  | 3  |
  // --------------------------
  //
  // == CEP-78 metadata example
  // {
  // "name": "John Doe",
  // "token_uri": "https://www.barfoo.com",
  // "checksum": "940bffb3f2bba35f84313aa26da09ece3ad47045c6a1292c2bbd2df4ab1a55fb"
  // }
  // ==
  // --session-arg "nft_metadata_kind:u8='1'" \
  //
  const nft_metadata_kind = new CLU8(1);
  //
  // --------------------------
  // | NFTIdentifierMode  | u8 |
  // ---------------------------
  // | Ordinal            | 0  |
  // ---------------------------
  // | Hash               | 1  |
  // ---------------------------
  //
  // --session-arg "identifier_mode:u8='0'" \
  const identifier_mode = new CLU8(0);
  //
  // --------------------------
  // | MetadataMutability | u8 |
  // ---------------------------
  // | Immutable          | 0  |
  // ---------------------------
  // | Mutable            | 1  |
  // ---------------------------
  //
  // --session-arg "metadata_mutability:u8='0'"
  const metadata_mutability = new CLU8(0);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      // "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(constants.PATH_TO_CONTRACT_CEP78),
      RuntimeArgs.fromMap({
        collection_name,
        collection_symbol,
        total_token_supply,
        ownership_mode,
        nft_kind,
        holder_mode,
        json_schema,
        allow_minting,
        nft_metadata_kind,
        identifier_mode,
        metadata_mutability,
      })
    ),
    DeployUtil.standardPayment(200000000000)
  );
  deploy = client.signDeploy(deploy, keyPairofContract);

  let deployHash = await client.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};

// contract hash-62991807466f8b768557ac2d4538614975df54cda74295f9e94435a89365a4f9
// package hash-775dfe8b4e958cebc219818a517f249669886eda915f5402beb7bdd86eb113fc
main();
