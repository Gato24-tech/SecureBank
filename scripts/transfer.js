import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    // Obtener dos cuentas para la transferencia      
    const [owner, recipient] = await ethers.getSigners();
    console.log("Onwer address:", owner.address);
    console.log("Recipient Address:", recipient.address);
    
    // Obtener el contrato
    const contract = await ethers.getContractAt("SecureBank", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // Realizar un depósito
    const depositAmount = ethers.parseEther("1.0");
    console.log(`Depositando, ${ethers.formatEther(depositAmount)} ETH...`);

    const txDeposit = await contract.deposit({value: depositAmount});
    await txDeposit.wait();
    console.log("deposito realizado con éxito");

    // Ver el saldo después del depósito
    let balance = await contract.getbalance();
    console.log(`Saldo actual: ${ethers.formatEther(balance)} ETH`);

    //Retirar fondos
    const withdrawAmount = ethers.parsetEther("0.5");
    console.log(`Intentando retirar ${ethers.formatEther("SecuraBank", withdrawAmount)} ETH...`);
    
    const txWithdraw = await contract.withdraw(withdrawAmount);
    await txWithdraw.wait();
    console.log("Retiro realizado con éxito");

    // Ver saldo después del retiro
    balance = await contract.getbalance();
    console.log(`saldo final: S{ethers.formatEther(balance)} ETH`);
 
}
     // Manejo de errores
        main().catch((error) => {
            console.error("Error", error);
            process.exit(1);
            
    });
    
     
                                          
    



