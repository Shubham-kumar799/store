//components
import {
  Flex,
  useColorModeValue,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { LoginForm } from '@components/login';
import { AppLink, FacebookButton, GoogleButton } from '@components/global';
import { PreventUser } from '@components/wrappers';

//types
import { NextPage } from 'next';

//utils
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const router = useRouter();
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
            Log In to get started
          </Text>
          <LoginForm />
          <HStack>
            <Text>New User ? </Text>
            <AppLink
              onClick={() => router.push('/register')}
              text={' Sign Up here'}
            />
          </HStack>
          <AppLink
            onClick={() => router.push('/forgotPassword')}
            text="Forgot Password"
          />
          <HStack>
            <FacebookButton title="Continue with Facebook" />
            <GoogleButton title="Sign In with Google" />
          </HStack>
        </VStack>
      </Flex>
    </PreventUser>
  );
};

export default Login;
