import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    // Extraemos ethers de hardhat (CommonJS → ES Module workaround)
    const { ethers } = hre;

    // Verificar que Hardhat Runtime está activo
    if (!ethers) {
        throw new Error("❌ Hardhat Runtime Environment (HRE) no está disponible.");
    }

    // Obtenemos la cuenta desplegadora
    const [deployer] = await ethers.getSigners();
    console.log(`📢 Desplegando contrato con la cuenta: ${deployer.address}`);

    // Creamos la fábrica del contrato
    const ContractFactory = await ethers.getContractFactory("SecureBank");
    const contract = await ContractFactory.deploy();

    // Esperar a que el contrato se despliegue correctamente
    await contract.waitForDeployment();

    console.log(`✅ Contrato desplegado en: ${contract.target}`);

    // Guardamos la dirección del contrato en frontend/public/deployments.json
    const deploymentPath = path.join(__dirname, "../frontend/public/deployments.json");

    let deployments = {};
    if (fs.existsSync(deploymentPath)) {
        const data = fs.readFileSync(deploymentPath, "utf8");
        deployments = JSON.parse(data);
    }

    deployments["SecureBank"] = contract.target; // Actualizamos la dirección del contrato

    fs.writeFileSync(deploymentPath, JSON.stringify(deployments, null, 2));

    console.log("📁 Dirección guardada en frontend/public/deployments.json");
}

// Ejecutamos el script y manejamos errores
main().catch((error) => {
    console.error("❌ Error en el despliegue:", error);
    process.exitCode = 1;
});
