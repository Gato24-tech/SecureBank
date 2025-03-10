import hre from "hardhat";

async function main() {
    const { ethers } = hre; // Extraer ethers desde Hardhat

    const [owner] = await ethers.getSigners();
    console.log("Owner Address:", owner.address);

    const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    contract.on("Deposited", (sender, amount) => {
        console.log(`Depósito detectado: ${sender} ha depositado ${ethers.formatEther(amount)} ETH`);
    });

    contract.on("Withdrawn", (sender, amount) => {
        console.log(`Retiro detectado: ${sender} ha retirado ${ethers.formatEther(amount)} ETH`);
    });

    contract.on("Transfer", (sender, amount) => {
        console.log(`Transferencia detectada: ${sender} ha enviado ${ethers.formatEther(amount)} ETH`);
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
