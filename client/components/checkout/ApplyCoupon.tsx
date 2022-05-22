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

const ApplyCoupon: FC = () => {
  return (
    <Box p={4} m={2}>
      <HStack justifyContent={'space-between'}>
        <HStack>
          <Text fontWeight={'bold'}>ADD COUPON</Text>
          <PinInput type="alphanumeric">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button colorScheme={'brand.tertiary'}>APPLY</Button>
      </HStack>
    </Box>
  );
};

export default ApplyCoupon;
