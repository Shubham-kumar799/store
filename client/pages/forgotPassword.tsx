//components
import { Text, Flex, VStack, useColorModeValue } from '@chakra-ui/react';
import { ForgotPasswordEmailForm } from '@components/forgotPassword';
import { PreventUser } from '@components/wrappers';

//types
import { NextPage } from 'next';

const ForgotPassword: NextPage = () => {
  return (
    <PreventUser>
      <Flex
        bg={useColorModeValue('brand.background.200', 'brand.background.800')}
        align="center"
        justify="center"
        h="100vh"
      >
        <VStack flex={1} spacing={'12'}>
          <Text fontWeight={'bold'} fontSize={'3xl'}>
            Reset Your Password
          </Text>
          <ForgotPasswordEmailForm />
        </VStack>
      </Flex>
    </PreventUser>
  );
};

export default ForgotPassword;
