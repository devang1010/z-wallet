import { ethers, BigNumber } from 'ethers';
import { randomBytes, entropyToMnemonic, HDNode, computeAddress, computePublicKey, formatEther, formatUnits, isAddress, isValidMnemonic, parseUnits} from 'ethers/lib/utils';
const  REACT_APP_MAINNET_PROVIDER_URL  = import.meta.env.VITE_REACT_APP_MAINNET_PROVIDER_URL;

export function createHDRootNodefromRandom(): HDNode {
    const ENT = randomBytes(16);
    const mnemonic = entropyToMnemonic(ENT);
    const rootNode = HDNode.fromMnemonic(mnemonic);
    return rootNode;
}

export function createMnemonicSeedRandom(): string {
  const ENT = randomBytes(16);
  const mnemonic = entropyToMnemonic(ENT);
  return mnemonic;
}

export function createHDRootNodeFromMnemonic(mnemonic: string, passphrase: string=''): HDNode {
    const words = mnemonic.split(' ');
    if(words.length%3!==0) throw new Error('invalid mnemonic')
    return HDNode.fromMnemonic(mnemonic, passphrase);
}

export function createAccountFromHDRootNode(HDRoot: HDNode, accountIndex: number): HDNode {
    const account: HDNode | any = HDRoot.derivePath(`m/44'/60'/0'/0/${accountIndex}`);
    return account;
}

export function createAccountFromPrivateKey(privateKey: string): Partial<HDNode>  {
  const publicKey = computePublicKey(privateKey, true);
  const address = computeAddress(publicKey);
  const account = {
    privateKey,
    publicKey,
    address,
    isImported: true //indicates account is imported to wallet using private key and is not generated from master seed
  };
  return account;
}

export function getNetworkByChainID(chainID: number) {
    try {
      /*
        Network = {
          chainId,
          ensAddress,
          name
        }
      */
      const network = ethers.providers.getNetwork(chainID);
      return network;
    }
    catch(error) {
      console.log(error);
    }
  }
  
export function setWeb3Provider(chainID: number) {
  try {
    // const PROVIDER_URL = chainID===4 ? REACT_APP_RINKEBY_PROVIDER_URL : REACT_APP_MAINNET_PROVIDER_URL;
    const PROVIDER_URL = REACT_APP_MAINNET_PROVIDER_URL;
    
    
    const web3Provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    if(!web3Provider) throw new Error('No web3 provider found');
    return web3Provider;
  }
  catch(error) {
    console.log(error);
  }
}

// When your component unmounts or no longer needs updates
// Ensure provider is defined or remove this line if unnecessary
// unsubscribeIfExistAllAccountBalances(provider);
export async function balanceOf(provider: ethers.providers.JsonRpcProvider, address: string) {
  if(!address) return BigNumber.from(0);
  if(!provider) {
    console.error('Provider not found')
    return BigNumber.from(0);
  }
  const balance = await provider.getBalance(address);
  return balance;
}

export function subscribeAccountBalance(provider: ethers.providers.JsonRpcProvider, address: string | undefined, callback: Function) {
  if(!address) {
    console.error('unable to subscribe: null address');
    return;
  }
  if(!provider) {
    console.error('Provider not found')
    return 0;
  }
  provider.on('block', async () => {
    const balance = await balanceOf(provider, address);
    callback(balance);
  });
  console.log(`Subscribed Account Balance for ${address}...`);
}

export function unsubscribeIfExistAllAccountBalances(provider: ethers.providers.JsonRpcProvider) {
  if(!provider) {
    console.error('Provider not found')
    return 0;
  }
  if(provider.listenerCount('block') > 0) {
    provider.removeAllListeners('block');
    console.log(`Unsubscribed All Account Balances ...`);
  }
  else {
    console.log('No account listeners found');
  }
}

export function formatEth(amount: ethers.BigNumber) {
  return formatEther(amount);
}

export function formatInUnits(amount: ethers.BigNumber, unitOrDecimals : "ether" | "gwei" | "wei" | number = "ether") {
  return formatUnits(amount, unitOrDecimals);
}

export function parseFromUnits(amount: string, unitOrDecimals : "ether" | "gwei" | "wei" | number = "ether") {
  return parseUnits(amount, unitOrDecimals)
}

export function ethAmountInBigNumber(amount: number | string) {
  const weiAmount = parseFromUnits(amount.toString());
  return weiAmount;
}

export function tokenAmountInBigNumber(amount: number | string, decimals: number = 18) {
  const amountInBigNumber = parseFromUnits(amount.toString(), decimals);
  return amountInBigNumber;
}


export function isValidEthAddress(address: string) {
  if(!address) return false;
  const isValid = address.includes('0x') && isAddress(address);
  return isValid;
}

export function isValidMnemonicSeed(seed: string) {
  if(!seed) return false;
  const isValid = isValidMnemonic(seed);
  return isValid;
}