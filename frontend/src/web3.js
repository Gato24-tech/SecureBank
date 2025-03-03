const getProvider = async () => {
    if (window.ethereum) {
        console.log("🦊 Conectando con MetaMask...");

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // ✅ Solicita acceso antes de obtener el signer

        const signer = await provider.getSigner();
        console.log("✅ Cuenta conectada:", await signer.getAddress()); // Muestra la dirección en la consola

        return provider;
    } else {
        console.log("⏳ Intentando conectar con WalletConnect...");

        const walletConnectProvider = new WalletConnectProvider({
            rpc: {
                1: "https://cloudflare-eth.com",
                11155111: "https://rpc.sepolia.org"
            }
        });

        try {
            await walletConnectProvider.enable(); 
            console.log("✅ Conectado con WalletConnect!");
            return new ethers.BrowserProvider(walletConnectProvider);
        } catch (error) {
            console.error("❌ Error conectando con WalletConnect:", error);
            return null;
        }
    }
};
