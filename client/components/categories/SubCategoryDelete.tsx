//components
import { MenuItem, useToast } from '@chakra-ui/react';

//icons
import { DeleteIcon } from '@chakra-ui/icons';

//utils
import { useApolloClient } from '@apollo/client';
import { useApi } from '@hooks';
import slugify from 'slugify';

//types
import { Dispatch, FC } from 'react';

interface Props {
  setIsLoading: Dispatch<boolean>;
  slug: string;
  name: string;
  id: string;
  parentId: string;
}

const SubCategoryDelete: FC<Props> = ({
  setIsLoading,
  slug,
  name,
  id,
  parentId,
}) => {
  const { cache } = useApolloClient();
  const toast = useToast();
  const [_, API] = useApi({ url: `/subcategory/${slug}`, method: 'Post' });

  const deleteSubCategory = async () => {
    try {
      setIsLoading(true);
      await API({});
      cache.evict({
        id: cache.identify({
          __typename: 'SubCategory',
          // @ts-ignore
          _id: id,
          name: name,
          parent: parentId,
          slug: slugify(name).toLowerCase(),
        }),
      });
    } catch (error) {
      console.log('Error deleting sub category', error);
      toast({
        status: 'error',
        title: `Error deleting sub-category ${name} . Try Again`,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MenuItem onClick={deleteSubCategory} icon={<DeleteIcon />}>
      Delete
    </MenuItem>
  );
};

export default SubCategoryDelete;
