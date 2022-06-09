//components
import { ProductView } from '@components/product';
import { BaseLayout } from '@components/global';

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
  const { data, loading, refetch } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug: slug || path },
  });

  if (loading) return <AppSpinner />;

  return (
    <BaseLayout nostyles>
      <Box>
        <ProductView
          refetchProduct={refetch}
          product={data?.getProductBySlug}
        />
      </Box>
    </BaseLayout>
  );
};

export default SingleProductView;
