//components
import { Flex, Divider, useDisclosure } from '@chakra-ui/react';
import { AddProductForm, ProductsHeader } from '@components/products';
import { AppDrawer } from '@components/global';

//types
import { NextPage } from 'next';

//utils
import { useState, useRef } from 'react';
import { FormikProps } from 'formik';
import {
  AddProductFormValuesType,
  AddProductImageFormValuesType,
} from '@appTypes/products';

const Products: NextPage = () => {
  const formRef = useRef<FormikProps<AddProductFormValuesType>>(null);
  const uploadImageFormRef =
    useRef<FormikProps<AddProductImageFormValuesType>>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isPositiveButtonLoading, setIsPositiveButtonLoading] = useState(false);

  const positiveButtonFunction = async () => {
    formRef.current?.submitForm();
    uploadImageFormRef.current?.submitForm();
  };
  return (
    <Flex direction={'column'} flex={1} justifyContent="center">
      <AppDrawer
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        positiveButtonFunction={() => positiveButtonFunction()}
        positiveButtonLoading={isPositiveButtonLoading}
        positiveButtonTitle={'Add Product'}
        title="Create New Product"
        size="lg"
      >
        <AddProductForm
          uploadImageFormRef={uploadImageFormRef}
          formRef={formRef}
          setIsPositiveButtonLoading={setIsPositiveButtonLoading}
        />
      </AppDrawer>
      <ProductsHeader onOpen={onOpen} />
      <Divider />
    </Flex>
  );
};

export default Products;
