import hardhat from "hardhat";
import readline from "readline";

const { ethers } = hardhat;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("¿Cuánto vas a depositar? ", (depositAmount) => {
    rl.question("¿Cuánto quieres transferir? ", (transferAmount) => {
        rl.question("¿A qué dirección quieres enviar? ", async (recipientAddress) => {
            rl.close();  // Cerrar la entrada antes de ejecutar el script
            main(depositAmount, transferAmount, recipientAddress)
                .catch((error) => {
                    console.error("Error:", error);
                    process.exit(1);
                });
        });
    });
});

async function main(depositAmount, transferAmount, recipientAddress) {
    try {
        // 1️⃣ Obtener la cuenta principal
        const [owner] = await ethers.getSigners();
        console.log("Owner Address:", owner.address);
        console.log("Recipient Address:", recipientAddress);

        // 2️⃣ Obtener el contrato
        const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

        // 3️⃣ Realizar un depósito (si es mayor que 0)
        if (parseFloat(depositAmount) > 0) {
            const depositWei = ethers.parseEther(depositAmount);
            console.log(`Depositando ${ethers.formatEther(depositWei)} ETH...`);

            const txDeposit = await contract.deposit({ value: depositWei });
            await txDeposit.wait();
            console.log("Depósito realizado con éxito!");
        }

        // 4️⃣ Transferencia a otra cuenta (si es mayor que 0 y la dirección es válida)
if (parseFloat(transferAmount) > 0 && ethers.isAddress(recipientAddress)) {
    const transferWei = ethers.parseEther(transferAmount);
    console.log(`Transfiriendo ${ethers.formatEther(transferWei)} ETH a ${recipientAddress}...`);

    const txTransfer = await contract.transfer(recipientAddress, transferWei);
    await txTransfer.wait();
    console.log("Transferencia realizada con éxito!");
} else if (!ethers.isAddress(recipientAddress)) {
    console.log("❌ Dirección de destinatario no válida. No se realizó la transferencia.");
}


        // 5️⃣ Ver saldo después de la transferencia o depósito
        let balance = await contract.getBalance();
        console.log(`Saldo actual: ${ethers.formatEther(balance)} ETH`);

        // 6️⃣ Retirar fondos
        const withdrawAmount = ethers.parseEther("0.5"); // Sigue siendo fijo
        console.log(`Intentando retirar ${ethers.formatEther(withdrawAmount)} ETH...`);

        const txWithdraw = await contract.withdraw(withdrawAmount);
        await txWithdraw.wait();
        console.log("Retiro realizado con éxito!");

        // 7️⃣ Ver saldo después del retiro
        balance = await contract.getBalance();
        console.log(`Saldo final: ${ethers.formatEther(balance)} ETH`);
    } catch (error) {
        console.error("Error en la ejecución:", error);
    }
}
