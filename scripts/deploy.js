const hre = require("hardhat");

async function main() {
    const SecureBank = await hre.ethers.getContractFactory("SecureBank");
    const secureBank = await SecureBank.deploy();
    await secureBank.waitForDeployment();
  
    console.log("SecureBank deployed to:", await secureBank.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
