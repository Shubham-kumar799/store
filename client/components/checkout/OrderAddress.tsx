//components
import { Text, Textarea, Button, VStack, useToast } from '@chakra-ui/react';

//types
import { FC } from 'react';

//utils
import { useState } from 'react';
import {
  useAppSelector,
  selectUser,
  useAppDispatch,
  SET_USER_ADDRESS,
} from '@store';
import { useApi } from '@hooks';

const OrderAddress: FC = () => {
  const user = useAppSelector(selectUser);
  const [_, API] = useApi({ method: 'post', url: '/user/address' });
  const [address, setAddress] = useState(user.address);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const changeAddress = async () => {
    try {
      await API({
        body: {
          address,
        },
      });
      dispatch(SET_USER_ADDRESS(address));
      toast({
        status: 'success',
        title: 'Address saved successfully',
        position: 'top-left',
      });
      console.log('user with Addrss', user);
    } catch (error) {
      console.log('error in change address', error);
      toast({
        status: 'error',
        title: 'Error saving adddress. Try Again',
        position: 'bottom-right',
      });
    }
  };

  return (
    <VStack spacing={4} alignItems={'flex-start'} m={2} p={4}>
      <Text fontWeight={'bold'} fontSize="xl">
        Delivery Address :
      </Text>
      {user.address ? (
        <>
          <Textarea
            isReadOnly
            value={user.address}
            placeholder="Enter your address"
          />
          <Button colorScheme={'brand.primary'}>Change Address</Button>
        </>
      ) : (
        <>
          <Textarea
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
          <Button
            isDisabled={!address}
            onClick={changeAddress}
            colorScheme={'brand.primary'}
          >
            Save This Address
          </Button>
        </>
      )}
    </VStack>
  );
};

export default OrderAddress;
