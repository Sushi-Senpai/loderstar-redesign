import { useState, useEffect, useContext } from "react";
import { TenderContext } from "~/contexts/tender-context";
import { getBorrowLimitUsed } from "~/lib/tender";
import { useInterval } from "./use-interval";

export function useBorrowLimitUsed(
  borrowedAmount: number,
  borrowLimit: number
): string {
  let [borrowLimitUsed, setBorrowLimitUsed] = useState<string>("");

  let { currentTransaction } = useContext(TenderContext);
  let pollKey = useInterval(7_000);

  useEffect(() => {
    getBorrowLimitUsed(borrowedAmount, borrowLimit).then((b) =>
      setBorrowLimitUsed(b)
    );
  }, [borrowedAmount, borrowLimit, currentTransaction, pollKey]);

  return borrowLimitUsed;
}
