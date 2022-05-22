//components
import {
  Box,
  Text,
  Center,
  Button,
  Divider,
  HStack,
  VStack,
} from '@chakra-ui/react';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';
import { CartProduct } from '@appTypes/cart';
import ProductTable from './ProductTable';

interface Props {
  grandTotal: number;
  products: [
    {
      product: CartProduct;
      count: number;
    }
  ];
}

const OrderSummary: FC<Props> = ({ grandTotal, products }) => {
  return (
    <VStack
      spacing={4}
      alignItems="flex-start"
      p={4}
      m={4}
      rounded="xl"
      shadow="lg"
    >
      <Center>
        <Text fontSize="2xl" fontWeight={'bold'}>
          Order Summary
        </Text>
      </Center>

      <Text fontSize="lg" fontWeight={'bold'}>
        Products
      </Text>
      <ProductTable products={products} />

      <HStack>
        <Text fontSize="lg" fontWeight={'bold'}>
          Grand Total :
        </Text>
        <BiRupee />
        <Text>{grandTotal}</Text>
      </HStack>

      <Divider />
      <Button w="full" colorScheme={'brand.tertiary'}>
        Place Order
      </Button>
    </VStack>
  );
};

export default OrderSummary;
