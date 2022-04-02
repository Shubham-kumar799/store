//components
import {
  Flex,
  useColorModeValue,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';
import { RegistrationForm } from '@components/register';
import { AppLink, GoogleButton, FacebookButton } from '@components/global';

//types
import { NextPage } from 'next';

//utils
import { useRouter } from 'next/router';
import { PreventUser } from '@components/wrappers';

const Register: NextPage = () => {
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
            Sign Up Here
          </Text>
          <RegistrationForm />

          <HStack>
            <Text>Already a customer ? </Text>
            <AppLink onClick={() => router.push('/login')} text={'Sign In'} />
          </HStack>
          <HStack>
            <FacebookButton title="Continue with Facebook" />
            <GoogleButton title="Sign Up with Google" />
          </HStack>
        </VStack>
      </Flex>
    </PreventUser>
  );
};

export default Register;
