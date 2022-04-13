//components
import { Flex, Divider, useDisclosure } from '@chakra-ui/react';
import { AddProductSteps, ProductsHeader } from '@components/products';
import { AppDrawer } from '@components/global';

//types
import { NextPage } from 'next';

const Products: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex direction={'column'} flex={1} justifyContent="center">
      <AppDrawer
        onClose={onClose}
        isOpen={isOpen}
        title="Create New Product"
        size="lg"
        footer={false}
        noPadding={true}
      >
        <AddProductSteps onClose={onClose} />
      </AppDrawer>
      <ProductsHeader onOpen={onOpen} />
      <Divider />
    </Flex>
  );
};

export default Products;
