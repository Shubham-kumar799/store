//comopnents
import { Flex, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import LogInAndSignUpButton from './LogInAndSignUpButton';
import LogoutButton from './LogoutButton';
import ToggleThemeButton from './ToggleThemeButton';
import VerifyEmailButton from './VerifyEmailButton';
import Image from 'next/image';

//types
import { FC } from 'react';

//utils
import { useRouter } from 'next/router';
import { useAppSelector, selectUser } from '@store';
import CartButton from './CartButton';

const Navbar: FC = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  if (
    router.pathname.includes('/register') ||
    router.pathname.includes('/login') ||
    router.pathname.includes('/forgotPassword')
  )
    return null;

  return (
    <Flex
      position={'sticky'}
      top={0}
      zIndex={100}
      bg={useColorModeValue('white', 'gray.800')}
      px={4}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={2}
    >
      <Flex>
        <Image
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
          src={'/images/logo.png'}
          width="50"
          height={'50'}
          objectFit="contain"
        />
      </Flex>

      <Flex>
        <Stack direction={'row'} spacing={8} alignItems={'center'}>
          {user._id &&
            user.role === 'admin' &&
            !router.pathname.includes('/admin') && (
              <Button
                rounded={'full'}
                onClick={() => router.push('/admin/console')}
              >
                To Admin Dashboard
              </Button>
            )}
          {user._id && <CartButton />}
          {user._id && !user.emailVerified && <VerifyEmailButton />}

          <ToggleThemeButton />
          {user._id ? <LogoutButton /> : <LogInAndSignUpButton />}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
