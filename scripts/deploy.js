const hre = require("hardhat");

async function main() {
    const SecureBank = await hre.ethers.deployContract("SecureBank");
    await SecureBank.waitForDeployment();

    console.log(`SecureBank deployed to: ${SecureBank.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
