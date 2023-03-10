import type { JsonRpcSigner } from "@ethersproject/providers";
import {useState, useEffect, useContext} from "react";
import { projectBorrowLimit } from "~/lib/tender";
import type { TokenPair } from "~/types/global";
import {TenderContext} from "~/contexts/tender-context";

export function useProjectBorrowLimit(
  signer: JsonRpcSigner | undefined | null,
  comptrollerAddress: string,
  tokenPairs: TokenPair[],
  tokenPair: TokenPair,
  value: string
): number {
  let [newBorrowLimit, setNewBorrowLimit] = useState<number>(0);
  let { currentTransaction } = useContext(TenderContext);

  useEffect(() => {
    if (!signer) {
      return;
    }

    projectBorrowLimit(
      signer,
      comptrollerAddress,
      tokenPairs,
      tokenPair,
      parseFloat(value)
    ).then((v) => setNewBorrowLimit(v));
  }, [signer, comptrollerAddress, tokenPairs, tokenPair, value, currentTransaction]);

  return newBorrowLimit;
}
