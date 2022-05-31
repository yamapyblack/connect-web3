import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../app/store'
import { abi } from "../../../public/config/abi/abi";

import { networkInfo } from "../../../public/config/blockchainConfig";

export interface BlockchainState {
  account: string
  chainId: string
  errorMsg: string
}

const initialState = {
  account: '',
  chainId: '',
  errorMsg: '',
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window as any;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (!metamaskIsInstalled) {
      return dispatch(connectFailed("Install Metamask."));      
    }
    
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      dispatch(
        setAccount(accounts[0])
      );
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      dispatch(
        setChainId(chainId)
      )
      if (chainId != networkInfo.chainId) {
        return dispatch(connectFailed(`Change network to ${networkInfo.chainName}.`));
      }
      // Add listeners start
      ethereum.on("accountsChanged", (accounts) => {
        dispatch(setAccount(accounts[0]));
      });
      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      // Add listeners end
    } catch (err) {
      console.log(err)
      dispatch(connectFailed("Something went wrong."));
    }
  };
};

export const addChain = () => {
  return async (dispatch) => {
    const { ethereum } = window as any;

    try {
      await (window as any).ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networkInfo],
      });
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      dispatch(
        setChainId(chainId)
      )
    } catch (err) {
      console.log("Astar Network already Connected");
    }
  };
}

export const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload
    },
    setChainId: (state, action: PayloadAction<string>) => {
      state.chainId = action.payload
    },
    connectRequest: (state) => {
      state.errorMsg = ""
    },
    connectFailed: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload
    },
  },
})

export const { setAccount, setChainId, connectRequest, connectFailed } = blockchainSlice.actions

export const getBlockchain = (state: AppState) => state.blockchain

export default blockchainSlice.reducer
