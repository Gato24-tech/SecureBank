import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("Interactuando con el contrato desde:", owner.address);

    // Dirección del contrato desplegado (cámbiala si es diferente)
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    
    // Obtener la instancia del contrato
    const SecureBank = await ethers.getContractFactory("SecureBank");
    const contract = await SecureBank.attach(contractAddress);
    
    // Consultar saldo inicial
    let balance = await contract.getBalance();
    console.log("Saldo inicial:", ethers.formatEther(balance), "ETH");

    // Realizar un depósito de 1 ETH
    console.log("Realizando un depósito de 1 ETH...");
    const depositTx = await contract.deposit({ value: ethers.parseEther("1") });
    await depositTx.wait();
    console.log("Depósito realizado!");

    // Consultar saldo después del depósito
    balance = await contract.getBalance();
    console.log("Nuevo saldo:", ethers.formatEther(balance), "ETH");
}

// Ejecutar el script
main().catch((error) => {
    console.error("Error en la interacción:", error);
    process.exitCode = 1;
});
