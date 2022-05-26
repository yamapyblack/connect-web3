import type { NextPage } from 'next'

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

const IndexPage: NextPage = () => {
  return (
    <>
      <Container maxW={'4xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Accerelate your development<br />
            <Text as={'span'} color={'green.400'}>
              on Web3
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            You can get and store users address and chainid by the Metamask and<br/>
            Next.js and Redux help your velocity.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default IndexPage
