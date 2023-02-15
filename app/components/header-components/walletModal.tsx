import { useContext, useState } from "react";

import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { TenderContext } from "~/contexts/tender-context";

interface Props {
  closeModal: Function;
}

export default function WalletModal({ closeModal }: Props) {
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  return (
    <div className="flex w-full h-full">
      <div className="connect-wallet modal">
        <div className="cover active"></div>
        <div className="container-small">
          <div className="accent neutral"></div>
          <div className="legacy-panel">
            <div className="header">
              <div className="close-x">
                <button></button>
              </div>
            </div>
            <div>
              <div className="connect-wallet-copy connect-wallet-copy--small-top">
                <span className="connect-wallet-copy__mark"></span>
                <h4>Connect Wallet</h4>
                <p className="center-text">To start using Lodestar</p>
                <div className="connect-choices">
                  <a className="connect-item">
                    <span className="connect-wallet-icon connect-wallet-icon--metamask"></span>
                    <h5 className="connect-item-text">Metamask</h5>
                    <span className="arrow big green"></span>
                  </a>
                  <div className="line"></div>
                  <a className="connect-item">
                    <span className="connect-wallet-icon connect-wallet-icon--wallet-connect"></span>
                    <h5 className="connect-item-text">Wallet Connect</h5>
                    <span className="arrow big green"></span>
                  </a>
                  <div className="line"></div>
                </div>
                <div className="terms-agreement">
                  <p className="small">
                    By connecting, I accept Lodestar's <a>Terms of Service</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
