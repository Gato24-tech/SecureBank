import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    // 1️⃣ Obtener la cuenta (owner)
    const [owner] = await ethers.getSigners();
    console.log("Owner address:", owner.address);

    // 2️⃣ Conectar con el contrato
    const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // 3️⃣ Obtener el saldo actual
    const balance = await contract.getBalance();
    console.log("Saldo actual:", ethers.formatEther(balance), "ETH");
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
