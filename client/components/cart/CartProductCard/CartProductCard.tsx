//components
import { HStack, Text, Box, Flex, Divider, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import QuantityButtons from './QuantityButtons';
import ProductInfo from './ProductInfo';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { CartProduct } from '@appTypes/cart';
import { FC } from 'react';
import DeleteButton from './DeleteButton';
import BuyNowButton from './BuyNowButton';

interface Props {
  cartId: string;
  count: number;
  product: CartProduct;
  cartTotal: number;
  cartProducts: [
    {
      count: number;
      product: CartProduct;
    }
  ];
}

const CartProductCard: FC<Props> = ({
  cartProducts,
  count,
  cartTotal,
  product,
  cartId,
}) => {
  return (
    <Flex
      rounded="xl"
      m={2}
      flex={1}
      borderWidth={2}
      flexDir="column"
      position="relative"
    >
      <DeleteButton
        cartTotal={cartTotal}
        productPrice={product.price}
        productQuantity={count}
        cartId={cartId}
        productId={product._id}
        cartProducts={cartProducts}
      />
      {/* <BuyNowButton /> */}
      <Image
        objectFit="cover"
        src={product.images[0].url}
        height={250}
        width={200}
        style={{
          borderTopLeftRadius: '0.75rem',
          borderTopRightRadius: '0.75rem',
        }}
      />
      <VStack p={4} textAlign="center" spacing={4}>
        <ProductInfo product={product} />
        <QuantityButtons
          cartId={cartId}
          cartProducts={cartProducts}
          cartTotal={cartTotal}
          productPrice={product.price}
          productId={product._id}
          count={count}
        />
        <Divider my={2} />
        <HStack alignItems={'center'} justifyContent="center">
          <BiRupee />
          <Text fontWeight={'extrabold'} fontSize="2xl">
            {product.price}
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default CartProductCard;
