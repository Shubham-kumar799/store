//compopnents
import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';

//icon
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

//types
import { FC } from 'react';

//utils
import { useApi } from '@hooks';
import { useApolloClient } from '@apollo/client';
import { Product } from '@appTypes/products';

interface Props {
  product: Product;
}

const CardButtons: FC<Props> = ({ product }) => {
  const toast = useToast();
  const { cache } = useApolloClient();
  const [__, DELETEAPI] = useApi({
    method: 'Post',
    url: `/product/${product._id}`,
  });

  const deleteProduct = async () => {
    try {
      await DELETEAPI({});
      toast({
        title: `Product ${product.name} deleted successfully`,
        status: 'success',
        position: 'top',
      });
      cache.evict({
        id: cache.identify({
          __typename: 'Product',
          ...product,
        }),
      });
    } catch (error) {
      toast({
        title: `Error deleteing ${product.name}. Try Again`,
        status: 'error',
        position: 'top',
      });
    }
  };
  return (
    <HStack m={2} flex={1} justifyContent={'space-around'}>
      <Tooltip label="Edit or update product">
        <IconButton
          variant={'outline'}
          colorScheme={'brand.primary'}
          aria-label="Cart"
          icon={<BiEdit />}
        />
      </Tooltip>
      <Tooltip label="Delete product">
        <IconButton
          variant={'ghost'}
          colorScheme={'brand.error'}
          aria-label="Cart"
          icon={<MdDelete />}
          onClick={deleteProduct}
        />
      </Tooltip>
    </HStack>
  );
};

export default CardButtons;
