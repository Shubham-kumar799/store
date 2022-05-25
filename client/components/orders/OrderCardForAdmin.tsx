//components
import { Order } from '@appTypes/order';
import { Box, HStack, Text, VStack, Select, useToast } from '@chakra-ui/react';

//types
import { ChangeEvent, FC } from 'react';
import OrderTable from './OrderTable';

//utils
import { useState } from 'react';
import { useApi } from '@hooks';

interface Props {
  order: Order;
}

const selectOptions = [
  'Not_Processed',
  'Fulfilled',
  'Processing',
  'Out_For_Delivery',
  'Cancelled',
];

const OrderCardForAdmin: FC<Props> = ({ order }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [_, API] = useApi({
    method: 'put',
    url: `/orders/${order._id}`,
  });
  const toast = useToast();
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      setIsLoading(true);
      await API({
        body: {
          orderStatus: e.target.value,
        },
      });
      //@ts-ignore
      setOrderStatus(e.target.value);
      toast({
        status: 'success',
        title: 'Order status changed',
        position: 'top-left',
      });
    } catch (error) {
      console.log('error in changing status of order', error);
      toast({
        status: 'error',
        title: 'Error changing status',
        position: 'top-left',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack alignItems={'flex-start'} m={2} p={2} borderWidth={2} rounded="xl">
      <HStack spacing={4}>
        <Text fontWeight={'bold'}>OrderId :</Text>
        <Text fontWeight={'bold'}>{order._id}</Text>
      </HStack>
      <HStack>
        <Text fontWeight={'bold'}>Ordered By :</Text>
        <Text fontWeight={'bold'}>{order.orderedBy}</Text>
      </HStack>

      <OrderTable productInfo={order.products} orderStatus={orderStatus} />

      <Select
        isDisabled={isLoading}
        onChange={e => handleChange(e)}
        placeholder={orderStatus}
      >
        {selectOptions.map(option => {
          if (option === orderStatus) return null;
          return <option value={option}>{option}</option>;
        })}
      </Select>
    </VStack>
  );
};

export default OrderCardForAdmin;
