//components
import { AppDrawer } from '@components/global';
import SubCategoryBody from './SubCategoryBody';

//types
import { FC } from 'react';
import AddSubCategoryForm from './AddSubCategoryForm';
import { FormikProps } from 'formik';
import { AddCategoryFormValuesType } from '@appTypes/categories';

//utils
import { useState, useRef } from 'react';
import { Divider } from '@chakra-ui/react';

interface Props {
  parentId: string;
  parentName: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  colorScheme: string;
}

const SubCategoryDrawer: FC<Props> = ({
  parentId,
  parentName,
  colorScheme,
  isOpen,
  onClose,
  onOpen,
}) => {
  const formRef = useRef<FormikProps<AddCategoryFormValuesType>>(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AppDrawer
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      positiveButtonFunction={() => formRef.current?.submitForm()}
      positiveButtonLoading={isLoading}
      positiveButtonTitle={'Create New SubCategory'}
      size={'lg'}
      title={`SubCategories for ${parentName}`}
      negativeButtonColorScheme={'brand.tertiary'}
      negativeButtonTitle="Done"
    >
      <AddSubCategoryForm
        parentId={parentId}
        setPositiveButtonLoading={setIsLoading}
        formRef={formRef}
      />
      <Divider mt={4} mb={4} />
      <SubCategoryBody
        parentName={parentName}
        parentId={parentId}
        colorScheme={colorScheme}
      />
    </AppDrawer>
  );
};

export default SubCategoryDrawer;
