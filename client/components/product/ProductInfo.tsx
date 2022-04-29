//components
import { Box, Heading, Text, Center, Flex } from '@chakra-ui/react';

//types
import { Product } from '@appTypes/products';
import { FC } from 'react';
import ProductInfoLeft from './ProductInfoLeft';
import ProductInfoRight from './ProductInfoRight';

interface Props {
  product: Product;
}

const ProductInfo: FC<Props> = ({ product }) => {
  const {
    name,
    quantity,
    color,
    brand,
    category,
    subCategories,
    description,
    price,
    sold,
    shipping,
  } = product;
  return (
    <Box>
      <Center m={2} mt={0}>
        <Heading>{name}</Heading>
      </Center>
      <Text>{description}</Text>

      <Flex alignItems={'flex-start'} justifyContent={'space-between'}>
        <ProductInfoLeft price={price} subCategories={subCategories} />
        <ProductInfoRight
          brand={brand}
          category={category}
          color={color}
          quantity={quantity}
          shipping={shipping}
          sold={sold}
        />
      </Flex>
    </Box>
  );
};

export default ProductInfo;
