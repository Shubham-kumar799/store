//components
import {
  Table,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Icon,
  TableCaption,
} from '@chakra-ui/react';
import { CategoryBadge } from '@components/global';

//icons
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

//types
import { Category } from '@appTypes/categories';
import { FC } from 'react';

interface Props {
  category: Category;
  shipping: boolean;
  color: string;
  brand: string;
  quantity: number;
  sold: number;
}

const ProductInfoRight: FC<Props> = ({
  category,
  shipping,
  color,
  brand,
  quantity,
  sold,
}) => {
  return (
    <TableContainer>
      <Table variant={'unstyled'} size={'lg'}>
        <TableCaption mt={0} placement="top">
          Product Specs
        </TableCaption>
        <Tbody>
          <Tr>
            <Th>Category</Th>
            <Th>
              <CategoryBadge name={category.name} />
            </Th>
          </Tr>
          <Tr>
            <Th>Color</Th>
            <Th>{color}</Th>
          </Tr>
          <Tr>
            <Th>Brand</Th>
            <Th>{brand}</Th>
          </Tr>
          <Tr>
            <Th>Available</Th>
            <Th>
              {quantity !== 0 ? (
                <Icon as={AiFillCheckCircle} w={4} h={4} color="green" />
              ) : (
                <Icon as={AiFillCloseCircle} w={4} h={4} color="red" />
              )}
            </Th>
          </Tr>
          <Tr>
            <Th>Free Shipping</Th>
            <Th>
              {shipping ? (
                <Icon as={AiFillCheckCircle} w={4} h={4} color="green" />
              ) : (
                <Icon as={AiFillCloseCircle} w={4} h={4} color="red" />
              )}
            </Th>
          </Tr>

          <Tr>
            <Th>Sold</Th>
            <Th>{sold}</Th>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductInfoRight;
