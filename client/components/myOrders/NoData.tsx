//types
import { VStack, Text } from '@chakra-ui/react';
import { RunLottieAnimation } from '@components/global';

//types
import { FC } from 'react';

const NoData: FC = () => {
  return (
    <VStack spacing={10}>
      <Text fontSize="xl" fontWeight="bold">
        You have no orders
      </Text>
      <RunLottieAnimation path="/animation/noMyOrders.json" />
    </VStack>
  );
};

export default NoData;
