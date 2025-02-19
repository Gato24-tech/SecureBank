import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    // 1️⃣ Obtener dos cuentas para la transferencia
    const [owner, recipient] = await ethers.getSigners();
    console.log("Owner Address:", owner.address);
    console.log("Recipient Address:", recipient.address);

    // 2️⃣ Obtener el contrato
    const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // 3️⃣ Realizar un depósito
    const depositAmount = ethers.parseEther("1.0"); // Conversión correcta
    console.log(`Depositando ${ethers.formatEther(depositAmount)} ETH...`);

    const txDeposit = await contract.deposit({ value: depositAmount });
    await txDeposit.wait();
    console.log("Depósito realizado con éxito!");

    // Realizar una transferencia a recipient
    const transferAmount = ethers.parseEther("0.3");
    console.log(`Transfiriendo ${ethers.formatEther(transferAmount)} ETH a ${recipient.address}...`);

    const txTransfer = await contract.transfer(recipient.address, transferAmount);
    await txTransfer.wait();
    console.log("Transferencia realizada con éxito!");

    // 4️⃣ Ver saldo después del depósito
    let balance = await contract.getBalance();
    console.log(`Saldo actual: ${ethers.formatEther(balance)} ETH`);

    // 5️⃣ Retirar fondos
    const withdrawAmount = ethers.parseEther("0.5"); // Conversión correcta
    console.log(`Intentando retirar ${ethers.formatEther(withdrawAmount)} ETH...`);

    const txWithdraw = await contract.withdraw(withdrawAmount);
    await txWithdraw.wait();
    console.log("Retiro realizado con éxito!");

    // 6️⃣ Ver saldo después del retiro
    balance = await contract.getBalance();
    console.log(`Saldo final: ${ethers.formatEther(balance)} ETH`);
}

// Manejo de errores
main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
