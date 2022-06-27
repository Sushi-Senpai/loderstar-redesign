import { ICON_SIZE } from "~/lib/constants";
import type { Market } from "~/types/global";
import { useEffect, useState, useRef, useContext } from "react";
import type { JsonRpcSigner, TransactionReceipt } from "@ethersproject/providers";
import toast from "react-hot-toast";
import Max from "~/components/max";
import * as math from "mathjs"
import clsx from "clsx";

import { redeem } from "~/lib/tender";
import { useValidInput } from "~/hooks/use-valid-input";
import BorrowLimit from "../fi-modal/borrow-limit";
import { useProjectBorrowLimit } from "~/hooks/use-project-borrow-limit";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import ConfirmingTransaction from "../fi-modal/confirming-transition";
import { TenderContext } from "~/contexts/tender-context";
import { shrinkyInputClass, toCryptoString } from "~/lib/ui";
import { displayTransactionResult } from "../displayTransactionResult";

export interface WithdrawProps {
  market: Market;
  closeModal: Function;
  setIsSupplying: Function;
  borrowLimit: number;
  signer: JsonRpcSigner | null | undefined;
  borrowLimitUsed: string;
  walletBalance: number;
  totalBorrowedAmountInUsd: number;
}
export default function Withdraw({
  market,
  closeModal,
  setIsSupplying,
  borrowLimit,
  signer,
  borrowLimitUsed,
  totalBorrowedAmountInUsd,
}: WithdrawProps) {
  let [value, setValue] = useState<string>("0");
  let [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  let [txnHash, setTxnHash] = useState<string>("");
  let inputEl = useRef<HTMLInputElement>(null);


  let { tokenPairs, updateTransaction, setIsWaitingToBeMined } = useContext(TenderContext);

  let newBorrowLimit = useProjectBorrowLimit(
    signer,
    market.comptrollerAddress,
    tokenPairs,
    market.tokenPair,
    `-${value}`
  );

  let newBorrowLimitUsed = useBorrowLimitUsed(
    totalBorrowedAmountInUsd,
    newBorrowLimit
  );

  var maxWithdrawAmount: number = Math.min(
    market.supplyBalance, // how much we're supplying
    market.maxBorrowLiquidity, // how much cash the contract has
  );

  // // if there is a borrow balance
  // if (totalBorrowedAmountInUsd > 0) {
  //   // 0.8 * (totalSupply - totalBorrow balance / token price)
  //   // if there is a borrow or else 100%
  // }


  let [isValid, validationDetail] = useValidInput(
    value,
    0,
    maxWithdrawAmount,
    parseFloat(newBorrowLimitUsed)
  );

  let inputTextClass = shrinkyInputClass(value.length);

  // Highlights value input
  useEffect(() => {
    inputEl && inputEl.current && inputEl.current.select();
  }, []);

  return (
    <div>
      {(txnHash !== "") && (
        <ConfirmingTransaction
          txnHash={txnHash}
          stopWaitingOnConfirmation={() => closeModal()}
        />
      )}
      {(txnHash === "") && (
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
                <div>Withdraw {market.tokenPair.token.symbol}</div>
              </div>

              <div className="flex flex-col justify-center items-center overflow-hidden">
                <input
                  ref={inputEl}
                  style={{ minHeight: 90 }}
                  onChange={(e) => setValue(e.target.value)}
                  className={`w-full bg-transparent text-white text-center outline-none ${inputTextClass}`}
                  defaultValue={0}
                />

                {parseFloat(borrowLimitUsed) < 80 && (
                  <Max
                    maxValue={math.format(maxWithdrawAmount, {notation: "fixed"})}
                    updateValue={() => {
                      if (!inputEl || !inputEl.current) return;
                      let value = math.format(maxWithdrawAmount, {notation: "fixed"})
                      inputEl.current.focus();
                      inputEl.current.value = value;
                      setValue(value);
                    }}
                    label="Max"
                    maxValueLabel={market.tokenPair.token.symbol}
                  />
                )}
              </div>
            </div>
            <div className="flex">
              <button
                className="flex-grow py-3"
                onClick={() => setIsSupplying(true)}
              >
                Deposit
              </button>
              <button
                className="flex-grow py-3 text-brand-green border-b-2 border-b-brand-green"
                onClick={() => setIsSupplying(false)}
              >
                Withdraw
              </button>
            </div>
            <div className="py-8" style={{ background: "#1C1E22" }}>
              <div className="py-6 px-12" style={{ background: "#1C1E22" }}>
                <div className="flex mb-4">
                  <span className="font-bold mr-3">Deposit Rates</span>{" "}
                </div>
                <div className="flex items-center mb-3 text-gray-400  pb-6">
                  <img
                    src={market.tokenPair.token.icon}
                    style={{ width: ICON_SIZE }}
                    className="mr-3"
                    alt="icon"
                  />
                  <div className="flex-grow">Deposit APY</div>
                  <div>{market.marketData.depositApy}</div>
                </div>

                <BorrowLimit
                  value={value}
                  isValid={isValid}
                  borrowLimit={borrowLimit}
                  newBorrowLimit={newBorrowLimit}
                  borrowLimitUsed={borrowLimitUsed}
                  newBorrowLimitUsed={newBorrowLimitUsed}
                />

                <div className="mb-8">
                  {!signer && <div>Connect wallet to get started</div>}
                  {signer && !isValid && (
                    <button className="py-4 text-center text-white font-bold rounded w-full bg-gray-600">
                      {validationDetail}
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
                          setIsWithdrawing(true);
                          toast.loading("Waiting for confirmation")
                          // @ts-ignore existence of signer is gated above.
                          let txn = await redeem(
                            value,
                            signer,
                            market.tokenPair.cToken,
                            market.tokenPair.token
                          );

                          setTxnHash(txn.hash);
                          setIsWaitingToBeMined(true);

                          let tr: TransactionReceipt = await txn.wait(2); // TODO: error handle if transaction fails
                          updateTransaction(tr.blockHash);

                          // wait an extra 3 seconds for latency
                          displayTransactionResult(tr.transactionHash, "Withdraw successful");

                          setValue("");
                        } catch (e) {
                          toast.dismiss()
                          console.log(e)
 
                          if (e.transaction?.hash) {
                            toast.error(()=><p>
                              <a target="_blank" href={`https://andromeda-explorer.metis.io/tx/${e.transactionHash}/internal-transactions/`}>
                                Withdraw unsuccessful
                              </a> 
                            </p>)
                          } else {
                            toast.error("Withdraw unsuccessful.");
                          }
                          } finally {
                          setIsWaitingToBeMined(false);
                          setIsWithdrawing(false);
                        }
                      }}
                      className={clsx(
                        "py-4 text-center text-white font-bold rounded w-full",
                        {
                          "bg-brand-green": !isWithdrawing,
                          "bg-gray-600": isWithdrawing,
                        }
                      )}
                    >
                      {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                    </button>
                  )}
                </div>

                <div className="flex text-gray-500">
                  <div className="flex-grow">Currently Supplying</div>
                  <div>
                    {toCryptoString(market.supplyBalance)}{" "}
                    {market.tokenPair.token.symbol}
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
