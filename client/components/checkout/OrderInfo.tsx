//components
import {
  Box,
  Text,
  Textarea,
  HStack,
  Button,
  VStack,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';

//types
import { FC } from 'react';
import ApplyCoupon from './ApplyCoupon';

const OrderInfo: FC = () => {
  return (
    <Box>
      <VStack spacing={4} alignItems={'flex-start'} m={2} p={4}>
        <Text fontWeight={'bold'} fontSize="xl">
          Delivery Address :
        </Text>
        <Textarea placeholder="Enter your address" />
        <Button colorScheme={'brand.primary'}>Save This Address</Button>
      </VStack>
      <ApplyCoupon />
    </Box>
  );
};

export default OrderInfo;
