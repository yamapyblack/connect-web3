import { ReactNode } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Button,
  LinkBox,
  LinkOverlay,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { ethers } from "ethers";

import { networkInfo, nftInfo } from "../../public/config/blockchainConfig";
import { abi } from "../../public/config/abi/abi";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getBlockchain } from "../features/blockchain/blockchainSlice";
import { shortLen } from "../features/blockchain/Blockchain";
import { isLoggedIn } from "../app/hooks";

const MintPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const blockchain = useAppSelector(getBlockchain);
  const [mintNum, setMintNum] = useState(0);
  const toast = useToast();

  const amount = async () => {
    if (!isLoggedIn) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftInfo.contractAddress, abi, signer);

    try {
      const mintNumber = (await contract.counter()).toString() - 1;
      setMintNum(mintNumber);
    } catch (e) {
      console.log(e);
    }
  };

  const claim = async () => {
    if (!isLoggedIn) {
      return;
    }
    let price = nftInfo.price;

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftInfo.contractAddress, abi, signer);

    try {
      const tx = await contract.buy({ value: ethers.utils.parseEther(price) });
      console.log(tx);
      toast({
        title: "Transaction",
        description: "Starting to execute a transaction",
        status: "success",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Transaction",
        description: "Something went wrong.",
        status: "error",
      });
    }
  };

  useEffect(() => {
    amount();
  }, [blockchain.account, blockchain.chainId]);

  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Mint NFT
        </Heading>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box position="relative">
            <Box py={4} px={12}>
              <Text fontSize="5xl" fontWeight="900">
                {mintNum}/{nftInfo.maxSupply}
              </Text>
            </Box>
            <Box px={12}>
              <LinkBox>
                <LinkOverlay href={nftInfo.scanLink}>
                  <Button variant={"link"} colorScheme={"blue"}>
                    {shortLen(nftInfo.contractAddress)}
                  </Button>
                </LinkOverlay>
              </LinkBox>
            </Box>
            <Box py={4} px={12} fontSize="2xl">
              1 {nftInfo.symbol} consts {nftInfo.price}{" "}
              {networkInfo.nativeCurrency.symbol}
            </Box>
            <Box py={4} px={12}>
              Excluding gas fees.
            </Box>
            <Box px={12}>Click buy to mint NFT.</Box>
            <VStack py={8}>
              <Box w="80%">
                <Button w="full" colorScheme="pink" onClick={claim}>
                  Buy 1
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
      </Stack>
    </Box>
  );
};

export default MintPage;

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}
