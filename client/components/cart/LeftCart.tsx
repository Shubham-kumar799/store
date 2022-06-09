//components
import { CartProductCard } from './CartProductCard';
import { Flex } from '@chakra-ui/react';

//types
import { FC } from 'react';
import { CartProduct } from '@appTypes/cart';

interface Props {
  cartId: string;
  cartTotal: number;
  cartProducts: [
    {
      count: number;
      product: CartProduct;
    }
  ];
}

const LeftCart: FC<Props> = ({ cartTotal, cartProducts, cartId }) => {
  return (
    <Flex p={2} flexWrap={'wrap'} justifyContent={'center'}>
      {cartProducts.map(productData => (
        <CartProductCard
          cartProducts={cartProducts}
          cartTotal={cartTotal}
          key={productData.product._id}
          count={productData.count}
          product={productData.product}
          cartId={cartId}
        />
      ))}
    </Flex>
  );
};

export default LeftCart;
