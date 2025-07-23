import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from 'next/script'
import '@rainbow-me/rainbowkit/styles.css'
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygon, polygonMumbai, hardhat, base } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import merge from 'lodash.merge';

import TransactionStatusModal from "@/component/modal/TransactionStatusModal";
import { Space_Grotesk } from "next/font/google";

const inter = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});
let font = inter.className;
const devMode = process.env.NODE_ENV === 'development'

export const { chains, publicClient } = configureChains(
  devMode ? [base] : [base],
  [ 

    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Cock Raffle dApp',
  chains,
  projectId: "020042ff0b2de8f45769c107c48f1364",
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
// export const wagmiConfig = createConfig({
//      chains: [base],
//      transports: {
//        [base.id]: http(),
//      },
//      connectors: [
//        miniAppConnector(),
//        // Add other wallet connectors if needed, e.g., MetaMask, WalletConnect
//      ],
//    });
// let newTheme = darkTheme({
// 	borderRadius: 'small',
// 	fontStack: 'system',	
	
// 	accentColor: '#FF494A',
// 	accentColorForeground: '#D3CFDD',
// 	overlayBlur: "small",
// })

const newTheme = merge(darkTheme({fontStack:"system", borderRadius: 'small', overlayBlur:"small"}), {
	colors: {
	  accentColor: '#910808',
	  accentColorForeground: '#D3CFDD',
	//   modalBackground: "#1F1A1A",
	  modalBackground: "rgba(31, 26, 26, 0.65)",
	//   modalBackground: "transparent",
	  connectButtonBackground: "transparent",
	  
	  
	},
	// fonts: {
	// 	body: "system",
	// }
  } as Theme);
  
// newTheme.colors.connectButtonInnerBackground="#1F1A1A";

export default function App({ Component, pageProps }: AppProps) {
	return (
	<WagmiConfig config={wagmiConfig}>
		<RainbowKitProvider
		chains={chains}
		theme={newTheme}
		><TransactionStatusModal>
			<Component {...pageProps} />
		</TransactionStatusModal>
		</RainbowKitProvider>
    </WagmiConfig>
	);
}
