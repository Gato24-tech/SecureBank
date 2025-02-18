import hardhat from "hardhat"; // Importamos Hardhat
const { ethers } = hardhat; // Extraemos ethers

async function main() {
    // 1. Obtener el signer (la cuenta que interactuará con el contrato)
    const [owner] = await ethers.getSigners();
    console.log("Owner Address:", owner.address); // Mostramos la dirección

    // 2. Dirección del contrato (sustituye con la dirección real)
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // 3. Conectar con el contrato SecureBank
    const contract = await ethers.getContractAt("SecureBank", contractAddress);
    console.log("Conectado al contrato SecureBank en:", contractAddress);

    // 4. Obtener saldo del contrato
    const balance = await contract.getBalance();
    console.log("Saldo actual del contrato:", ethers.formatEther(balance), "ETH");
}

// Ejecutar la función principal
main().catch((error) => {
    console.error("Error en la ejecución:", error);
    process.exit(1);
});
