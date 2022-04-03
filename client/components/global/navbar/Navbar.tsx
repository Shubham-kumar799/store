import { FC } from 'react';

//comopnents
import { Box, Flex, Stack, IconButton, Button } from '@chakra-ui/react';
import LogInAndSignUpButton from './LogInAndSignUpButton';
import LogoutButton from './LogoutButton';
import ToggleThemeButton from './ToggleThemeButton';
import VerifyEmailButton from './VerifyEmailButton';
import Link from 'next/link';
import Image from 'next/image';

//icon
import { MdShoppingBasket } from 'react-icons/md';

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
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Link href={'/'}>
              <Image
                style={{ cursor: 'pointer' }}
                src={'/store.png'}
                width="150"
                height={'150'}
              />
            </Link>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {user &&
                user.role === 'admin' &&
                !router.pathname.includes('/admin') && (
                  <Button
                    rounded={'full'}
                    onClick={() => router.push('/admin/console')}
                  >
                    To Admin Dashboard
                  </Button>
                )}
              {user && (
                <IconButton
                  colorScheme={'brand.tertiary'}
                  aria-label="Cart"
                  icon={<MdShoppingBasket />}
                />
              )}
              {user && !user.emailVerified && <VerifyEmailButton />}

              <ToggleThemeButton />
              {user ? <LogoutButton /> : <LogInAndSignUpButton />}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
