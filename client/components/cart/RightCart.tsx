//components
import { VStack, Text, Button, HStack } from '@chakra-ui/react';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';

interface Props {
  cartCount: Number;
  cartTotal: Number;
}

const RightCart: FC<Props> = ({ cartCount, cartTotal }) => {
  return (
    <VStack shadow={'2xl'} p={4} borderWidth={4} m={4} rounded="xl">
      <Text fontSize="2xl" fontWeight={'bold'}>
        Cart Summary
      </Text>
      <HStack alignSelf={'flex-start'}>
        <Text fontSize="lg" fontWeight={'bold'}>
          Number Of Items :
        </Text>
        <Text fontSize="lg">{cartCount}</Text>
      </HStack>
      <HStack alignSelf={'flex-start'}>
        <Text fontSize="lg" fontWeight={'bold'}>
          Grand Total :
        </Text>

        <BiRupee />
        <Text fontSize="lg" fontWeight={'bold'}>
          {cartTotal}
        </Text>
      </HStack>

      <Button w="full" variant={'solid'} colorScheme={'brand.tertiary'}>
        Proceed To Checkout
      </Button>
    </VStack>
  );
};

export default RightCart;
