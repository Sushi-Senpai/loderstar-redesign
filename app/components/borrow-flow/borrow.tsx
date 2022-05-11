import { ICON_SIZE } from "~/lib/constants";
import type { Market, TokenPair } from "~/types/global";
import { useEffect, useState, useRef } from "react";
import type { JsonRpcSigner } from "@ethersproject/providers";

import clsx from "clsx";
import toast from "react-hot-toast";
import Max from "~/components/max";

import { borrow } from "~/lib/tender";
import { useValidInput } from "~/hooks/use-valid-input";
import BorrowBalance from "../fi-modal/borrow-balance";
import { useProjectBorrowLimit } from "~/hooks/use-project-borrow-limit";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import { useCurrentlyBorrowing } from "~/hooks/use-currently-borrowing";

import ConfirmingTransaction from "../fi-modal/confirming-transition";

interface Props {
  market: Market;
  closeModal: Function;
  setIsRepaying: Function;
  signer: JsonRpcSigner | null | undefined;
  borrowLimitUsed: string;
  borrowLimit: number;
  walletBalance: number;
  tokenPairs: TokenPair[];
  totalBorrowedAmountInUsd: number;
}

export default function Borrow({
  market,
  closeModal,
  setIsRepaying,
  signer,
  borrowLimit,
  borrowLimitUsed,
  tokenPairs,
  totalBorrowedAmountInUsd,
}: Props) {
  let [isWaitingToBeMined, setIsWaitingToBeMined] = useState<boolean>(false);
  let [value, setValue] = useState<string>("");
  let [isBorrowing, setIsBorrowing] = useState<boolean>(false);
  let inputEl = useRef<HTMLInputElement>(null);
  let currentlyBorrowing = useCurrentlyBorrowing(
    signer,
    market.tokenPair.cToken,
    market.tokenPair.token
  );
  let isValid = useValidInput(value, 0, borrowLimit);

  let newBorrowLimit = useProjectBorrowLimit(
    signer,
    market.comptrollerAddress,
    tokenPairs,
    market.tokenPair.cToken,
    `-${value}`
  );

  let newBorrowLimitUsed = useBorrowLimitUsed(
    totalBorrowedAmountInUsd,
    newBorrowLimit
  );

  // Highlights value input
  useEffect(() => {
    inputEl && inputEl.current && inputEl.current.select();
  }, []);

  return (
    <div>
      {isWaitingToBeMined && (
        <ConfirmingTransaction stopWaitingOnConfirmation={() => closeModal()} />
      )}
      {!isWaitingToBeMined && (
        <div>
          <div>
            <div className="py-8 bg-brand-black-light">
              <div className="float-right">
                <button
                  onClick={() => closeModal()}
                  className="text-4xl rotate-45 text-gray-400 mr-8"
                >
                  +
                </button>
              </div>
              <div className="flex align-middle justify-center items-center">
                <img
                  src={market.tokenPair.token.icon}
                  style={{ width: ICON_SIZE }}
                  className="mr-3"
                  alt="icon"
                />
                <div>Borrow {market.tokenPair.token.symbol}</div>
              </div>

              <div className="flex flex-col justify-center items-center overflow-hidden">
                <input
                  ref={inputEl}
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-transparent text-6xl text-white text-center outline-none"
                  defaultValue={0}
                />

                <Max
                  maxValue={`${borrowLimit}`}
                  updateValue={() => {
                    if (!inputEl || !inputEl.current) return;
                    inputEl.current.focus();
                    inputEl.current.value = `${borrowLimit}`;
                    setValue(`${borrowLimit}`);
                  }}
                  maxValueLabel={market.tokenPair.token.symbol}
                />
              </div>
            </div>
            <div className="flex">
              <button
                className="flex-grow py-3 text-brand-green border-b-2 border-b-brand-green"
                onClick={() => setIsRepaying(false)}
              >
                Borrow
              </button>
              <button
                className="flex-grow py-3"
                onClick={() => setIsRepaying(true)}
              >
                Repay
              </button>
            </div>
            <div className="py-8" style={{ background: "#1C1E22" }}>
              <div className="py-6 px-12" style={{ background: "#1C1E22" }}>
                <div className="flex mb-4">
                  <span className="font-bold mr-3">Borrow Rates</span>{" "}
                </div>
                <div className="flex items-center mb-3 text-gray-400  pb-6">
                  <img
                    src={market.tokenPair.token.icon}
                    style={{ width: ICON_SIZE }}
                    className="mr-3"
                    alt="icon"
                  />
                  <div className="flex-grow">Borrow APY</div>
                  <div>{market.marketData.borrowApy}</div>
                </div>

                <BorrowBalance
                  value={value}
                  isValid={isValid}
                  borrowBalance={totalBorrowedAmountInUsd}
                  newBorrowBalance={totalBorrowedAmountInUsd + +value}
                  borrowLimitUsed={borrowLimitUsed}
                  newBorrowLimitUsed={newBorrowLimitUsed}
                />

                <div className="mb-8">
                  {!signer && <div>Connect wallet to get started</div>}
                  {signer && !isValid && (
                    <button className="py-4 text-center text-white font-bold rounded  w-full bg-gray-200">
                      Borrow
                    </button>
                  )}
                  {signer && isValid && (
                    <button
                      onClick={async () => {
                        try {
                          if (!value) {
                            toast("Please set a value", {
                              icon: "⚠️",
                            });
                            return;
                          }
                          setIsBorrowing(true);

                          let txn = await borrow(
                            value,
                            signer,
                            market.tokenPair.cToken,
                            market.tokenPair.token
                          );

                          setIsWaitingToBeMined(true);
                          await txn.wait(); // TODO: error handle if transaction fails
                          setIsWaitingToBeMined(false);
                          //   setValue("");
                          toast.success("Borrow successful");
                          closeModal();
                        } catch (e) {
                          console.error(e);
                        } finally {
                          setIsBorrowing(false);
                        }
                      }}
                      className={clsx(
                        "py-4 text-center text-white font-bold rounded bg-brand-green w-full",
                        {
                          "bg-brand-green": !isBorrowing,
                          "bg-gray-200": isBorrowing,
                        }
                      )}
                    >
                      {isBorrowing ? "Borrowing..." : "Borrow"}
                    </button>
                  )}
                </div>

                <div className="flex text-gray-500">
                  <div className="flex-grow">Currently Borrowing</div>
                  <div>
                    {currentlyBorrowing} {market.tokenPair.token.symbol}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
