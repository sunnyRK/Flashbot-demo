import React from "react";
import useContracts from "../hooks/useContracts";

// hooks and services

// components, styles and UI

// interfaces
export interface ApproveButtonProps {
  tokenName: "DAI" | "USDT" | "USDC";
}

const ApproveButton: React.FunctionComponent<ApproveButtonProps> = ({
  tokenName,
}) => {

  return (
    <div
      className="approve-token-button"
    >
      Approve {tokenName}
    </div>
  );
};

export default ApproveButton;
