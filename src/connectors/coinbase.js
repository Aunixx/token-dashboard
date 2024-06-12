import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";

import { ConnectionType } from "./connector";

export function buildCoinbaseWalletConnector() {
  const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector(
    (actions) =>
      new CoinbaseWallet({
        actions,
        options: {
          url: "https://mainnet.infura.io/v3/8b583dc450b444638871d95850615c27",
          appName: "Token Overview",
          reloadOnDisconnect: false,
        },
        onError: (error) => console.error(error.message),
      })
  );
  const coinbaseWalletConnection = {
    connector: web3CoinbaseWallet,
    hooks: web3CoinbaseWalletHooks,
    type: ConnectionType.COINBASE_WALLET,
  };

  return coinbaseWalletConnection;
}
