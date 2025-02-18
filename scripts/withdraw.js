import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    // 1️⃣ Obtener el owner
    const [owner] = await ethers.getSigners();
    console.log("Owner Address:", owner.address);

    // 2️⃣ Obtener referencia al contrato desplegado
    const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // 3️⃣ Consultar saldo actual
    let balance = await contract.getBalance();
    console.log("Saldo actual:", ethers.formatEther(balance), "ETH");

    // 4️⃣ Retirar 0.5 ETH
    const withdrawAmount = ethers.parseEther("0.5");
    console.log(`Intentando retirar ${ethers.formatEther(withdrawAmount)} ETH...`);

    // 5️⃣ Ejecutar retiro
    const tx = await contract.withdraw(withdrawAmount);
    await tx.wait();  // Esperamos a que la transacción se confirme

    // 6️⃣ Consultar saldo después del retiro
    balance = await contract.getBalance();
    console.log(`Saldo después del retiro: ${ethers.formatEther(balance)} ETH`);
}

// Ejecutar script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
