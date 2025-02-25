import { ethers } from "hardhat";
const fs = require("fs");

async function main() {
    // 1️⃣ Obtenemos el contrato
    const SecureBank = await ethers.getContractFactory("SecureBank");

    // 2️⃣ Lo desplegamos
    const secureBank = await SecureBank.deploy();
    await secureBank.waitForDeployment();

    // 3️⃣ Obtenemos la dirección del contrato desplegado
    const contractAddress = await secureBank.getAddress();
    console.log("SecureBank desplegado en:", contractAddress);

    // 4️⃣ Guardamos la dirección en deployments.json
    const deploymentsPath = "./frontend/public/deployments.json";

    const deployments = {
        SecureBank: contractAddress,
    };

    fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    console.log(`Dirección guardada en ${deploymentsPath}`);
}

// Manejo de errores
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
