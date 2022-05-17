//comopnents
import { IconButton, Circle } from '@chakra-ui/react';

//icon
import { MdShoppingBasket } from 'react-icons/md';

//types
import { FC } from 'react';

//utils
import { useRouter } from 'next/router';
import { useAppSelector, selectCart } from '@store';

const CartButton: FC = () => {
  const router = useRouter();
  const cart = useAppSelector(selectCart);

  return (
    <IconButton
      onClick={() => router.push('/cart/view')}
      css={`
        position: relative !important;
      `}
      py={'2'}
      variant="ghost"
      colorScheme={'brand.tertiary'}
      aria-label={'Notifications'}
      size={'lg'}
      icon={
        <>
          <MdShoppingBasket />
          {cart.length !== 0 && (
            <Circle
              position={'absolute'}
              top={'-2px'}
              right={'-2px'}
              fontSize={'0.8rem'}
              bgColor="brand.secondary.500"
              p={2}
              pt={1}
              pb={1}
              textColor={'white'}
            >
              {cart.length}
            </Circle>
          )}
        </>
      }
    />
  );
};

export default CartButton;
