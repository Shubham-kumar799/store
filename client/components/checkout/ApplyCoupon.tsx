//components
import {
  Text,
  HStack,
  Button,
  Flex,
  PinInput,
  PinInputField,
  useToast,
} from '@chakra-ui/react';
import { useApi } from '@hooks';

//types
import { FC } from 'react';

//utils
import { useState } from 'react';
import { useAppDispatch, SET_COUPON } from '@store';

const ApplyCoupon: FC = () => {
  const [coupon, setCoupon] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_, API] = useApi({ method: 'post', url: '/coupon/apply' });
  const dispatch = useAppDispatch();
  const toast = useToast();

  const applyCoupon = async () => {
    try {
      if (!coupon) return;
      setIsLoading(true);
      const data = await API({ body: { coupon } });
      toast({
        status: 'success',
        title: 'Coupon applied to your order',
        position: 'top-left',
      });
      dispatch(
        SET_COUPON({
          couponName: coupon,
          //@ts-ignore
          discountedPrice: data.payload.discountedPrice,
          couponApplied: true,
          //@ts-ignore
          originalPrice: data.payload.originalPrice,
        })
      );
      setCoupon('');
    } catch (error) {
      console.log('Error in apply coupon', error);
      toast({
        status: 'error',
        //@ts-ignore
        title: error.response.data.payload,
        position: 'top-left',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex wrap={'wrap'} p={4} m={2}>
      <HStack w="full" justifyContent={'space-between'}>
        <HStack>
          <Text fontWeight={'bold'}>ADD COUPON</Text>
          <PinInput
            value={coupon}
            onChange={e => setCoupon(e)}
            type="alphanumeric"
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button
          isLoading={isLoading}
          onClick={applyCoupon}
          colorScheme={'brand.tertiary'}
          variant="outline"
        >
          APPLY
        </Button>
      </HStack>
    </Flex>
  );
};

export default ApplyCoupon;
