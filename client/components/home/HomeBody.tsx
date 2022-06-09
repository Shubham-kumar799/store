//components
import { ProductCard } from './ProductCard';
import { Box, Center, Flex } from '@chakra-ui/react';
import Slider from './Slider';

//types
import { FC } from 'react';

//utils
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@graphql/products';
import { Product } from '@appTypes/products';
import { AppSpinner } from '@components/global';

const HomeBody: FC = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);

  if (loading)
    return (
      <Center>
        <AppSpinner />
      </Center>
    );

  return (
    <Box>
      <Flex flexWrap={'wrap'} justifyContent="space-evenly">
        {data?.getProducts.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Flex>
      <Slider />
    </Box>
  );
};

export default HomeBody;
