import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React from 'react';

export function SendTokens() {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        try {
            const to = (document.getElementById('to')).value;
            const amount = (document.getElementById('amount')).value;

            if (!to || !amount || isNaN(Number(amount))) {
                alert('Please enter a valid recipient address and amount.');
                return;
            }

            if (!publicKey) {
                throw new Error('Wallet not connected');
            }

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: Number(amount) * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');

            alert(`Sent ${amount} SOL to ${to}`);
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    }

    return (
        <div>
            <input id="to" type="text" placeholder="Recipient Address" />
            <input id="amount" type="text" placeholder="Amount (SOL)" />
            <button onClick={sendTokens}>Send</button>
        </div>
    );
}
