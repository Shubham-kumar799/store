//components
import {
  Box,
  Center,
  Text,
  Icon,
  HStack,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { CategoryBadge, ProductRating } from '@components/global';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';
import { SubCategory } from '@appTypes/subCategories';
import { ProductRatingType } from '@appTypes/products';
import { CardFooter } from '@components/home/ProductCard';

interface Props {
  price: number;
  subCategories: SubCategory[];
  productId: string;
  rating: ProductRatingType[];
  refetchProduct: any;
}

const ProductInfoLeft: FC<Props> = ({
  price,
  subCategories,
  productId,
  rating,
  refetchProduct,
}) => {
  return (
    <VStack mt={10} p={4} spacing={'10'} alignItems="flex-start" flex={1}>
      <HStack>
        <Icon as={BiRupee} />
        <Text fontWeight="bold" fontSize="2xl" as={'i'}>
          {price}
        </Text>
        <Text>(Inc. of all taxes)</Text>
      </HStack>

      <Box>
        <ProductRating
          refetchProduct={refetchProduct}
          productId={productId}
          rating={rating}
        />
      </Box>
      <Wrap>
        {subCategories.map(s => (
          <CategoryBadge name={s.name} />
        ))}
      </Wrap>

      <CardFooter />
    </VStack>
  );
};

export default ProductInfoLeft;
