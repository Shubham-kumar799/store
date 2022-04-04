//components
import { Box, Center } from '@chakra-ui/react';
import SubCategory from './SubCategory';
import { AppSpinner, NoData } from '@components/global';

//types
import { FC } from 'react';

//utils
import { useQuery } from '@apollo/client';
import { GET_SUB_CATEGORIES_BY_PARENT_ID } from '@graphql/categories';

interface Props {
  colorScheme: string;
  parentId: string;
  parentName: string;
}

const SubCategoryBody: FC<Props> = ({ parentName, colorScheme, parentId }) => {
  const { loading, data } = useQuery(GET_SUB_CATEGORIES_BY_PARENT_ID, {
    variables: { parentId },
  });

  if (loading) return <AppSpinner />;

  if (data.getSubCategoriesByParentId.length == 0)
    return (
      <Center h={'full'}>
        <NoData text={`Category ${parentName}  has no sub-categories`} />
      </Center>
    );

  return (
    <Box>
      {data?.getSubCategoriesByParentId.map(
        (c: { name: string; slug: string; _id: string; parent: string }) => (
          <SubCategory
            colorScheme={colorScheme}
            key={c._id}
            name={c.name}
            parentId={c.parent}
            slug={c.slug}
            id={c._id}
          />
        )
      )}
    </Box>
  );
};

export default SubCategoryBody;
