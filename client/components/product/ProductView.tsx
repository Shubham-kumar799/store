//components
import ProductSlider from './ProductSlider';
import ProductInfo from './ProductInfo';
import { Box, HStack, useColorModeValue } from '@chakra-ui/react';

//types
import { FC } from 'react';
import { Product } from '@appTypes/products';

interface Props {
  product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
  return (
    <Box m={4} p={4} bg={useColorModeValue('gray.100', 'gray.800')}>
      <ProductSlider images={product.images} />;
      <ProductInfo product={product} />
    </Box>
  );
};

export default ProductView;
