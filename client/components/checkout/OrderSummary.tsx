//components
import {
  Text,
  Center,
  Button,
  Divider,
  HStack,
  VStack,
} from '@chakra-ui/react';
import ProductTable from './ProductTable';
import { DiscountSlip } from '@components/global';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';
import { CartProduct } from '@appTypes/cart';

//utils
import { useAppSelector, selectCouponInfo } from '@store';
import { useRouter } from 'next/router';

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
  const couponInfo = useAppSelector(selectCouponInfo);
  const router = useRouter();

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
      {couponInfo.couponApplied ? (
        <DiscountSlip />
      ) : (
        <HStack>
          <Text fontSize="lg" fontWeight={'bold'}>
            Grand Total :
          </Text>
          <BiRupee />
          <Text fontSize="xl" fontWeight={'extrabold'}>
            {grandTotal}
          </Text>
        </HStack>
      )}

      <Divider />
      <Button
        onClick={() => router.push('/payment')}
        colorScheme={'brand.tertiary'}
      >
        Place Order
      </Button>
    </VStack>
  );
};

export default OrderSummary;
