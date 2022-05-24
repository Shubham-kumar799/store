//components
import { Tag, TagLabel, IconButton, toast, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

//types
import { Coupon } from '@appTypes/coupon';
import { FC } from 'react';
import { useApolloClient } from '@apollo/client';
import { useApi } from '@hooks';

interface Props {
  coupon: Coupon;
}

const SingleCoupon: FC<Props> = ({ coupon }) => {
  const { cache } = useApolloClient();
  const [_, API] = useApi({ method: 'delete', url: `/coupon/${coupon._id}` });
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await API({});
      cache.evict({
        id: cache.identify({
          __typename: 'Coupon',

          ...coupon,
        }),
      });
    } catch (error) {
      console.log('error deleteing coupon', error);
      toast({
        status: 'error',
        title: 'Error deleting coupon.Try again',
      });
    }
  };

  return (
    <Tag m={2} p={2} key={coupon._id}>
      <Tag mr={2}>
        <TagLabel>{coupon.discount}</TagLabel>
      </Tag>
      <TagLabel>{coupon.name}</TagLabel>
      <IconButton
        onClick={handleDelete}
        colorScheme={'brand.secondary'}
        variant={'link'}
        aria-label="delete"
        icon={<DeleteIcon />}
      />
    </Tag>
  );
};

export default SingleCoupon;
