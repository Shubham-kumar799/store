//components
import { Flex, Divider, useDisclosure } from '@chakra-ui/react';
import { Header, AddCategoryForm, CategoryBody } from '@components/categories';
import { AppDrawer } from '@components/global';

//types
import { NextPage } from 'next';
import { FormikProps } from 'formik';
import { AddCategoryFormValuesType } from '@appTypes/categories';

//utils
import { useRef, useState } from 'react';

const Categories: NextPage = () => {
  const [positiveButtonLoading, setPositiveButtonLoading] = useState(false);
  const formRef = useRef<FormikProps<AddCategoryFormValuesType>>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction={'column'} flex={1} justifyContent="center">
      <AppDrawer
        positiveButtonLoading={positiveButtonLoading}
        positiveButtonTitle="Add Category"
        positiveButtonFunction={() => formRef.current?.submitForm()}
        title={'Create new category'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AddCategoryForm
          formRef={formRef}
          setPositiveButtonLoading={setPositiveButtonLoading}
        />
      </AppDrawer>
      <Header onOpen={onOpen} />
      <Divider />

      <CategoryBody />
    </Flex>
  );
};

export default Categories;
