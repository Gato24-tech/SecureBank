import { ethers } from "ethers";
import deployments from "../public/deployments.json";

const getProvider = () => {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        console.error("MetaMask no está instalado.");
        return null;
    }
};

const getContract = async () => {
    const provider = getProvider();
    if (!provider) return null;

    const signer = await provider.getSigner();
    const contractAddress = deployments.contractAddress;
    const abi = deployments.abi; // Asegúrate de que el ABI esté en `deployments.json`

    return new ethers.Contract(contractAddress, abi, signer);
};

export { getProvider, getContract };
