import { ethers } from "ethers";

export async function connect(ethereum: ethers.providers.ExternalProvider): Promise<string> {
  console.log("connect");

  const provider = new ethers.providers.Web3Provider(
    ethereum
  );

  const accounts = await provider.send("eth_requestAccounts", [])
  return accounts[0];
};

export async function getChain(): Promise<string> {
  console.log("setChain");

  const chainId = await (window as any).ethereum.request({
    method: "eth_chainId",
  });
  return chainId;
};
