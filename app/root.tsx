import { useEffect } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";

import LogRocket from "logrocket";
import TagManager from "react-gtm-module";

import { Toaster } from "react-hot-toast";
import type { MetaFunction, LinksFunction } from "remix";
import tailwindStyles from "./tailwind.css";
import globalStyles from "./styles/global.css";

import Footer from "~/components/Footer";

import type { Web3ReactHooks } from "@web3-react/core";
import { Web3ReactProvider } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";

import { hooks as metaMaskHooks, metaMask } from "~/connectors/meta-mask";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { publicProvider } from "wagmi/providers/public";
import { Web3Modal } from "@web3modal/react";

import { useOnSupportedNetwork } from "./hooks/use-on-supported-network";
import Header from "./components/header-components/Header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: globalStyles },
];
export const meta: MetaFunction = () => {
  return { title: "lodestarfinance.io" };
};

const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [publicProvider()]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "160c8923a4fcdc7864190c3fadf63ef4",
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

if (process.env.NODE_ENV === "production")
  LogRocket.init("6bquwn/lodestar-frontend");

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

export default function App() {
  const chainId = metaMaskHooks.useChainId();
  let onSupportedChain = useOnSupportedNetwork(chainId);

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-9CFSCBJ73N" });
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`${!onSupportedChain ? "switch__to__network" : ""}`}>
        <div id="m"></div>
        <Toaster />
        <Web3ReactProvider connectors={connectors}>
          <WagmiConfig client={wagmiClient}>
            <Header />
          </WagmiConfig>

          <Web3Modal
            projectId="<YOUR_PROJECT_ID>"
            ethereumClient={ethereumClient}
          />
          <Outlet />
        </Web3ReactProvider>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>404 - Page not found</title>
        <Links />
      </head>
      <body className="h-[100vh] relative flex flex-col justify-between">
        <header className="mt-0 mb-0 flex w-full c items-center justify-between max-w-[1400px] relative h-[71px] lg:h-[110px] flex items-center">
          <a
            href="https://lodestarfinance.io"
            className="w-[104px] block lg:w-[196px] z-20 relative"
          >
            <img src="/images/logo1.svg" alt="Lodestar Finance" />
          </a>
        </header>
        <img
          src="/images/error-page.png"
          alt="Error page"
          className="w-full h-full absolute top-0 left-0 z-[-1]"
        />
        <div className="absolute w-full max-w-[511px] top-[50%] left-[50%] content translate-y-[-50%] translate-x-[-50%]">
          <img
            src="/images/error-page-number.png"
            alt="Error page Number"
            className="ml-[auto] mr-[auto] mb-[15px] md:mb-[20px] max-w-[90%] md:max-w-[100%]"
          />
          <p className="mb-[28px] md:mb-[42px] font-nova text-[18px] md:text-[28px] text-center">
            Ooops! This page is not found
          </p>
          <div className="ml-[auto] mr-[auto] btn-custom-border rounded-[6px] w-[160px] h-[50px] md:w-[180px] md:h-[60px]">
            <a
              href="/"
              className="font-space flex font-bold items-center justify-center w-full h-full rounded-[6px] text-[#E5D540] text-[15px] leading-5 bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
            >
              BACK TO HOME
            </a>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
