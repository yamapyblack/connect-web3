import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setAddress, setAddressAsync, setEthereum, getWeb3, setChainIdAsync } from "./web3Slice";

function Web3() {
  const dispatch = useAppDispatch();
  const web3 = useAppSelector(getWeb3);
  
  dispatch(setEthereum((window as any).ethereum))
  dispatch(setAddress("yama0"))

  return (
    <div>
        <div>{web3.address}</div>
        <div>{web3.chainId}</div>
      <div>
        <button onClick={() => dispatch(setAddress("yama1"))}>Set</button>
        <button onClick={() => dispatch(setAddressAsync())}>Add Async</button>
        <button onClick={() => dispatch(setChainIdAsync())}>Add chaiId Async</button>
      </div>
    </div>
  );
}

export default Web3;
