//components
import { MenuItem, useToast } from '@chakra-ui/react';

//icons
import { DeleteIcon } from '@chakra-ui/icons';

//utils
import { useApolloClient } from '@apollo/client';
import { useApi } from '@hooks';

//types
import { Dispatch, FC } from 'react';

interface Props {
  setIsLoading: Dispatch<boolean>;
  slug: string;
  name: string;
  id: string;
}

const CategoryDelete: FC<Props> = ({ setIsLoading, slug, name, id }) => {
  const { cache } = useApolloClient();
  const toast = useToast();
  const [_, API] = useApi({ url: `/category/${slug}`, method: 'Post' });

  const deleteCategory = async () => {
    try {
      setIsLoading(true);
      const data = await API({});
      cache.evict({
        id: cache.identify({
          __typename: 'Category',
          slug,
          name,
          _id: id,
        }),
      });
      // @ts-ignore
      if (data.success) {
        toast({
          status: 'success',
          title: `Deleted category ${name}`,
          position: 'top',
        });
      }
    } catch (error) {
      console.log('Error deleting category', error);
      toast({
        status: 'error',
        title: `Error deleting ${name} . Try Again`,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MenuItem onClick={deleteCategory} icon={<DeleteIcon />}>
      Delete
    </MenuItem>
  );
};

export default CategoryDelete;
