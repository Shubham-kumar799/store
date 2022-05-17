//components
import { Flex, Divider, useDisclosure } from '@chakra-ui/react';
import {
  ProductsHeader,
  AddProductParent,
  AdminProducts,
} from '@components/products';

//types
import { NextPage } from 'next';

const Products: NextPage = () => {
  //FOR ADD PRODUCT DRAWER
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex direction={'column'} justifyContent="center">
      <AddProductParent isOpen={isOpen} onClose={onClose} onOpen={onOpen} />

      <ProductsHeader onOpen={onOpen} />

      <Divider />
      <AdminProducts />
    </Flex>
  );
};

export default Products;
