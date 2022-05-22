//components
import { CartProductCard } from './CartProductCard';
import { Box } from '@chakra-ui/react';

//types
import { FC } from 'react';
import { CartProduct } from '@appTypes/cart';

interface Props {
  cartProducts: [
    {
      count: number;
      product: CartProduct;
    }
  ];
}

const LeftCart: FC<Props> = ({ cartProducts }) => {
  return (
    <Box>
      {cartProducts.map(productData => (
        <CartProductCard
          key={productData.product._id}
          count={productData.count}
          product={productData.product}
        />
      ))}
    </Box>
  );
};

export default LeftCart;
