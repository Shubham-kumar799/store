//components
import { AppModal } from '@components/global';
import UpdateCategoryForm from './UpdateCategoryForm';

//types
import { FC, useRef } from 'react';
import { FormikProps } from 'formik';

//utils
import { useState } from 'react';
import { UpdateCategoryFormValuesType } from '@appTypes/categories';

interface Props {
  id: string;
  name: string;
  slug: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UpdateCategoryModal: FC<Props> = ({
  id,
  name,
  slug,
  onOpen,
  onClose,
  isOpen,
}) => {
  const formRef = useRef<FormikProps<UpdateCategoryFormValuesType>>(null);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppModal
      title={`Update UpdateCategoryModal ${name}`}
      positiveButtonFunction={() => formRef.current?.submitForm()}
      positiveButtonLoading={isLoading}
      positiveButtonTitle="Update category"
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={onClose}
    >
      <UpdateCategoryForm
        closeModal={onClose}
        setPositiveButtonLoading={setIsLoading}
        formRef={formRef}
        categorySlug={slug}
        categoryName={name}
        categoryId={id}
      />
    </AppModal>
  );
};

export default UpdateCategoryModal;
