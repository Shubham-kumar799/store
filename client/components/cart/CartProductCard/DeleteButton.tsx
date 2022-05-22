//components
import { IconButton, useToast } from '@chakra-ui/react';

//icons
import { DeleteIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';
import { CartProduct } from '@appTypes/cart';

//utils
import { useState } from 'react';
import { useApi } from '@hooks';
import { DECREMENT_USER_CART_COUNT, useAppDispatch } from '@store';
import { useApolloClient } from '@apollo/client';
import { GET_CART_BY_USER_ID } from '@graphql/cart';

interface Props {
  productId: string;
  cartId: string;
  productPrice: number;
  productQuantity: number;
  cartTotal: number;
  cartProducts: [
    {
      count: number;
      product: CartProduct;
    }
  ];
}

const DeleteButton: FC<Props> = ({
  cartTotal,
  cartId,
  productId,
  productPrice,
  productQuantity,
  cartProducts,
}) => {
  const [_, API] = useApi({ method: 'put', url: `/cart/remove/${productId}` });
  const [isLoading, setIsLoading] = useState(false);
  const { cache } = useApolloClient();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await API({});
      const updatedProducts = cartProducts.filter(
        p => p.product._id !== productId
      );
      cache.writeQuery({
        query: GET_CART_BY_USER_ID,
        data: {
          getCartByUserId: {
            __typename: 'Cart',
            // @ts-ignore
            _id: cartId,
            cartTotal: cartTotal - productPrice * productQuantity,
            products: updatedProducts,
          },
        },
      });
      dispatch(DECREMENT_USER_CART_COUNT());
      toast({
        status: 'success',
        position: 'bottom-right',
        title: 'Item removed from cart',
      });
    } catch (error) {
      console.log('error in remove item from cart', error);
      toast({
        status: 'error',
        position: 'bottom-right',
        title: 'Some Error Occured. Try Again',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <IconButton
      onClick={handleClick}
      top={5}
      right={5}
      isLoading={isLoading}
      aria-label="delete"
      position="absolute"
      icon={<DeleteIcon />}
      colorScheme="brand.secondary"
      variant="ghost"
    />
  );
};

export default DeleteButton;
