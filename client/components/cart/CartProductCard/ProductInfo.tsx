//components
import { Text, VStack, Tag, Badge } from '@chakra-ui/react';

//types
import { CartProduct } from '@appTypes/cart';
import { FC } from 'react';

interface Props {
  product: CartProduct;
}

const ProductInfo: FC<Props> = ({ product }) => {
  return (
    <VStack alignItems={'flex-start'}>
      <Text fontSize={'2xl'} fontWeight="bold">
        {product.name}
      </Text>
      <Text maxW={'xs'} noOfLines={3}>
        {product.description}
      </Text>
      <Badge color={product.color}>{product.color}</Badge>
      <Tag>{product.brand}</Tag>
    </VStack>
  );
};

export default ProductInfo;
