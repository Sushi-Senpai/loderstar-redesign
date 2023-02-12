import { useState, useEffect } from "react";
import type { Market, TokenPair } from "~/types/global";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { calculateApy, formatApy } from "~/lib/apy-calculations";
import {
  getBorrowLimitUsed,
  formatBigNumber,
  MINIMUM_REQUIRED_APPROVAL_BALANCE,
} from "~/lib/tender";
import { useInterval } from "./use-interval";
import { ethers, utils } from "ethers";
import SampleCTokenAbi from "~/config/sample-ctoken-abi";
import SampleCEtherAbi from "~/config/sample-CEther-abi";
import SampleErc20Abi from "~/config/sample-erc20-abi";
import SampleComptrollerAbi from "~/config/sample-comptroller-abi";
import { providers as mcProviders } from "@0xsequence/multicall";
import { formatUnits } from "ethers/lib/utils";
import { useGlpApy } from "./use-glp-apy";
import { useGmxApy } from "./use-gmx-apy";
import chainlinkAbi from "~/config/chainlink-abi";

// @todo maybe refactor (remove duplicate code from tender.ts, merge changes, etc.)
export function useMarkets(
  signer: JsonRpcSigner | null | undefined,
  supportedTokenPairs: TokenPair[],
  comptrollerAddress: string | undefined,
  priceOracleAddress: string | undefined,
  secondsPerBlock: number | undefined
) {
  let [markets, setMarkets] = useState<Market[]>([]);

  let pollingKey = useInterval(7_000);

  const getGlpApy = useGlpApy();
  const getGmxApy = useGmxApy();

  useEffect(() => {
    if (
      !signer ||
      !comptrollerAddress ||
      !priceOracleAddress ||
      !secondsPerBlock
    ) {
      return;
    }

    const mcProvider = new mcProviders.MulticallProvider(signer.provider);

    const getMarkets = async () => {
      const comptrollerContract = new ethers.Contract(
        comptrollerAddress,
        SampleComptrollerAbi,
        mcProvider
      );

      const address: string = await signer.getAddress();

      const tokenPromises = supportedTokenPairs.map((tp) => {
        const abi =
          tp.token.symbol === "ETH" ? SampleCEtherAbi : SampleCTokenAbi;
        const cTokenContract = new ethers.Contract(
          tp.cToken.address,
          abi,
          mcProvider
        );

        // getTotalBorrowedInUsd -> getCurrentlyBorrowing
        const borrowBalancePromise =
          cTokenContract.callStatic.borrowBalanceCurrent(address);

        // getAccountBorrowLimitInUsd -> borrowLimitForTokenInUsd ->
        // -> getCurrentlySupplying
        const balancePromise = cTokenContract.callStatic.balanceOf(address);
        const exchangeRateCurrentPromise = cTokenContract.exchangeRateStored();

        // -> collateralFactorForToken
        // const comptrollerMarketsPromise = comptrollerContract.markets(
        //   tp.cToken.address
        // );

        // -> borrowCaps
        const borrowCapsPromise = comptrollerContract.borrowCaps(
          tp.cToken.address
        );

        // -> supplyCaps
        const supplyCapsPromise = comptrollerContract.supplyCaps(
          tp.cToken.address
        );

        // getCurrentlySupplying -> ...
        // getCurrentlyBorrowing -> ...

        // getMaxBorrowLiquidity
        let cashPromise = cTokenContract.getCash();

        // getMarketData ->
        // -> formattedDepositApy -> calculateDepositApy
        const supplyRatePerBlockPromise = cTokenContract.supplyRatePerBlock();

        // -> formattedBorrowApy -> calculateBorrowApy
        const borrowRatePerBlockPromise = cTokenContract.borrowRatePerBlock();

        // -> getTotalBorrowed
        const totalBorrowsPromise = cTokenContract.totalBorrows();

        // -> getTotalSupply
        const totalReservesPromise = cTokenContract.totalReserves();

        // -> isGLP flag
        // const isGLPPromise = cTokenContract.isGLP();

        // getWalletBalance
        let walletBalancePromise;

        if (tp.token.symbol === "ETH") {
          walletBalancePromise = signer.getBalance();
        } else {
          const tokenContract = new ethers.Contract(
            tp.token.address,
            SampleErc20Abi,
            mcProvider
          );
          walletBalancePromise = tokenContract.balanceOf(address);
        }

        // hasSufficientAllowance
        let allowancePromise;
        const allowanceAddress = tp.token.address;

        if (allowanceAddress) {
          // workaround for native token
          let allowanceContract = new ethers.Contract(
            allowanceAddress,
            SampleErc20Abi,
            mcProvider
          );
          allowancePromise = allowanceContract.allowance(
            address,
            tp.cToken.address
          );
        }

        let supplySpeedsPromise;
        let borrowSpeedsPromise;

        if (supplySpeedsPromise) {
          // workaround for native token
          let speedsContract = new ethers.Contract(
            "0xeB156f76Ef69be485c18C297DeE5c45390345187",
            SampleComptrollerAbi,
            mcProvider
          );
          supplySpeedsPromise = speedsContract.compSupplySpeeds(
            tp.cToken.address
          );
          if (borrowSpeedsPromise) {
            borrowSpeedsPromise = speedsContract.compBorrowSpeeds(
              tp.cToken.address
            );
          }
        }


        // const autocompoundPromise = cTokenContract.autocompound();

        // let performanceFeePromise;
        // let withdrawFeePromise;

        // if (tp.token.cToken.isVault) {
        //   performanceFeePromise = cTokenContract.performanceFee();
        //   withdrawFeePromise = cTokenContract.withdrawFee();
        // } else {
        //   performanceFeePromise = new Promise((resolve) => {
        //     resolve(0);
        //   });
        //   withdrawFeePromise = new Promise((resolve) => {
        //     resolve(0);
        //   });
        // }

        return {
          borrowBalance: borrowBalancePromise,
          balance: balancePromise,
          exchangeRateCurrent: exchangeRateCurrentPromise,
          comptrollerMarkets: 1,
          cash: cashPromise,
          supplyRatePerBlock: supplyRatePerBlockPromise,
          borrowRatePerBlock: borrowRatePerBlockPromise,
          totalBorrows: totalBorrowsPromise,
          totalReserves: totalReservesPromise,
          tokenPair: tp,
          walletBalance: walletBalancePromise,
          allowance: allowancePromise,
          borrowCaps: borrowCapsPromise,
          supplyCaps: supplyCapsPromise,
          supplySpeeds: supplySpeedsPromise,
          borrowSpeeds: borrowSpeedsPromise
        };
      });

      const tokens = [];

      const liquidationIncentiveMantissaPromise =
        comptrollerContract.liquidationIncentiveMantissa();

      for (const tokenPromise of tokenPromises) {
        tokens.push({
          borrowBalance: await tokenPromise.borrowBalance,
          balance: await tokenPromise.balance,
          exchangeRateCurrent: await tokenPromise.exchangeRateCurrent,
          comptrollerMarkets: await tokenPromise.comptrollerMarkets,
          cash: await tokenPromise.cash,
          supplyRatePerBlock: await tokenPromise.supplyRatePerBlock,
          borrowRatePerBlock: await tokenPromise.borrowRatePerBlock,
          totalBorrows: await tokenPromise.totalBorrows,
          totalReserves: await tokenPromise.totalReserves,
          tokenPair: tokenPromise.tokenPair,
          walletBalance: await tokenPromise.walletBalance,
          allowance: tokenPromise.allowance
            ? await tokenPromise.allowance
            : MINIMUM_REQUIRED_APPROVAL_BALANCE,
          borrowCaps: await tokenPromise.borrowCaps,
          supplyCaps: await tokenPromise.supplyCaps,
          supplySpeeds: await tokenPromise?.supplySpeeds,
          borrowSpeeds: await tokenPromise?.borrowSpeeds
        });
      }

      const liquidationIncentiveMantissa = 1.052 * 100 - 100;
      const liquidationPenalty = liquidationIncentiveMantissa
        ? liquidationIncentiveMantissa
        : 0;

      // getTotalBorrowedInUsd
      const totalBorrowedAmountInUsd = tokens
        .map((token) => {
          return (
            formatBigNumber(
              token.borrowBalance,
              token.tokenPair.token.decimals
            ) * token.tokenPair.token.priceInEth
          );
        })
        .reduce((acc, curr) => acc + curr, 0);

      // getAccountBorrowLimitInUsd
      const accountBorrowLimitInUsd = tokens
        .map((token) => {
          // the exchange rate is scaled by 18 decimals
          const suppliedAmount = formatBigNumber(
            token.balance.mul(token.exchangeRateCurrent),
            token.tokenPair.token.decimals + 18
          );

          const collateralFactor = 1

          return (
            suppliedAmount * (token.tokenPair.token.priceInEth) * collateralFactor
          );
        })
        .reduce((acc, curr) => acc + curr, 0);

      const newMarkets = tokens.map(async (token): Promise<Market> => {
        const tp = token.tokenPair;
        const supplyBalance = formatBigNumber(
          token.balance.mul(token.exchangeRateCurrent),
          tp.token.decimals + 18
        );
        const borrowBalance = formatBigNumber(
          token.borrowBalance,
          tp.token.decimals
        );

        const supplyBalanceInUsd = supplyBalance * tp.token.priceInEth;
        const borrowBalanceInUsd = borrowBalance * tp.token.priceInEth;

        const maxBorrowLiquidity = parseFloat(
          utils.formatUnits(token.cash, tp.token.decimals)
        );

        // walletBalance
        const walletBalance = token.walletBalance.toString();
        let depositApy;
        if (tp.token.symbol === "GLP") {
          const glpApy = await getGlpApy(signer, tp);
          depositApy = formatApy(glpApy);
        } else if (tp.token.symbol === "GMX") {
          const gmxApy = await getGmxApy(signer, tp, priceOracleAddress);

          const tokenSupplyApy = calculateApy(
            token.supplyRatePerBlock,
            secondsPerBlock
          );
          depositApy = formatApy(gmxApy + tokenSupplyApy);
        } else {
          // marketData
          depositApy = formatApy(
            calculateApy(token.supplyRatePerBlock, secondsPerBlock)
          );
        }

        const borrowApy = formatApy(
          calculateApy(token.borrowRatePerBlock, secondsPerBlock)
        );

        const totalBorrowed = formatBigNumber(
          token.totalBorrows,
          token.tokenPair.token.decimals
        );

        let marketSize = formatBigNumber(
          token.cash.add(token.totalBorrows).sub(token.totalReserves),
          token.tokenPair.token.decimals
        );

        const liquidationThreshold = 1

        const collateralFactor = 1

        return {
          id: tp.token.symbol,
          tokenPair: tp,
          marketData: {
            depositApy,
            borrowApy,
            totalBorrowed,
            marketSize,
          },
          walletBalance,
          supplyBalance,
          supplyBalanceInUsd,
          borrowBalance,
          borrowBalanceInUsd,
          comptrollerAddress,
          borrowLimit: accountBorrowLimitInUsd,
          totalBorrowedAmountInUsd,
          borrowLimitUsedOfToken: await getBorrowLimitUsed(
            borrowBalanceInUsd,
            accountBorrowLimitInUsd
          ),
          borrowLimitUsed: await getBorrowLimitUsed(
            totalBorrowedAmountInUsd,
            accountBorrowLimitInUsd
          ),
          maxBorrowLiquidity,
          hasSufficientAllowance: token.allowance.gte(
            MINIMUM_REQUIRED_APPROVAL_BALANCE
          ),
          // -> for now, isBorrowable is derived from isGLP this can change in future, update when it changes
          isBorrowable: true,
          liquidationThreshold,
          liquidationPenalty,
          borrowCaps: token.borrowCaps.toString(),
          supplyCaps: token.supplyCaps.toString(),
          collateralFactor,
          supplySpeeds: token.supplySpeeds,
          borrowSpeeds: token.borrowSpeeds
        };
      });

      Promise.all(newMarkets).then((nm) => setMarkets(nm));
    };

    getMarkets();
  }, [
    signer,
    supportedTokenPairs,
    comptrollerAddress,
    pollingKey,
    secondsPerBlock,
    getGlpApy,
    priceOracleAddress,
    getGmxApy,
  ]);

  return markets;
}
