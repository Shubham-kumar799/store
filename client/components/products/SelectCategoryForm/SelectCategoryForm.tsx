//compoents
import { VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import SubCategoryCheckbox from './SubCategoryCheckbox';
import Category from './Category';

//types
import { SelectCategoryFormValuesType } from '@appTypes/products';
import { FormikProps } from 'formik';
import { FC, RefObject, Dispatch, SetStateAction } from 'react';

//utils
import { selectCategorySchema } from '@utils/productSchema';

interface Props {
  nextStep: () => void;
  formRef: RefObject<FormikProps<SelectCategoryFormValuesType>>;
  setNewProduct: Dispatch<SetStateAction<{}>>;
  newProduct: any;
}

const SelectCategoryForm: FC<Props> = ({
  nextStep,
  formRef,
  setNewProduct,
  newProduct,
}) => {
  const initialValues = {
    category: newProduct.category || '',
    subCategories: newProduct.subCategories || [],
  };
  const handleSubmit = async (values: SelectCategoryFormValuesType) => {
    setNewProduct({
      ...newProduct,
      ...values,
    });
    nextStep();
  };

  return (
    <Formik
      innerRef={formRef}
      validationSchema={selectCategorySchema}
      initialValues={initialValues}
      onSubmit={values => handleSubmit(values)}
    >
      {({ values, handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <Category errors={errors} touched={touched} />
            {values.category && (
              <SubCategoryCheckbox
                errors={errors}
                touched={touched}
                values={values}
              />
            )}
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default SelectCategoryForm;
