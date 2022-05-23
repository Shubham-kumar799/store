//components
import { Box } from '@chakra-ui/react';
import OrderAddress from './OrderAddress';
import ApplyCoupon from './ApplyCoupon';

//types
import { FC } from 'react';

const OrderInfo: FC = () => {
  return (
    <Box>
      <OrderAddress />
      <ApplyCoupon />
    </Box>
  );
};

export default OrderInfo;
