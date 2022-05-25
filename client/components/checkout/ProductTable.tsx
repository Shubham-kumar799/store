//components
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { CartProduct } from '@appTypes/cart';
import { FC } from 'react';

interface Props {
  products: [
    {
      product: CartProduct;
      count: number;
    }
  ];
}

const ProductTable: FC<Props> = ({ products }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="brand.primary">
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th isNumeric>Quantity</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((p, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td isTruncated={true} maxWidth={'xs'}>
                {p.product.name}
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

export default ProductTable;
