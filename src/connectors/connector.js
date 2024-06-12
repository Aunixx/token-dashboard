import { buildInjectedConnector } from "./injected";
import { buildCoinbaseWalletConnector } from "./coinbase";

export const ConnectionType = {
  COINBASE_WALLET: "COINBASE_WALLET",
  INJECTED: "INJECTED",
};

export const PRIORITIZED_CONNECTORS = {
  [ConnectionType.INJECTED]: buildInjectedConnector(),
  [ConnectionType.COINBASE_WALLET]: buildCoinbaseWalletConnector(),
};

export function getHasMetaMaskExtensionInstalled() {
  return window.ethereum?.isMetaMask || false;
}

function onConnectionError(error) {
  console.error(`web3-react error: ${error.message}`);
}

export function getConnection(connectorOrType) {
  if (connectorOrType) {
    const connection = Object.values(PRIORITIZED_CONNECTORS).find(
      (conn) => conn.type === connectorOrType
    );
    if (!connection) {
      throw new Error("unsupported Connector");
    }
    return connection;
  } else {
    switch (connectorOrType) {
      case ConnectionType.INJECTED:
        return PRIORITIZED_CONNECTORS[ConnectionType.INJECTED];
      case ConnectionType.COINBASE_WALLET:
        return PRIORITIZED_CONNECTORS[ConnectionType.COINBASE_WALLET];
      default:
        throw new Error("Unknown connection type");
    }
  }
}

export async function tryActivateConnector(connector) {
  try {
    await connector.activate();
    return getConnection(connector).type;
  } catch (error) {
    onConnectionError(error);
  }
}

export async function tryDeactivateConnector(connector) {
  try {
    if (connector) {
      await connector.deactivate?.();
      connector.resetState();
    }
    return null;
  } catch (error) {
    onConnectionError(error);
  }
}
