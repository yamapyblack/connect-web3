// import type { ChangeEvent } from 'react'
import { useEffect, useRef } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, AppState } from './store'
import type {BlockchainState} from '../features/blockchain/blockchainSlice'
import { ethers } from "ethers";
import { abi } from "../../public/config/abi/abi";
import { networkInfo } from '../../public/config/blockchainConfig';

const contractAddr = "0xD02ffF070D6168B159EB5d212821CBCB0B244A6d"

export const isLoggedIn = (blockchain: BlockchainState):boolean => {
  if(!blockchain.account){
    return false
  }
  if (blockchain.chainId != networkInfo.chainId) {
    return false
  }
  return true
}

export const balanceOf = (blockchain: BlockchainState) => {
  console.log("balanceOf hook");

  useEffect(() => {
    const _balance = async() => {
      if(!blockchain.account){
        console.log("balanceOf no account")
        return
      }
        
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
    
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddr,
        abi,
        signer
      );
    
      const b = await contract.balanceOf(blockchain.account);
      console.log('b', b.toNumber())
    }
    _balance()
  }, [])

}


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
