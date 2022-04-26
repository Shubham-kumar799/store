//components
import { Flex, Divider, useDisclosure } from '@chakra-ui/react';
import { ProductsHeader, AddProductParent } from '@components/products';

//types
import { NextPage } from 'next';

const Products: NextPage = () => {
  //FOR ADD PRODUCT DRAWER
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex direction={'column'} flex={1} justifyContent="center">
      <AddProductParent isOpen={isOpen} onClose={onClose} onOpen={onOpen} />

      <ProductsHeader onOpen={onOpen} />
      <Divider />
    </Flex>
  );
};

export default Products;
