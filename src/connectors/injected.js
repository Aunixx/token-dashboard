import { ConnectionType } from "./connector";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

export function buildInjectedConnector() {
  function onMetamaskError(error) {
    console.log(error.message);
  }
  const [web3MetamaskWallet, web3MetamaskWalletHooks] = initializeConnector(
    (actions) => new MetaMask({ actions, onError: onMetamaskError })
  );
  const injectedConnection = {
    connector: web3MetamaskWallet,
    hooks: web3MetamaskWalletHooks,
    type: ConnectionType.INJECTED,
  };

  return injectedConnection;
}
