//components
import { HStack, Text, IconButton, Flex, useToast } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

//utils
import { useApi } from '@hooks';
import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { GET_CART_BY_USER_ID } from '@graphql/cart';
import { CartProduct } from '@appTypes/cart';

interface Props {
  count: number;
  productId: string;
  productPrice: number;
  cartTotal: number;
  cartProducts: [
    {
      count: number;
      product: CartProduct;
    }
  ];
  cartId: string;
}

const QuantityButtons: FC<Props> = ({
  cartProducts,
  cartTotal,
  count,
  productId,
  productPrice,
  cartId,
}) => {
  const [_, incrementAPI] = useApi({
    method: 'put',
    url: `/cart/increment/${productId}`,
  });
  const [__, decrementAPI] = useApi({
    method: 'put',
    url: `/cart/decrement/${productId}`,
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [productCount, setProductCount] = useState(count);
  const { cache } = useApolloClient();

  const handleIncrement = async () => {
    try {
      setIsLoading(true);
      console.log('inside increment');
      await incrementAPI({});

      cache.writeQuery({
        query: GET_CART_BY_USER_ID,
        data: {
          getCartByUserId: {
            __typename: 'Cart',
            // @ts-ignore
            _id: cartId,
            cartTotal: cartTotal + productPrice,
            products: cartProducts,
          },
        },
      });
      setProductCount(productCount + 1);
    } catch (error) {
      console.log('error in increment cart product', error);
      toast({
        status: 'error',
        title: 'Some error occured. Try Again',
        position: 'bottom-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async () => {
    try {
      setIsLoading(true);
      if (productCount == 1) return;

      await decrementAPI({});
      cache.writeQuery({
        query: GET_CART_BY_USER_ID,
        data: {
          getCartByUserId: {
            __typename: 'Cart',
            // @ts-ignore
            _id: cartId,
            cartTotal: cartTotal - productPrice,
            products: cartProducts,
          },
        },
      });
      setProductCount(productCount - 1);
    } catch (error) {
      console.log('error in decrement cart product', error);
      toast({
        status: 'error',
        title: 'Some error occured. Try Again',
        position: 'bottom-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex justifyContent="center">
      <HStack justifyContent={'space-between'} w="40">
        <IconButton
          isDisabled={isLoading}
          colorScheme={'brand.secondary'}
          variant="outline"
          aria-label="decrement"
          onClick={handleDecrement}
          icon={<MinusIcon />}
        />
        <Text>{productCount}</Text>
        <IconButton
          isDisabled={isLoading}
          colorScheme={'brand.tertiary'}
          variant="outline"
          aria-label="increment"
          onClick={handleIncrement}
          icon={<AddIcon />}
        />
      </HStack>
    </Flex>
  );
};

export default QuantityButtons;
