//components
import { Box, HStack, Badge, Text, Divider, Button } from '@chakra-ui/react';
import OrderTable from './OrderTable';
import { PDFDownloadLink } from '@react-pdf/renderer';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';
import { MyOrder } from '@appTypes/order';

//utils
import { useRef } from 'react';
import Invoice from './Invoice';

interface Props {
  order: MyOrder;
}

const badgeColors = {
  Not_Processed: 'gray',
  Fulfilled: 'brand.tertiary',
  Processing: 'brand.primary',
  Out_For_Delivery: 'yellow',
  Cancelled: 'red',
};

const OrderCard: FC<Props> = ({ order }) => {
  //@ts-ignore
  const downloadRef = useRef(null);
  const PdfDownload = () => {
    return (
      <PDFDownloadLink
        ref={downloadRef}
        document={<Invoice order={order} />}
        fileName="invoice.pdf"
      >
        <Button variant={'link'} colorScheme="brand.primary">
          Download invoice
        </Button>
      </PDFDownloadLink>
    );
  };

  return (
    <Box borderWidth={2} m={4} rounded="xl">
      <HStack m={4} justifyContent={'space-between'}>
        <HStack>
          <Text>Order Id : </Text>
          <Text fontWeight={'bold'}>{order._id}</Text>
        </HStack>
        {/* @ts-ignore */}
        <Badge colorScheme={badgeColors[order.orderStatus]}>
          {order.orderStatus}
        </Badge>
      </HStack>
      <Divider />
      <OrderTable productInfo={order.products} />
      <HStack justifyContent={'space-between'} p={4}>
        <HStack>
          <Text>Amount Paid : </Text>
          <BiRupee />
          <Text fontWeight={'bold'}>{order.paymentIntent.amount / 100}</Text>
        </HStack>
        <PdfDownload />
      </HStack>
    </Box>
  );
};

export default OrderCard;
