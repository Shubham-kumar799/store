//components
import {
  Flex,
  useColorModeValue,
  VStack,
  Text,
  HStack,
  Button,
} from '@chakra-ui/react';
import { LoginForm } from '@components/login';
import { FacebookButton, GoogleButton } from '@components/global';
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
            <Button
              colorScheme={'brand.link'}
              onClick={() => router.push('/register')}
              variant="link"
            >
              Sign Up here
            </Button>
          </HStack>
          <Button
            colorScheme={'brand.link'}
            onClick={() => router.push('/forgotPassword')}
            variant={'link'}
          >
            Forgot Password
          </Button>
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
