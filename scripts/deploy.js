import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    const SecureBank = await ethers.getContractFactory("SecureBank");
    const secureBank = await SecureBank.deploy();

    await secureBank.waitForDeployment();

    console.log("SecureBank desplegado en:", secureBank.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
