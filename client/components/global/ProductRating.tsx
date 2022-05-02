//components
import Rating from 'react-rating';
import { HStack, Text, useToast } from '@chakra-ui/react';

//icons
import { StarIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';
import { ProductRatingType } from '@appTypes/products';

//utils
import { useState, useEffect } from 'react';
import { useApi } from '@hooks';

interface Props {
  rating: ProductRatingType[];
  readOnly?: boolean;
  productId: string;
  refetchProduct?: any;
}

const ProductRating: FC<Props> = ({
  refetchProduct,
  productId,
  rating,
  readOnly = false,
}) => {
  const toast = useToast();
  const [productRating, setProductRating] = useState(0);

  const [_, API] = useApi({ method: 'Put', url: `/product/rate/${productId}` });

  useEffect(() => {
    if (rating.length !== 0) {
      let total: number[] = [];
      rating.map(r => total.push(r.star));
      let r = total.reduce((p, n) => p + n, 0);
      setProductRating(r / total.length);
    }
  }, []);
  const handleChange = async (star: number) => {
    try {
      await API({ body: { userRating: star } });
      await refetchProduct();
      toast({
        status: 'success',
        title: 'Thanks for leaving a review',
        position: 'top-right',
      });
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error posting rating. Please try again',
        position: 'bottom-right',
      });
    }
  };

  return (
    <HStack>
      <Rating
        readonly={readOnly}
        onChange={handleChange}
        initialRating={productRating}
        emptySymbol={<StarIcon color="gray.400" w={5} h={5} m={1} />}
        fullSymbol={<StarIcon w={5} h={5} m={1} color={'brand.primary.600'} />}
        fractions={3}
      />
      {rating.length === 0 ? (
        <Text>No Reviews Yet</Text>
      ) : (
        <Text>{`${rating.length} reviews`}</Text>
      )}
    </HStack>
  );
};

export default ProductRating;
