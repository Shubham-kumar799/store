//compopnents
import { HStack, Button, useToast, Tooltip } from '@chakra-ui/react';

//types
import { FC } from 'react';

//utils
import {
  useAppDispatch,
  ADD_TO_CART,
  INCREMENT_USER_CART_COUNT,
  useAppSelector,
  selectUser,
} from '@store';
import { useApi } from '@hooks';

interface Props {
  productId: string;
}

const CardFooter: FC<Props> = ({ productId }) => {
  const [_, cartAPI] = useApi({ method: 'put', url: `/cart/add/${productId}` });
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleAddToCart = async () => {
    try {
      const data = await cartAPI({});
      //@ts-ignore
      if (data.payload === 'Item added to cart') {
        dispatch(ADD_TO_CART(productId));
        dispatch(INCREMENT_USER_CART_COUNT());
      }

      toast({
        status: 'success',
        position: 'bottom-right',
        //@ts-ignore
        title: data.payload,
      });
    } catch (error) {
      console.log('Error adding product to cart', error);
      toast({
        status: 'error',
        position: 'bottom-right',
        title: 'Some error occured. Try again',
      });
    }
  };
  return (
    <HStack m={2} flex={1} justifyContent={'space-evenly'}>
      <Button variant={'solid'} colorScheme={'brand.primary'}>
        Buy Now
      </Button>

      {user._id ? (
        <Button
          variant={'ghost'}
          onClick={handleAddToCart}
          colorScheme={'brand.tertiary'}
        >
          Add to cart
        </Button>
      ) : (
        <Tooltip
          // hasArrow
          shouldWrapChildren
          mt="1"
          label="Login to add product to cart"
        >
          <Button variant={'ghost'} colorScheme={'brand.tertiary'} isDisabled>
            Add to cart
          </Button>
        </Tooltip>
      )}
    </HStack>
  );
};

export default CardFooter;
