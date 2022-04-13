//compoents
import { Button, VStack, HStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import SubCategoryCheckbox from './SubCategoryCheckbox';
import Category from './Category';
import { AppSpinner } from '@components/global';

//types
import { SelectCategoryFormValuesType } from '@appTypes/products';
import { FC } from 'react';

//utils
import { selectCategorySchema } from '@utils/productSchema';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@graphql/categories';

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const initialValues = {
  category: 'jwe;ljkwl',
  subCategories: ['fdskjl;fjsk'],
};

const SelectCategoryForm: FC<Props> = ({ nextStep, prevStep }) => {
  const { loading, data } = useQuery(GET_CATEGORIES);

  const handleSubmit = async (
    values: SelectCategoryFormValuesType,
    resetForm: any
  ) => {
    console.log('product info values => ', values);
    nextStep();
  };

  if (loading) return <AppSpinner />;
  return (
    <Formik
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
            <HStack w="full" justifyContent={'flex-end'}>
              <Button onClick={prevStep} variant={'ghost'}>
                Previous
              </Button>
              <Button
                colorScheme={'brand.tertiary'}
                alignSelf={'flex-end'}
                type="submit"
              >
                Next
              </Button>
            </HStack>
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default SelectCategoryForm;
