//components
import { ProductCard } from './ProductCard';
import { Box, Grid, GridItem, Center } from '@chakra-ui/react';
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
      <Grid templateColumns="repeat(4, 1fr)">
        {data?.getProducts.map((product: Product) => (
          <GridItem key={product._id}>
            <ProductCard product={product} />
          </GridItem>
        ))}
      </Grid>
      <Slider />
    </Box>
  );
};

export default HomeBody;
