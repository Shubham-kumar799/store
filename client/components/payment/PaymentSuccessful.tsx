//components
import { Button, HStack, VStack, Text } from '@chakra-ui/react';

//types
import { FC } from 'react';

//utils

import PaymentSuccessfulAnimation from './PaymentSuccessfulAnimation';

const PaymentSuccessful: FC = () => {
  return (
    <VStack>
      <Text fontSize="xl" fontWeight={'bold'}>
        Payment Successful
      </Text>
      <PaymentSuccessfulAnimation />
      <HStack>
        <Text fontSize={'xl'}>You can check your orders </Text>
        <Text
          fontSize={'xl'}
          color="brand.primary.500"
          textDecorationLine={'underline'}
          cursor="pointer"
          fontWeight={'bold'}
        >
          here
        </Text>
      </HStack>
    </VStack>
  );
};

export default PaymentSuccessful;
