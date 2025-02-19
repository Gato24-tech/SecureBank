import hardhat from "hardhat";
import readline from "readline";

const { ethers } = hardhat;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main(depositAmount) {
    // 1️⃣ Obtener dos cuentas para la transferencia
    const [owner, recipient] = await ethers.getSigners();
    console.log("Owner Address:", owner.address);
    console.log("Recipient Address:", recipient.address);

    // 2️⃣ Obtener el contrato
    const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // 3️⃣ Realizar un depósito con la cantidad ingresada por el usuario
    const depositWei = ethers.parseEther(depositAmount);
    console.log(`Depositando ${ethers.formatEther(depositWei)} ETH...`);

    const txDeposit = await contract.deposit({ value: depositWei });
    await txDeposit.wait();
    console.log("Depósito realizado con éxito!");

    // 4️⃣ Ver saldo después del depósito
    let balance = await contract.getBalance();
    console.log(`Saldo actual: ${ethers.formatEther(balance)} ETH`);

    // 5️⃣ Retirar fondos
    const withdrawAmount = ethers.parseEther("0.5"); // Sigue siendo un valor fijo
    console.log(`Intentando retirar ${ethers.formatEther(withdrawAmount)} ETH...`);

    const txWithdraw = await contract.withdraw(withdrawAmount);
    await txWithdraw.wait();
    console.log("Retiro realizado con éxito!");

    // 6️⃣ Ver saldo después del retiro
    balance = await contract.getBalance();
    console.log(`Saldo final: ${ethers.formatEther(balance)} ETH`);
}

// 7️⃣ Capturar entrada del usuario y ejecutar `main` con el valor ingresado
rl.question("¿Cuánto vas a depositar? ", (amount) => {
    rl.close();  // Cerrar la entrada antes de ejecutar el script
    main(amount).catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });
});
