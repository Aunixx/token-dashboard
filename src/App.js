import { Web3ReactProvider } from "@web3-react/core";
import { PRIORITIZED_CONNECTORS } from "./connectors/connector";
import Layout from "./components/Layout";
import "./App.scss";

function App() {
  return (
    <Web3ReactProvider
      connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [
        connector.connector,
        connector.hooks,
      ])}
    >
      <Layout />
    </Web3ReactProvider>
  );
}

export default App;
