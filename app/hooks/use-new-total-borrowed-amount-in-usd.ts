import { useState, useEffect, useContext } from "react";
import type { TokenPair } from "~/types/global";
import { TenderContext } from "~/contexts/tender-context";

export function useNewTotalBorrowedAmountInUsd(
  tokenPair: TokenPair,
  currentTotalBorrowedInUsd: number,
  newTokenBorrowAmount: number
): number {
  let [newTotalBorrowedAmountInUsd, setNewTotalBorrowedAmountInUsd] =
    useState<number>(0);
  let { currentTransaction } = useContext(TenderContext);
  const tenderContextData = useContext(TenderContext);

  useEffect(() => {
    if (!tokenPair) {
      return;
    }

    let newBorrowAmountInUsd: number =
      newTokenBorrowAmount * tokenPair.token.priceInEth;

    setNewTotalBorrowedAmountInUsd(
      currentTotalBorrowedInUsd + newBorrowAmountInUsd
    );
  }, [tokenPair, currentTotalBorrowedInUsd, newTokenBorrowAmount, currentTransaction]);

  return newTotalBorrowedAmountInUsd;
}
