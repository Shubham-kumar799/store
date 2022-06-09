//components
import { Box, Text, Icon, HStack, VStack, Wrap, Flex } from '@chakra-ui/react';
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
    <VStack
      mt={10}
      p={4}
      spacing={'10'}
      alignItems={{ md: 'flex-start' }}
      flex={1}
    >
      <HStack justifyContent={{ base: 'center', md: 'flex-start' }}>
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
      <Flex
        w="full"
        flexWrap={'wrap'}
        p={2}
        alignItems="center"
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        {subCategories.map(s => (
          <CategoryBadge name={s.name} />
        ))}
      </Flex>

      <CardFooter productId={productId} />
    </VStack>
  );
};

export default ProductInfoLeft;
