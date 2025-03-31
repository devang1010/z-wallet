import { ethers } from 'ethers';
// const { REACT_APP_WEB3_PROVIDER_URL } = process.env;
/**
 * Converts an amount from wei (smallest Ethereum unit) to ether
 * @param amtInWei - The amount in wei as a string
 * @returns The equivalent amount in ether as a string, or undefined on error
 */
export function weiToEth(amtInWei: string) {
  try {
    const amtInEth = ethers.utils.formatEther(amtInWei);
    return amtInEth;
  } 
  catch(error) {
    console.log(error);
  }
}

/**
 * Retrieves the balance of an Ethereum address
 * @param address - The Ethereum address to check
 * @param web3Provider - The Ethereum JSON-RPC provider connection
 * @returns The account balance in wei as a string, or undefined on error
 */
export async function getAccountBalance(address: string, web3Provider: ethers.providers.JsonRpcProvider) {
  try {
    const balance = await web3Provider.getBalance(address);
    return balance.toString();
  }
  catch(error) {
    console.log(error);
  }
}

/**
 * Creates a new random Ethereum wallet
 * @returns A new Ethereum wallet object with random private key, or undefined on error
 */
export function createRandomWallet() {
  try {
    const wallet = ethers.Wallet.createRandom();
    return wallet;
  }
  catch(error) {
    console.log(error);
  }
}

/**
 * Creates an Ethereum wallet from an existing private key
 * @param privateKey - The private key to create the wallet from
 * @param web3Provider - The Ethereum JSON-RPC provider connection
 * @returns An Ethereum wallet object connected to the provider, or undefined on error
 */
export function createWalletFromPrivateKey(privateKey:string, web3Provider: ethers.providers.JsonRpcProvider) {
  try {
    const wallet = new ethers.Wallet(privateKey, web3Provider);
    return wallet;
  }
  catch(error) {
    console.log(error);
  }
}

/**
 * Creates an Ethereum wallet from a mnemonic phrase (seed words)
 * @param mnemonicPhrase - The 12 or 24 word mnemonic phrase
 * @returns An Ethereum wallet object derived from the mnemonic, or undefined on error
 */
export async function importWalletFromMnemonicPhrase(mnemonicPhrase: string) {
  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase);
    return wallet;
  }
  catch(error) {
    console.log(error);
  }
}

/**
 * Computes the SHA256 hash of a string
 * @param str - The input string to hash
 * @returns The SHA256 hash as a hex string, or undefined on error
 */
export function SHA256Hash(str: string) {
  try {
    const hash = ethers.utils.sha256(str);
    return hash;
  } 
  catch(error) {
    console.log(error);
  }
}

/**
 * Computes the Keccak256 hash of a string (the hash function used by Ethereum)
 * @param str - The input string to hash
 * @returns The Keccak256 hash as a hex string, or undefined on error
 */
export function Keccak256(str: string) {
  try {
    const hash = ethers.utils.keccak256(str);
    return hash;
  } 
  catch(error) {
    console.log(error);
  }
}

/**
 * Derives a public key from either a public or private key
 * @param publicOrPrivateKey - Either a public key or private key
 * @returns The computed public key as a hex string, or undefined on error
 */
export function computePublicKey(publicOrPrivateKey: string) {
  try {
    const hash = ethers.utils.computePublicKey(publicOrPrivateKey);
    return hash;
  } 
  catch(error) {
    console.log(error);
  }
}

/**
 * Derives an Ethereum address from either a public or private key
 * @param publicOrPrivateKey - Either a public key or private key
 * @returns The computed Ethereum address as a hex string, or undefined on error
 */
export function computeAddress(publicOrPrivateKey: string) {
  try {
    const hash = ethers.utils.computeAddress(publicOrPrivateKey);
    return hash;
  } 
  catch(error) {
    console.log(error);
  }
}