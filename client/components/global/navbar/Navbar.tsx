//comopnents
import {
  Flex,
  Stack,
  Button,
  useColorModeValue,
  Show,
  Hide,
} from '@chakra-ui/react';
import LogInAndSignUpButton from './LogInAndSignUpButton';
import LogoutButton from './LogoutButton';
import ToggleThemeButton from './ToggleThemeButton';
import VerifyEmailButton from './VerifyEmailButton';
import Image from 'next/image';
import Responsive from './Responsive';
import CartButton from './CartButton';

//types
import { FC } from 'react';

//utils
import { useRouter } from 'next/router';
import { useAppSelector, selectUser } from '@store';

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
      pt={0}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={2}
    >
      <Flex>
        <Image
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
          src={'/images/logo.png'}
          width="48"
          height={'48'}
          objectFit="contain"
        />
      </Flex>
      <Show above="md">
        <Flex>
          <Stack direction={'row'} spacing={8} alignItems={'center'}>
            {user._id &&
              user.role === 'admin' &&
              !router.pathname.includes('/admin') && (
                <Button
                  rounded={'full'}
                  onClick={() => router.push('/admin/orders')}
                >
                  To Admin Dashboard
                </Button>
              )}
            {user._id && (
              <Button
                variant={'outline'}
                colorScheme={'brand.tertiary'}
                onClick={() => router.push('/myOrders')}
              >
                My Orders
              </Button>
            )}
            {user._id && <CartButton />}
            {user._id && !user.emailVerified && <VerifyEmailButton />}

            <ToggleThemeButton />
            {user._id ? <LogoutButton /> : <LogInAndSignUpButton />}
          </Stack>
        </Flex>
      </Show>
      <Hide above="md">
        <Responsive />
      </Hide>
    </Flex>
  );
};

export default Navbar;
