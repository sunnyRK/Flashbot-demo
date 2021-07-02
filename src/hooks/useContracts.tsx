import { FlashbotsBundleProvider, FlashbotsTransaction, FlashbotsBundleTransaction } from "@flashbots/ethers-provider-bundle";
import { BigNumber, Contract, providers, Wallet, Signer, ethers, utils  } from "ethers";
import { ConnectionInfo, keccak256, TransactionDescription } from 'ethers/lib/utils'

import MY_NEW_contract from "../contracts/MY_NEW.json";


import { useStoreState, useStoreActions } from "../store/globalStore";

// import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
// import { useWeb3Context } from 'web3-react'

const useContracts = () => {

  const { web3, account } = useStoreState((state) => state);

  const getFlashBotProvider = async () => {
    try {
      const web3ProviderOfGoerliNetwork = new ethers.providers.JsonRpcProvider({ url: 'https://goerli.infura.io/v3/GOERLI-INFURA-ID' })

      const authSigner = new ethers.Wallet('Private key with ZERO goerli eth') // zero ether acc3
      const wallet = new ethers.Wallet('Private key with goerli eth') // 0x70Be1... with ether account1

      const targetBlockNumber = (await web3ProviderOfGoerliNetwork.getBlockNumber())
      const targetBlockNumber2 = (await web3ProviderOfGoerliNetwork.getBlockNumber()) + 4

      const flashbotsProvider = await FlashbotsBundleProvider.create(
        web3ProviderOfGoerliNetwork,
        authSigner,
        'https://relay-goerli.epheph.com/',
        'goerli'
      )
      console.log('flashbotsProvider: ', flashbotsProvider);

      const myNewContract = new Contract(MY_NEW_contract.address, MY_NEW_contract.abi, web3ProviderOfGoerliNetwork);
      console.log('myNewContract: ', myNewContract);

      const nonce1 = await web3.eth.getTransactionCount(wallet.address) 
      console.log('nonce1: ', nonce1)

      const transaction: any = await myNewContract.populateTransaction.setStr(
          'SunnySunnySunnySunnySunny SunnySunnySunnySunnySunny SunnySunnySunnySunnySunny ',
           '1000000000000000000', {
          gasPrice: BigNumber.from(10),
          gasLimit: BigNumber.from(43000),
        });
      console.log('transaction: ', transaction.data);

      
      const bundledTransactions = [
        {
          signer: wallet,
          transaction: transaction,
        }
      ];
      console.log('bundledTransactions: ', bundledTransactions);

      const signedBundle = await flashbotsProvider.signBundle(bundledTransactions)
      console.log('signedBundle: ', signedBundle);

      const simulation = await flashbotsProvider.simulate(signedBundle, targetBlockNumber);
      console.log('simulation: ', JSON.stringify(simulation, null, 2))

      if ('error' in simulation || simulation.firstRevert !== undefined || JSON.stringify(simulation).includes('error')) {
        console.log('simulation:', simulation);
        throw new Error('Simulation error occurred, exiting. Please make sure you are sending a valid bundle');
      }

      const bundleReceipt = await flashbotsProvider.sendRawBundle(signedBundle, targetBlockNumber)
      console.log('bundleReceipt: ', bundleReceipt);

    } catch (error) {
      console.log('FlashError: ', error)
    }
  }


  return {
    getFlashBotProvider,
  };
};

export default useContracts;
