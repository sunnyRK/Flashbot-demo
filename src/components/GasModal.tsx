import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import CustomButton from "./CustomButton";
import useContracts from "../hooks/useContracts";
import { useStoreState } from "../store/globalStore";


const GasModal: React.FunctionComponent = () => {
  const { connected } = useStoreState((state) => state);
  const { getFlashBotProvider } = useContracts();

  const [open, setOpen] = useState(false);

  const [selectedToken, setSelectedToken] = useState<"DAI" | "USDC" | "USDT">(
    "USDC"
  );

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  
  return (
    <>
      <CustomButton
        color="green"
        title="Flashbots"
        description="Send Transaction in bundle"
        icon="dollar-sign"
        onClick={onOpenModal}
        disabled={!connected}
      />
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "modal",
        }}
      >
        <div className="header">
          <div className="tabs">
          </div>
        </div>

        <div className="body">
          
          <div className="token-action">
              <div className="pay-tx">
                
                <div className="buttons">
                </div>
                  <div className="buttons">
                    <div className="tx-button proceed" onClick={getFlashBotProvider}>
                      Flashbot Transaction
                    </div>                
                  </div>
              </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GasModal;
