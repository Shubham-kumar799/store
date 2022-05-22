//components
import { HStack, Text, Grid, GridItem } from '@chakra-ui/react';
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
    <Grid
      position="relative"
      borderWidth={2}
      rounded="2xl"
      p={4}
      m={2}
      alignItems="center"
      templateColumns="repeat(4, 1fr)"
      gap={'6'}
    >
      <DeleteButton
        cartTotal={cartTotal}
        productPrice={product.price}
        productQuantity={count}
        cartId={cartId}
        productId={product._id}
        cartProducts={cartProducts}
      />
      <BuyNowButton />
      <GridItem>
        <Image
          objectFit="contain"
          src={product.images[0].url}
          height={200}
          width={200}
        />
      </GridItem>
      <GridItem>
        <ProductInfo product={product} />
      </GridItem>
      <GridItem>
        <QuantityButtons
          cartId={cartId}
          cartProducts={cartProducts}
          cartTotal={cartTotal}
          productPrice={product.price}
          productId={product._id}
          count={count}
        />
      </GridItem>
      <GridItem>
        <HStack alignItems={'center'} justifyContent="center">
          <BiRupee />
          <Text fontWeight={'extrabold'} fontSize="2xl">
            {product.price}
          </Text>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default CartProductCard;
