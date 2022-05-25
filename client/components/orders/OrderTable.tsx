//components
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tooltip,
} from '@chakra-ui/react';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';

interface Props {
  productInfo: [
    {
      product: {
        _id: string;
        price: number;
      };
      count: number;
    }
  ];
  orderStatus: string;
}

const badgeColors = {
  Not_Processed: 'gray',
  Fulfilled: 'brand.tertiary',
  Processing: 'brand.primary',
  Out_For_Delivery: 'yellow',
  Cancelled: 'red',
};

const OrderTable: FC<Props> = ({ productInfo, orderStatus }) => {
  return (
    <TableContainer>
      {/* @ts-ignore */}
      <Table variant="striped" colorScheme={badgeColors[orderStatus]}>
        <Thead>
          <Tr>
            <Th>ProductId</Th>
            <Th>Price</Th>
            <Th isNumeric>Quantity</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productInfo.map((p, index) => (
            <Tr>
              <Td>{p.product._id}</Td>
              <Td
                isNumeric
                alignItems={'center'}
                display={'flex'}
                flexDirection={'row'}
              >
                <BiRupee />
                {p.product.price}
              </Td>
              <Td isNumeric>{p.count}</Td>
              <Td
                isNumeric
                alignItems={'center'}
                display={'flex'}
                flexDirection={'row'}
              >
                <BiRupee />
                {p.product.price * p.count}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
