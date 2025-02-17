import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    const [owner, recipient] = await ethers.getSigners(); // Se obtiene una segunda cuenta para pruebas
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contract = await ethers.getContractAt("SecureBank", contractAddress);

    console.log(`\nInteractuando con el contrato desde: ${owner.address}`);

    // Obtener saldo inicial
    let balance = await contract.getBalance();
    console.log(`Saldo inicial: ${ethers.formatEther(balance)} ETH`);

    // Depositar 1 ETH
    const depositAmount = ethers.parseEther("1"); // Convertimos a Wei
    console.log(`\nDepositando ${ethers.formatEther(depositAmount)} ETH...`);
    let tx = await contract.deposit({ value: depositAmount });
    await tx.wait();
    console.log("✅ Depósito realizado!");

    // Obtener nuevo saldo
    balance = await contract.getBalance();
    console.log(`Nuevo saldo: ${ethers.formatEther(balance)} ETH`);

    // Retirar 0.5 ETH
    const withdrawAmount = ethers.parseEther("0.5");
    console.log(`\nIntentando retirar ${ethers.formatEther(withdrawAmount)} ETH...`);
    tx = await contract.withdraw(withdrawAmount);
    await tx.wait();
    console.log("✅ Retiro exitoso!");

    // Obtener saldo tras retiro
    balance = await contract.getBalance();
    console.log(`Saldo después del retiro: ${ethers.formatEther(balance)} ETH`);

    // Transferencia de 0.2 ETH a otra cuenta
    const transferAmount = ethers.parseEther("0.2");
    console.log(`\nTransfiriendo ${ethers.formatEther(transferAmount)} ETH a ${recipient.address}...`);
    tx = await contract.transfer(recipient.address, transferAmount);
    await tx.wait();
    console.log("✅ Transferencia realizada!");

    // Obtener saldo después de la transferencia
    balance = await contract.getBalance();
    console.log(`Saldo después de la transferencia: ${ethers.formatEther(balance)} ETH`);

    // Cerrar cuenta y retirar saldo restante
    console.log("\nCerrando cuenta...");
    tx = await contract.closeAccount();
    await tx.wait();
    console.log("✅ Cuenta cerrada y saldo retirado!");

    // Verificar saldo después de cerrar la cuenta
    balance = await contract.getBalance();
    console.log(`Saldo final: ${ethers.formatEther(balance)} ETH`);
}

main().catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
});
