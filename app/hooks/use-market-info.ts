import { useContext, useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { TenderContext } from "~/contexts/tender-context";
import { useGlpApy } from "./use-glp-apy";
import { ethers } from "ethers";
import {
  calculateApy,
  getGlpAprPerBlock,
  getGmxAprPerBlock,
} from "~/lib/apy-calculations";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useInterval } from "~/hooks/use-interval";
import { useGmxApy } from "./use-gmx-apy";
import sampleCtokenAbi from "~/config/sample-ctoken-abi";
import { formatBigNumber } from "~/lib/tender"
import chainlinkAbi from "~/config/chainlink-abi";
import samplePriceOracleAbi from "~/config/sample-price-oracle-abi";

export function useMarketInfo(tokenId: string | undefined) {
  const [marketInfo, setMarketInfo] = useState<{
    market: any;
    historicalData: any;
  }>({
    market: false,
    historicalData: false,
  });
  const pollingKey = useInterval(7_000);
  const { networkData, tokenPairs, currentTransaction } =
    useContext(TenderContext);
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);
  const tokenPair = tokenPairs.find(
    (tp) => tp.token.symbol === String(tokenId)
  );

  useEffect(() => {

    if (!signer || !networkData || tokenPairs.length === 0) {
      return;
    }

    const getMarketInfo = async () => {
      const graphUrl = networkData.graphUrl;
      const secondsPerBlock = networkData.secondsPerBlock;
      const l2SecondsPerBlock = networkData.l2SecondsPerBlock;

      if (!tokenPair) {
        return;
      }

      const token = tokenPair.token;
      const address = token.cToken.address.toLowerCase();
      const underlyingPriceUSD = token.priceInEth;

      let response = {
        markets: new Array<any>(),
        accountCTokens: new Array<any>()
      }

      response.markets.push(await getTokenMarketInfo(address));

      //       const response = await request(
      //         graphUrl,
      //         gql`
      //     {
      //   markets(where: {id: "${address}"}) {
      //     borrowRate
      //     cash
      //     collateralFactor
      //     exchangeRate
      //     interestRateModelAddress
      //     name
      //     reserves
      //     supplyRate
      //     symbol
      //     id
      //     totalBorrows
      //     totalSupply
      //     underlyingAddress
      //     underlyingName
      //     underlyingPrice
      //     underlyingSymbol
      //     accrualBlockNumber
      //     blockTimestamp
      //     borrowIndex
      //     reserveFactor
      //     underlyingPriceUSD
      //     underlyingDecimals
      //   },
      //     accountCTokens (where: {enteredMarket: true, symbol: "${token?.cToken?.symbol}"}) {
      //       cTokenBalance
      //       storedBorrowBalance
      //     },
      //     ${statsQuery}
      // }
      // `
      //       );

      if (
        !response ||
        typeof response.markets === "undefined" ||
        typeof response.accountCTokens === "undefined"
      ) {
        return;
      }

      const market = response.markets[0];

      market.icon = token?.icon;
      market.tokenSymbol = token?.symbol;
      market.cTokenSymbol = token?.cToken?.symbol;
      market.underlyingPriceUSD = underlyingPriceUSD;

      market.totalBorrowersCount = response.accountCTokens.filter(
        (account: { storedBorrowBalance: number }) =>
          account.storedBorrowBalance > 0
      ).length;
      market.totalSuppliersCount = response.accountCTokens.filter(
        (account: { cTokenBalance: number }) => account.cTokenBalance > 0
      ).length;

      // @todo refactor
      const daysPerYear = 365;
      const blocksPerDay = (60 * 60 * 24) / secondsPerBlock;
      const ethBlocksPerYear = 2102400; // subgraph uses 2102400

      const supplyRate = market.supplyRate / ethBlocksPerYear;
      market.supplyApy =
        (Math.pow(supplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;

      market.isBorrowable = true;
      const borrowRate = market.borrowRate / ethBlocksPerYear;
      market.borrowApy =
        (Math.pow(borrowRate * blocksPerDay + 1, daysPerYear) - 1) * 100;

      market.totalSupplyUSD =
        (parseFloat(market.cash) +
          parseFloat(market.totalBorrows) -
          parseFloat(market.reserves)) *
        market.underlyingPriceUSD;
      market.totalBorrowUSD = market.totalBorrows * market.underlyingPriceUSD;

      // delete response.markets;
      // delete response.accountCTokens;

      setMarketInfo({
        market: market,
        historicalData: null,
      });
    };

    getMarketInfo();
  }, [
    networkData,
    tokenId,
    signer,
    tokenPairs,
    tokenPair,
    currentTransaction,
    pollingKey,
  ]);

  async function getTokenMarketInfo(address: string) {
    // ***********************blockTimestamp
    let contract = new ethers.Contract(
      address,
      sampleCtokenAbi,
      signer
    );

    // let chainLinkContract = new ethers.Contract(
    //   '0x639fe6ab55c921f74e7fac1ee960c0b6293ba612',
    //   chainlinkAbi,
    //   signer
    // );

    // let ethPriceInUsd: number = await chainLinkContract.latestAnswer();
    // ethPriceInUsd /= Math.pow(10, 8);
    let ethPriceInUsd: number = 1535;

    let ethProxyContract = new ethers.Contract(
      // "0x5947189d2D7765e4f629C803581FfD06bc57dE9B",
      "0x7600EddCeB7C546789aE0a5fB1Dd4B4f390001EF", //testnet
      samplePriceOracleAbi,
      signer
    );

    let tokenSymbol = await contract.symbol();
    let tokenName = await contract.name()
    let underlyingDecimals: number[];
    let collateralFactor = 0;

    switch (tokenSymbol) {
      case "lWBTC": underlyingDecimals = [8, 10]; break;
      case "lUSDT": underlyingDecimals = [6, 12]; break;
      case "lUSDC": underlyingDecimals = [6, 12]; break;
      default: underlyingDecimals = [18, 0]; break;
    }

    switch (tokenSymbol) {
      case "lWBTC": collateralFactor = .75; break;
      case "lUSDT": collateralFactor = .7; break;
      case "lUSDC": collateralFactor = .85; break;
      case "lFRAX": collateralFactor = .75; break;
      case "lDAI": collateralFactor = .75; break;
      case "lETH": collateralFactor = .8; break;
      case "lMAGIC": collateralFactor = .15; break;
      case "lMIM": collateralFactor = .6; break;
      case "lDPX": collateralFactor = .15; break;
      case "lplvGLP": collateralFactor = .8; break;
      default: collateralFactor = 0; break;
    }
    let cTokenMarket = {
      borrowRate: formatBigNumber(await contract.borrowRatePerBlock(), 18),
      cash: formatBigNumber(await contract.getCash(), underlyingDecimals[0]),
      collateralFactor: collateralFactor,
      exchangeRate: formatBigNumber(await contract.exchangeRateStored(), (10 + underlyingDecimals[0])),
      interestRateModelAddress: await contract.interestRateModel(),
      name: tokenName,
      reserves: formatBigNumber(await contract.totalReserves(), underlyingDecimals[0]),
      supplyRate: formatBigNumber(await contract.supplyRatePerBlock(), 18),
      symbol: tokenSymbol,
      id: address,
      totalBorrows: formatBigNumber(await contract.totalBorrows(), underlyingDecimals[0]),
      totalSupply: formatBigNumber(await contract.totalSupply(), underlyingDecimals[0]),
      underlyingAddress: tokenSymbol === 'lETH' ? '' : await contract.underlying(), //hard code for ETH
      underlyingName: tokenName.substring(9, tokenName.length), //hard code for ETH
      underlyingPrice: formatBigNumber(await ethProxyContract.getUnderlyingPrice(address), 18 + underlyingDecimals[1]),
      underlyingSymbol: tokenSymbol.substring(1, tokenSymbol.length),
      accrualBlockNumber: await contract.accrualBlockNumber(),
      borrowIndex: formatBigNumber(await contract.borrowIndex(), 18),
      reserveFactor: formatBigNumber(await contract.reserveFactorMantissa(), 18) * 100,
      underlyingPriceUSD: formatBigNumber(await ethProxyContract.getUnderlyingPrice(address), 18 + underlyingDecimals[1]) * ethPriceInUsd,
      underlyingDecimals: await contract.decimals()
    };

    cTokenMarket.totalSupply =
      cTokenMarket.cash +
      cTokenMarket.totalBorrows -
      cTokenMarket.reserves;
    // console.log("======================================'");
    // console.log("borrowRate: " + cTokenMarket.borrowRate);
    // console.log("cash: " + cTokenMarket.cash);
    // console.log("collateralFactor: " + cTokenMarket.collateralFactor);
    // console.log("exchangeRate: " + cTokenMarket.exchangeRate);
    // console.log("interestRateModelAddress: " + cTokenMarket.interestRateModelAddress);
    // console.log("name: " + cTokenMarket.name);
    // console.log("supplyRate: " + cTokenMarket.supplyRate);
    // console.log("symbol: " + cTokenMarket.symbol);
    // console.log("id: " + cTokenMarket.id);
    // console.log("totalBorrows: " + cTokenMarket.totalBorrows);
    // console.log("totalSupply: " + cTokenMarket.totalSupply);
    // console.log("underlyingAddress: " + cTokenMarket.underlyingAddress);
    // console.log("underlyingName: " + cTokenMarket.underlyingName);
    // console.log("underlyingPrice: " + cTokenMarket.underlyingPrice);
    // console.log("underlyingSymbol: " + cTokenMarket.underlyingSymbol);
    // console.log("accrualBlockNumber: " + cTokenMarket.accrualBlockNumber);
    // console.log("borrowIndex: " + cTokenMarket.borrowIndex);
    // console.log("reserveFactor: " + cTokenMarket.reserveFactor);
    // console.log("underlyingPriceUSD: " + cTokenMarket.underlyingPriceUSD);
    // console.log("underlyingDecimals: " + cTokenMarket.underlyingDecimals);
    return cTokenMarket;
  }

  return marketInfo;
}
