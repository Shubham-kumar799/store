//components
import ProductSlider from './ProductSlider';
import ProductInfo from './ProductInfo';
import { Box, HStack, useColorModeValue } from '@chakra-ui/react';

//types
import { FC } from 'react';
import { Product } from '@appTypes/products';

interface Props {
  product: Product;
  refetchProduct: any;
}

const ProductView: FC<Props> = ({ product, refetchProduct }) => {
  return (
    <Box m={4} p={4} bg={useColorModeValue('gray.100', 'gray.800')}>
      <ProductSlider images={product.images} />
      <ProductInfo refetchProduct={refetchProduct} product={product} />
    </Box>
  );
};

export default ProductView;
