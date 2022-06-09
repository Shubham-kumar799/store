//comopnents
import {
  VStack,
  Box,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import LogInAndSignUpButton from './LogInAndSignUpButton';
import LogoutButton from './LogoutButton';

import VerifyEmailButton from './VerifyEmailButton';

import AppDrawer from '../AppDrawer';

//icons
import { HamburgerIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

//utils
import { useRouter } from 'next/router';
import { useAppSelector, selectUser } from '@store';

const Responsive: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  return (
    <Box>
      <IconButton
        aria-label="Search database"
        icon={<HamburgerIcon onClick={onOpen} />}
      />
      <AppDrawer
        closeOnOverlayClick={true}
        footer={false}
        isOpen={isOpen}
        onClose={onClose}
        themeControl={true}
      >
        <VStack spacing={8} alignItems={'flex-start'}>
          {user._id &&
            user.role === 'admin' &&
            !router.pathname.includes('/admin') && (
              <Button
                w="full"
                variant={'outline'}
                onClick={() => router.push('/admin/orders')}
              >
                To Admin Dashboard
              </Button>
            )}
          {user._id && (
            <Button
              variant={'outline'}
              w={'full'}
              onClick={() => router.push('/myOrders')}
            >
              My Orders
            </Button>
          )}
          {user._id && (
            <Button
              variant={'outline'}
              w={'full'}
              onClick={() => router.push('/cart')}
            >
              My Cart
            </Button>
          )}
          {user._id && !user.emailVerified && <VerifyEmailButton />}
          <Box position="absolute" bottom={10}>
            {user._id ? <LogoutButton /> : <LogInAndSignUpButton />}
          </Box>
        </VStack>
      </AppDrawer>
    </Box>
  );
};

export default Responsive;
