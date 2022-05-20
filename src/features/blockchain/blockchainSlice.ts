import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ethers } from "ethers";

import type { AppState, AppThunk } from '../../app/store'

export interface BlockchainState {
  account: string
  web3: ethers.providers.ExternalProvider
}

const initialState = {
  loading: false,
  account: null,
  web3: null,
  errorMsg: "",
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    const { ethereum } = window as any;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (!metamaskIsInstalled) {
      return dispatch(connectFailed("Install Metamask."));      
    }
    
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      if (chainId != CONFIG.NETWORK.CHAIN_ID) {
        return dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
      }
      dispatch(
        connectSuccess({
          account: accounts[0],
          web3: ethereum,
        })
      );
      // Add listeners start
      ethereum.on("accountsChanged", (accounts) => {
        dispatch(updateAccount(accounts[0]));
      });
      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      // Add listeners end
    } catch (err) {
      dispatch(connectFailed("Something went wrong."));
    }
  };
};


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const connectSuccess = createAsyncThunk(
//   'CONNECTION_SUCCESS',
//   async () => {
//     const addr = await connect(state.ethereum)
//     return addr
//   }
// )

export const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    connectRequest: (state) => {
      state.loading = true
    },
    connectSuccess: (state, action: PayloadAction<BlockchainState>) => {
      state.loading = false
      state.account = action.payload.account
      state.web3 = action.payload.web3
      state.errorMsg = ""
    },
    connectFailed: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.errorMsg = action.payload
    },
    updateAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(setAddressAsync.fulfilled, (state, action) => {
  //       state.address = action.payload
  //     })
  // },
})

export const { connectRequest, connectSuccess, connectFailed, updateAccount } = blockchainSlice.actions

export const getBlockchain = (state: AppState) => state.blockchain

export default blockchainSlice.reducer
