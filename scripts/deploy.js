import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function main() {
  const ContractFactory = await ethers.getContractFactory("SecureBank");
  const contract = await ContractFactory.deploy();
  await contract.deployed();

  console.log(`Contract deployed to: ${contract.address}`);

  const deploymentPath = path.join(__dirname, "../frontend/public/deployments.json");
  const deploymentData = { address: contract.address };

  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentData, null, 2));

  console.log("Deployment address saved to frontend/public/deployments.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
