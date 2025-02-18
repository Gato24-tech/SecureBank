import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("Owner Address:", owner.address);

    // Preguntar cuánto quiere depositar
    const depositAmount = ethers.parseEther(prompt("Ingresa la cantidad de ETH a depositar: "));

    console.log(`Depositando ${ethers.formatEther(depositAmount)} ETH...`);
    
    const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    const txDeposit = await contract.deposit({ value: depositAmount });
    await txDeposit.wait();
    
    console.log("Depósito realizado con éxito!");
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
