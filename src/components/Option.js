import React, { useCallback, useMemo } from "react";

import {
  ConnectionType,
  getConnection,
  tryActivateConnector,
  tryDeactivateConnector,
} from "../connectors/connector";

export const Option = ({
  isActive,
  activeConnectionType,
  connectionType,
  setConnectionType,
  icon,
  text,
}) => {
  const isOptionActive = useMemo(
    () => isActive && activeConnectionType === connectionType,
    [isActive, activeConnectionType, connectionType]
  );

  const isOtherOptionActive = useMemo(
    () =>
      isActive &&
      activeConnectionType !== connectionType &&
      activeConnectionType !== ConnectionType.NETWORK,
    [isActive, activeConnectionType, connectionType]
  );

  const onClick = useCallback(async () => {
    if (isOptionActive) {
      const deactivation = await tryDeactivateConnector(
        getConnection(connectionType).connector
      );
      if (deactivation === undefined) {
        return;
      }
      setConnectionType(deactivation);
      return;
    }
    const activation = await tryActivateConnector(
      getConnection(connectionType).connector
    );

    setConnectionType(connectionType);

    if (!activation) {
      return;
    }
    return;
  }, [isOptionActive, connectionType, setConnectionType]);

  return (
    <button
      onClick={() => {
        onClick();
      }}
      disabled={isOtherOptionActive}
    >
      {icon}
      {text}
    </button>
  );
};
