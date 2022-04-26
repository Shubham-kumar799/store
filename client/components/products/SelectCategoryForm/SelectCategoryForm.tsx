//compoents
import { VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import SubCategoryCheckbox from './SubCategoryCheckbox';
import Category from './Category';
import { AppSpinner } from '@components/global';

//types
import { SelectCategoryFormValuesType } from '@appTypes/products';
import { FormikProps } from 'formik';
import { FC, RefObject, Dispatch, SetStateAction } from 'react';

//utils
import { selectCategorySchema } from '@utils/productSchema';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@graphql/categories';

interface Props {
  nextStep: () => void;
  formRef: RefObject<FormikProps<SelectCategoryFormValuesType>>;
  setNewProduct: Dispatch<SetStateAction<{}>>;
  newProduct: any;
}

const initialValues = {
  category: 'jwe;ljkwl',
  subCategories: ['fdskjl;fjsk'],
};

const SelectCategoryForm: FC<Props> = ({
  nextStep,
  formRef,
  setNewProduct,
  newProduct,
}) => {
  const { loading, data } = useQuery(GET_CATEGORIES);

  const handleSubmit = async (
    values: SelectCategoryFormValuesType,
    resetForm: any
  ) => {
    // setNewProduct(prevState => ({
    //   ...prevState,
    //   ...values,
    // }));
    setNewProduct({
      ...newProduct,
      ...values,
    });
    console.log('select category values => ', newProduct);
    nextStep();
  };

  if (loading) return <AppSpinner />;
  return (
    <Formik
      innerRef={formRef}
      validationSchema={selectCategorySchema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
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
