// import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl } from '@solana/web3.js';
import { Airdrop } from './Airdrop';
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;


// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { SignMessage } from './SIgnMessage';
import { SendTokens } from './SendTokens';

function App() {

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/OtKVJYlS-GKfniF2-xuLZRJpxTGZ3jak"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                      <Airdrop/>
                      <SignMessage/>
                      <SendTokens/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  )
}

export default App
