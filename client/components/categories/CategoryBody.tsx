//components
import { Box } from '@chakra-ui/react';
import Category from './Category';

//types
import { FC } from 'react';

//utils
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@graphql/categories';
import { AppSpinner } from '@components/global';

const ColorScheme = [
  'brand.primary',
  'brand.secondary',
  'brand.tertiary',
  'brand.error',
  'brand.link',
];

const CategoryBody: FC = () => {
  const { loading, data } = useQuery(GET_CATEGORIES);

  if (loading) return <AppSpinner />;

  return (
    <Box>
      {data?.getCategories.map(
        (c: { name: string; slug: string; _id: string }) => (
          <Category
            colorScheme={
              ColorScheme[Math.floor(Math.random() * (ColorScheme.length - 1))]
            }
            key={c._id}
            name={c.name}
            slug={c.slug}
            id={c._id}
          />
        )
      )}
    </Box>
  );
};

export default CategoryBody;
