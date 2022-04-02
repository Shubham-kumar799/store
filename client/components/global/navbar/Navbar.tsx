import { FC } from 'react';

//comopnents
import { Box, Flex, Stack } from '@chakra-ui/react';
import LogInAndSignUpButton from './LogInAndSignUpButton';
import LogoutButton from './LogoutButton';
import ToggleThemeButton from './ToggleThemeButton';
import VerifyEmailButton from './VerifyEmailButton';

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
          <Box>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
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
