import React from "react"; // Solución al error de JSX
import { useState, useEffect } from "react";
import { getContract } from "./web3";
import ethers from "ethers";

function App() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        async function fetchBalance() {
            const contract = await getContract();
            if (contract) {
                const balance = await contract.getBalance();
                setBalance(ethers.formatEther(balance));
            }
        }
        fetchBalance();
    }, []);

    const handleDeposit = async () => {
        const contract = await getContract();
        if (contract) {
            const tx = await contract.deposit({ value: ethers.parseEther(amount) });
            await tx.wait();
            alert(`Depositaste ${amount} ETH`);
        }
    };

    return (
        <div>
            <h1>SecureBank</h1>
            <p>Balance: {balance} ETH</p>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Cantidad en ETH" />
            <button onClick={handleDeposit}>Depositar</button>
        </div>
    );
}

export default App;
