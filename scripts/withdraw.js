import hardhat from hardhat;
const { ethers } = hardhat;

const [owner] = await ethers.getSigners();
console.log = ("Owner Address.",owner.address);

const contract = await getContractAt("SecureBank","0x5FbDB2315678afecb367f032d93F642f64180aa3");

const balance = await contract.getBalance();
console.log("Saldo actual:", ethers.formatEther (balance), "ETH");

const withdrawAmount = ethers.parseEther("0.5");
console.log('\Intentando retirar ${ethers.formatEther(withdrawAmount)} ETH...');

balance = await contract.getBalance();
console-log('Saldo después de retiro: "{ethers.formatEther(withdrawAmount)} ETH...');
