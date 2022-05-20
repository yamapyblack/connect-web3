import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import web3Reducer from '../features/web3/web3Slice'
import blockchainReducer from '../features/blockchain/blockchainSlice'

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, web3: web3Reducer, blockchain: blockchainReducer },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
