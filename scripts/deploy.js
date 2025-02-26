import { ethers } from "hardhat"; // ✅ Importamos ethers desde Hardhat
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const ContractFactory = await ethers.getContractFactory("SecureBank"); // ✅ Obtener el contrato correctamente
  const contract = await ContractFactory.deploy();
  await contract.waitForDeployment(); // ✅ Hardhat 2.20+ usa waitForDeployment()

  console.log(`Contract deployed to: ${contract.target}`); // ✅ ethers v6 usa .target en vez de .address

  const deploymentPath = path.join(__dirname, "../frontend/public/deployments.json");
  const deploymentData = { address: contract.target };

  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentData, null, 2));

  console.log("Deployment address saved to frontend/public/deployments.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
