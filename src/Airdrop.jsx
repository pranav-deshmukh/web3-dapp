import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Metadata, METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';


export function Airdrop() {
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [metaData, setMetaData] = useState(null);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirDrop() {
        if (!wallet.publicKey) {
            alert("No wallet connected");
            return;
        }
        try {
            const airdropAmount = amount * LAMPORTS_PER_SOL;
            await connection.requestAirdrop(wallet.publicKey, airdropAmount);
            alert("Airdrop requested");
            await getBalance();
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed");
        }
    }

    async function getBalance() {
        if (wallet.publicKey) {
            try {
                const balance = await connection.getBalance(wallet.publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            } catch (error) {
                console.error("Failed to fetch balance:", error);
            }
        }
    }

    useEffect(() => {
        if (wallet.publicKey) {
            getBalance();
        }
    }, [wallet.publicKey]);

    return (
        <div>
            <p>
                Your public key: {wallet.publicKey ? wallet.publicKey.toString() : "No wallet connected"}
            </p>
            <p>SOL Balance: {balance}</p>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount"
                min="0"
            />
            <button onClick={sendAirDrop}>Send Airdrop</button>
        </div>
    );
}
