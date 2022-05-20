import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getBlockchain, connect } from "./blockchainSlice";

function Blockchain() {
  const dispatch = useAppDispatch();  
  const blockchain = useAppSelector(getBlockchain);

  return (
    <div>
        <div>{blockchain.account}</div>
        <div>{blockchain.errorMsg}</div>
        {/* <div>{blockchain.web3}</div> */}
      <div>
        <button onClick={() => dispatch(connect())}>Connect</button>
      </div>
    </div>
  );
}

export default Blockchain;

