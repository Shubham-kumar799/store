//components
import { HStack, VStack, Text } from '@chakra-ui/react';
import { RunLottieAnimation } from '@components/global';

//types
import { FC } from 'react';

//utils
import { useRouter } from 'next/router';

const PaymentSuccessful: FC = () => {
  const router = useRouter();
  return (
    <VStack>
      <Text fontSize="xl" fontWeight={'bold'}>
        Payment Successful
      </Text>

      <RunLottieAnimation
        loop={false}
        path="/animation/paymentSuccessful.json"
      />
      <HStack>
        <Text fontSize={'xl'}>You can check your orders </Text>
        <Text
          fontSize={'xl'}
          color="brand.primary.500"
          _hover={{
            textDecorationLine: 'underline',
          }}
          cursor="pointer"
          fontWeight={'bold'}
          onClick={() => router.push('myOrders')}
        >
          here
        </Text>
      </HStack>
    </VStack>
  );
};

export default PaymentSuccessful;
