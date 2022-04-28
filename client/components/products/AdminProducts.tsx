//components
import { AdminProductCard } from './AdminProductCard';
import { Grid, GridItem } from '@chakra-ui/react';

//types
import { FC } from 'react';
import { Product } from '@appTypes/products';

//utils
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@graphql/products';
import { AppSpinner } from '@components/global';

const AdminProducts: FC = () => {
  const { loading, data } = useQuery(GET_PRODUCTS);

  if (loading) return <AppSpinner />;

  return (
    <Grid templateColumns="repeat(3, 1fr)">
      {data?.getProducts.map((product: Product) => (
        <GridItem key={product._id}>
          <AdminProductCard product={product} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default AdminProducts;
