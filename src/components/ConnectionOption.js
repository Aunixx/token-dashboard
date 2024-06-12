import { CoinbaseIcon } from "../assets/svg/coinbase";
import { MetaMaskIcon } from "../assets/svg/metamask";
import {
  ConnectionType,
  getHasMetaMaskExtensionInstalled,
} from "../connectors/connector";
import { Option } from "./Option";

export const ConnectionOptions = ({
  connectionType,
  isActive,
  setConnectionType,
}) => {
  function getOptions(isActive) {
    const hasMetaMaskExtension = getHasMetaMaskExtensionInstalled();

    let meteMaskOption;
    if (!hasMetaMaskExtension) {
      meteMaskOption = (
        <a href="https://metamask.io/">
          <button>Install Metamask</button>
        </a>
      );
    } else {
      meteMaskOption = (
        <Option
          isActive={isActive}
          activeConnectionType={connectionType}
          connectionType={ConnectionType.INJECTED}
          setConnectionType={setConnectionType}
          text="Metamask"
          icon={<MetaMaskIcon />}
        />
      );
    }

    const coinbaseWalletOption = (
      <Option
        isActive={isActive}
        activeConnectionType={connectionType}
        connectionType={ConnectionType.COINBASE_WALLET}
        setConnectionType={setConnectionType}
        icon={<CoinbaseIcon />}
        text="Coinbase"
      />
    );

    return (
      <>
        {meteMaskOption}
        {coinbaseWalletOption}
      </>
    );
  }

  return (
    <div className="connectors">
      <h1>Connect Your Wallet</h1>
      {getOptions(isActive)}
    </div>
  );
};
