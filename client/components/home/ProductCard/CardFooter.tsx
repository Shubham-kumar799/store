//compopnents
import { HStack, Button, useToast } from '@chakra-ui/react';

//types
import { FC } from 'react';

//utils
import { useAppDispatch, ADD_TO_CART } from '@store';

interface Props {
  productId: string;
}

const CardFooter: FC<Props> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleAddToCart = () => {
    dispatch(ADD_TO_CART(productId));
    toast({
      status: 'success',
      position: 'bottom-right',
    });
  };
  return (
    <HStack m={2} flex={1} justifyContent={'space-evenly'}>
      <Button variant={'solid'} colorScheme={'brand.primary'}>
        Buy Now
      </Button>

      <Button
        variant={'ghost'}
        onClick={handleAddToCart}
        colorScheme={'brand.tertiary'}
      >
        Add to cart
      </Button>
    </HStack>
  );
};

export default CardFooter;
