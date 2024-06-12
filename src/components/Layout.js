import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Dashboard from "./Dashboard";
import Login from "./Login";

const Layout = () => {
  const [connectionType, setConnectionType] = useState(null);
  const { isActive } = useWeb3React();
  return (
    <>
      {connectionType && isActive ? (
        <Dashboard
          connectionType={connectionType}
          setConnectionType={setConnectionType}
        />
      ) : (
        <Login
          connectionType={connectionType}
          setConnectionType={setConnectionType}
        />
      )}
    </>
  );
};

export default Layout;
