import { useContext, useEffect, useState } from "react";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { TenderContext } from "~/contexts/tender-context";
import { useInterval } from "./use-interval";
import { ethers } from "ethers";
import sampleCtokenAbi from "~/config/sample-ctoken-abi";
import { formatBigNumber } from "~/lib/tender"
import chainlinkAbi from "~/config/chainlink-abi";
import samplePriceOracleAbi from "~/config/sample-price-oracle-abi";

const getPercentageChange = function (
  currentValue: number,
  prevValue: number
): number {
  return ((currentValue - prevValue) / currentValue) * 100;
};

// const cTokenAddresses = ["0xb4d58C1F5870eFA4B05519A72851227F05743273",
//   "0xD2835B08795adfEfa0c2009B294ae84B08C6a67e",
//   "0x5E3F2AbaECB51A182f05b4b7c0f7a5da1942De90",
//   "0xeB156f76Ef69be485c18C297DeE5c45390345187",
//   "0x12997C5C005acc6933eDD5e91D9338e7635fc0BB",
//   "0x46178d84339A04f140934EE830cDAFDAcD29Fba9",
//   "0xc33cCF8d387DB5e84De13496E40DD83934F3251B",
//   "0x7a668f56affd511ffc83c31666850eae9fd5bcc8",
//   "0x5FfA22244D8273d899B6C20CEC12A88a7Cd9E460",
//   "0xCC25daC54A1a62061b596fD3Baf7D454f34c56fF"];
const cTokenAddresses = ["0x11caD8E4323123E12E33C88A79D97D55cd6f91aC",
  "0xc3Df2FFB5336C05aeA13B4e2A5e0d2E97909330a",
  "0xBBc29a53A87e340d1986570Bafb6Bfa709081E6C",
  "0xB28752bA41a4714a79aAF0Bed369851c44436e81",
  "0xcC3D0d211dF6157cb94b5AaCfD55D41acd3a9A7A",
  "0x25e6267C8a6f0A9b705B7dd9971196711765E0b8",
  "0xbedf9898bf9ce80a24aD02aeBA43ba7A943C39EE",
  "0x5FfA22244D8273d899B6C20CEC12A88a7Cd9E460",
  "0x315B96C352CD67E3263D9EB6574E70B09A9f321B",
  "0xF6eE884Ebd0ea58BBaC3396e41E4724C420f2B50"];


