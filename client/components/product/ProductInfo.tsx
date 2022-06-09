//components
import { Box, Heading, Text, Center, Flex } from '@chakra-ui/react';

//types
import { Product } from '@appTypes/products';
import { FC } from 'react';
import ProductInfoLeft from './ProductInfoLeft';
import ProductInfoRight from './ProductInfoRight';

interface Props {
  product: Product;
  refetchProduct: any;
}

const ProductInfo: FC<Props> = ({ product, refetchProduct }) => {
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
    ratings,
    _id,
  } = product;
  return (
    <Box>
      <Center m={2} mt={0}>
        <Heading>{name}</Heading>
      </Center>
      <Text textAlign={{ base: 'center', md: 'start' }}>{description}</Text>

      <Flex
        alignItems={'center'}
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent="center"
      >
        <ProductInfoLeft
          refetchProduct={refetchProduct}
          productId={_id}
          rating={ratings}
          price={price}
          subCategories={subCategories}
        />
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
