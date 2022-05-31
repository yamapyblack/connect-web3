import type { NextPage } from 'next'

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  LinkOverlay,
  LinkBox,
  Image,
  Flex
} from '@chakra-ui/react';

const IndexPage: NextPage = () => {
  return (
    <>
      <Container maxW={'4xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 6, md: 10 }}
          >
          <Heading
            mt={8}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
              Hello&nbsp;
              <Text as={'span'} color={'green.400'}>Web3 &#128526;</Text>
          </Heading>
          <Flex w={'full'} justifyContent="center">
            <Image src="logo.png" />
          </Flex>
          <Text color={'gray.500'}>
            Metamask connect by Next.js and Redux.
          </Text>
          <Stack
            direction={'column'}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button>
          </Stack>
          <LinkBox>
            <LinkOverlay href="/mint">
              <Button colorScheme={'pink'} size={'md'}>
                Mint Page
              </Button>
            </LinkOverlay>
          </LinkBox>
        </Stack>
      </Container>
    </>
  );
}

export default IndexPage
