import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("Owner Address:", owner.address);

    const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // Consultar saldo inicial
    let balance = await contract.getBalance();
    console.log("Saldo actual:", ethers.formatEther(balance), "ETH");

    // 💰 1️⃣ Depositar 1 ETH antes de retirar
    const depositAmount = ethers.parseEther("1.0");
    console.log(`Depositando ${ethers.formatEther(depositAmount)} ETH...`);

    const txDeposit = await contract.deposit({ value: depositAmount });
    await txDeposit.wait();
    console.log("Depósito realizado con éxito!");

    // 📌 Consultar nuevo saldo
    balance = await contract.getBalance();
    console.log("Saldo después del depósito:", ethers.formatEther(balance), "ETH");

    // 💸 2️⃣ Intentar retirar 0.5 ETH
    const withdrawAmount = ethers.parseEther("0.5");
    console.log(`Intentando retirar ${ethers.formatEther(withdrawAmount)} ETH...`);

    const txWithdraw = await contract.withdraw(withdrawAmount);
    await txWithdraw.wait();

    // 🔍 Consultar saldo final
    balance = await contract.getBalance();
    console.log(`Saldo después del retiro: ${ethers.formatEther(balance)} ETH`);
}

// Ejecutar script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
