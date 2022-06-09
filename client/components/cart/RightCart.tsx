//components
import { VStack, Text, Button, HStack } from '@chakra-ui/react';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';
import { useRouter } from 'next/router';
import { CartProduct } from '@appTypes/cart';

interface Props {
  cart: {
    cartTotal: number;
    products: [
      {
        product: CartProduct;
        count: number;
      }
    ];
  };
}

const RightCart: FC<Props> = ({ cart }) => {
  const router = useRouter();
  return (
    <VStack
      flex={1}
      maxW={'md'}
      shadow={'2xl'}
      p={4}
      borderWidth={4}
      m={4}
      rounded="xl"
    >
      <Text fontSize="2xl" fontWeight={'bold'}>
        Cart Summary
      </Text>
      <HStack alignSelf={'flex-start'}>
        <Text fontSize="lg" fontWeight={'bold'}>
          Number Of Items :
        </Text>
        <Text fontSize="lg">{cart.products.length}</Text>
      </HStack>
      <HStack alignSelf={'flex-start'}>
        <Text fontSize="lg" fontWeight={'bold'}>
          Grand Total :
        </Text>

        <BiRupee />
        <Text fontSize="lg" fontWeight={'bold'}>
          {cart.cartTotal}
        </Text>
      </HStack>

      <Button
        onClick={() =>
          router.push({
            pathname: '/checkout',
          })
        }
        w="full"
        variant={'solid'}
        colorScheme={'brand.tertiary'}
      >
        PROCEED TO CHECKOUT
      </Button>
    </VStack>
  );
};

export default RightCart;
