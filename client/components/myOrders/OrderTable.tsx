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
import { CartProduct } from '@appTypes/cart';

interface Props {
  productInfo: [
    {
      product: CartProduct;
      count: number;
    }
  ];
}

const OrderTable: FC<Props> = ({ productInfo }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="brand.secondary">
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th isNumeric>Quantity</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productInfo.map((p, index) => (
            <Tr>
              <Td>{index + 1}</Td>
              <Td
                cursor={'pointer'}
                isTruncated={true}
                maxWidth={'56'}
                minWidth={'56'}
                _hover={{
                  textDecorationLine: 'underline',
                }}
              >
                <Tooltip
                  placement="bottom-start"
                  hasArrow
                  label="go to product"
                >
                  {p.product.name}
                </Tooltip>
              </Td>
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
