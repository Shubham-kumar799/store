//components
import { ProductView } from '@components/product';

//types
import { NextPage } from 'next';

//utils
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_SLUG } from '@graphql/products';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { AppSpinner } from '@components/global';

const SingleProductView: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  let path;
  useEffect(() => {
    path = window && window.location.href.split('/')[4];
  }, []);
  const { data, loading } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug: slug || path },
  });

  if (loading) return <AppSpinner />;

  return (
    <Box>
      <ProductView product={data?.getProductBySlug} />
    </Box>
  );
};

export default SingleProductView;
