require('dotenv').config();
const ethers = require('ethers');
const contract = require('../artifacts/contracts/MyNFT.sol/MyNFT.json');

const alchemyRpcUrl = "https://eth-sepolia.g.alchemy.com/v2/1N99y2Vmrj0B34hUQV-LuwxDOr-RdkR3"
// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.JsonRpcProvider(alchemyRpcUrl)

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x98EeB3088958f6CEBf7a570D85dFEfB550A03D79'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://tomato-deep-mastodon-35.mypinata.cloud/ipfs/QmPGAGuCW9KYBqviGnjViHPxuGtbRUR8qg4kuT4LhYWjsu"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });