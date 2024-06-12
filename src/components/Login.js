import { ConnectionOptions } from "./ConnectionOption";
import logo from "../assets/img/logo.png";

const Login = ({ setConnectionType, connectionType, isActive }) => {
  // const handleActivate = async (connector) => {
  //   try {
  //     await activate(connector);
  //     setIsWalletConnected(true);
  //   } catch (error) {
  //     console.error("Connection error", error);
  //   }
  // };

  // const handleDeactivate = () => {
  //   try {
  //     deactivate();
  //     setIsWalletConnected(false);
  //   } catch (error) {
  //     console.error("Disconnection error", error);
  //   }
  // };

  return (
    <div className="login-page">
      <img src={logo} alt="logo" />
      <ConnectionOptions
        connectionType={connectionType}
        isActive={isActive}
        setConnectionType={setConnectionType}
      />
    </div>
  );
};

export default Login;
