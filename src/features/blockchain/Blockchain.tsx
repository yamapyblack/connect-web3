import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  useToast,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getBlockchain, connect, addChain } from "./blockchainSlice";
import { useEffect } from "react";

import { blockchainConfig } from "../../../public/config/blockchainConfig";

const shortLen = (addr: string) => {
  return addr.slice(0, 7) + "..." + addr.slice(-5);
};

function Blockchain() {
  const toast = useToast();
  
  const dispatch = useAppDispatch();
  const blockchain = useAppSelector(getBlockchain);

  useEffect(() => {
    dispatch(connect());
  }, []);

  useEffect(() => {
    //toast
    if(blockchain.errorMsg == ''){return}
    toast({
      title: "Connect",
      description: blockchain.errorMsg,
      status: "error",
    });
  }, [blockchain.errorMsg]);

  return (
    <Box bg={"brand.200"}>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1 }}
        >
          <Heading>
            WalletConnectByNextRedux
          </Heading>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!blockchain.account ? (
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"gray.600"}
              px="32px"
              _hover={{
                bg: "gray.500",
              }}
              onClick={() => dispatch(connect())}
            >
              CONNECT
            </Button>
          ) : blockchain.chainId != blockchainConfig.NETWORK.CHAIN_ID ? (
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"red.700"}
              px="32px"
              _hover={{
                bg: "red.500",
              }}
              onClick={() => dispatch(addChain())}
            >
              Wrong Network
            </Button>
          ) : (
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"gray.600"}
              px="32px"
              _hover={{
                bg: "gray.500",
              }}
            >
              {shortLen(blockchain.account)}
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

export default Blockchain;
