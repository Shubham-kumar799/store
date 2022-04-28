//compoents
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Wrap,
  FormLabel,
} from '@chakra-ui/react';

//types
import { Field } from 'formik';
import {
  SelectCategoryFormErrorsAndTouched,
  SelectCategoryFormValuesType,
} from '@appTypes/products';

//utils
import { useQuery } from '@apollo/client';
import { FC } from 'react';
import { GET_SUB_CATEGORIES_BY_PARENT_ID } from '@graphql/categories';
import { AppSpinner } from '@components/global';

interface Props extends SelectCategoryFormErrorsAndTouched {
  values: SelectCategoryFormValuesType;
}

const SubCategoryCheckbox: FC<Props> = ({ values, errors, touched }) => {
  const { data, loading } = useQuery(GET_SUB_CATEGORIES_BY_PARENT_ID, {
    variables: { parentId: values.category },
  });

  if (!values.category) return null;
  if (loading) return <AppSpinner />;
  return (
    <FormControl isInvalid={!!errors.subCategories && touched.subCategories}>
      <FormLabel>Select Subcategories</FormLabel>
      <Wrap>
        {data?.getSubCategoriesByParentId.map((s: any) => (
          <Field
            as={Checkbox}
            id="subCategories"
            name="subCategories"
            value={s._id}
            colorScheme="brand.primary"
            key={s._id}
            isChecked={values.subCategories.includes(s._id)}
          >
            {s.name}
          </Field>
        ))}
      </Wrap>
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.subCategories}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SubCategoryCheckbox;