export function useMarketsInfo() {
  const pollingKey = useInterval(7_000);
  const [marketsInfo, setMarketsInfo] = useState<object>({
    markets: false,
    total: false,
  });
  const { networkData, tokenPairs } = useContext(TenderContext);
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  useEffect(() => {
    console.log("useMarketsInfo called");

    if (!signer || !networkData || tokenPairs.length === 0) {
      return;
    }

    const getMarketsInfo = async () => {
      const markets = {};
      const prevMarkets = {};
      const secondsPerBlock = networkData.secondsPerBlock;
      const l2SecondsPerBlock = networkData.l2SecondsPerBlock;
      const tokens = networkData.Tokens;
      const addresses: string[] = [];

      const blocksPerDay = Math.round((60 * 60 * 24) / secondsPerBlock);
      const l2BlocksPerDay = Math.round((60 * 60 * 24) / l2SecondsPerBlock);

      Object.keys(tokens).forEach((key) => {
        const address = tokens[key].cToken.address.toLowerCase();
        markets[address] = {
          name: tokens[key].name,
          symbol: tokens[key].symbol,
          icon: tokens[key].icon,
        };

        addresses.push(address);
      });

      const searchStr = addresses.join('","');
      let response = {
        markets: new Array<any>(),
        accountCTokens: new Array<any>()
      }

      response.markets.push(await getTokenMarketInfo(cTokenAddresses[0]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[1]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[2]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[3]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[4]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[5]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[6]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[7]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[8]));
      response.markets.push(await getTokenMarketInfo(cTokenAddresses[9]));

      let tokenMarkets: any[] = [];

      if (
        !response ||
        typeof response.markets === "undefined" ||
        typeof response.accountCTokens === "undefined"
      ) {
        return;
      }

      const total = {
        supply: {
          count: 0,
          usd: 0,
          usdDiff: 0,
          volume: 0,
          topMarkets: [],
        },
        borrow: {
          count: 0,
          usd: 0,
          usdDiff: 0,
          volume: 0,
          topMarkets: [],
        },
      };

      const daysPerYear = 365;
      const ethBlocksPerYear = 2102400; // subgraph uses 2102400
      const uniqueSuppliers = {};
      const uniqueBorrowers = {};


      const usdPricesByCToken = {};
      const usdPricesByToken = {};

      response.markets.forEach(
        async (m: {
          reserves: string;
          borrowRate: number;
          underlyingPriceUSD: any;
          totalBorrows: any;
          cash: string;
          supplyRate: number;
          id: string;
          symbol: string;
          underlyingSymbol: string;
        }) => {
          const id = m.id.toLowerCase();
          const tokenPair = tokenPairs.find(
            (tp) => tp.cToken.address.toLowerCase() === id
          );
          const underlyingPriceUSD = tokenPair
            ? tokenPair.token.priceInEth
            : m.underlyingPriceUSD;

          const supplyRate = m.supplyRate / ethBlocksPerYear;
          markets[id].supplyApy =
            (Math.pow(supplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;

          markets[id].totalSupply =
            parseFloat(m.cash) +
            parseFloat(m.totalBorrows) -
            parseFloat(m.reserves);
          markets[id].totalSupplyUsd =
            markets[id].totalSupply * underlyingPriceUSD;

          const borrowRate = m.borrowRate / ethBlocksPerYear;
          markets[id].borrowApy =
            (Math.pow(borrowRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
          markets[id].totalBorrow = parseFloat(m.totalBorrows);
          markets[id].totalBorrowUsd = m.totalBorrows * underlyingPriceUSD;

          // total in usd
          total.borrow.usd += markets[id].totalBorrow * underlyingPriceUSD;
          total.supply.usd += markets[id].totalSupply * underlyingPriceUSD;

          usdPricesByCToken[m.symbol] = underlyingPriceUSD;
          usdPricesByToken[m.underlyingSymbol] = underlyingPriceUSD;
        }
      );

      total.supply.topMarkets = Object.keys(markets).sort((a, b) => {
        return markets[b].totalSupplyUsd - markets[a].totalSupplyUsd;
      });
      total.supply.topMarkets.length = 3;

      total.borrow.topMarkets = Object.keys(markets).sort((a, b) => {
        return markets[b].totalBorrowUsd - markets[a].totalBorrowUsd;
      });
      total.borrow.topMarkets.length = 3;

      setMarketsInfo({
        markets: markets,
        total: total,
      });
    };

    getMarketsInfo();
  }, [networkData, signer, tokenPairs, pollingKey]);

  async function getTokenMarketInfo(address: string) {
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
    let underlyingDecimals: number[];
    switch (tokenSymbol) {
      case "lWBTC": underlyingDecimals = [8, 10]; break;
      case "lUSDT": underlyingDecimals = [6, 12]; break;
      case "lUSDC": underlyingDecimals = [6, 12]; break;
      default: underlyingDecimals = [18, 0]; break;
    }
    let cTokenMarket = {
      symbol: tokenSymbol,
      underlyingSymbol: tokenSymbol.substring(1, tokenSymbol.length),
      borrowRate: formatBigNumber(await contract.borrowRatePerBlock(), 18),
      cash: formatBigNumber(await contract.getCash(), underlyingDecimals[0]),
      reserves: formatBigNumber(await contract.totalReserves(), underlyingDecimals[0]),
      supplyRate: formatBigNumber(await contract.supplyRatePerBlock(), 18),
      id: address,
      totalBorrows: formatBigNumber(await contract.totalBorrows(), underlyingDecimals[0]),
      underlyingPriceUSD: formatBigNumber(await ethProxyContract.getUnderlyingPrice(address), 18 + underlyingDecimals[1]) * ethPriceInUsd
    };
    return cTokenMarket;
  }

  return marketsInfo;
}
