//compoents
import {
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Wrap,
  FormLabel,
} from '@chakra-ui/react';

//types
import { Field } from 'formik';
import {
  AddProductFromErrorsAndTouched,
  AddProductFormValuesType,
} from '@appTypes/products';

//utils
import { useQuery } from '@apollo/client';
import { FC } from 'react';
import { GET_SUB_CATEGORIES_BY_PARENT_ID } from '@graphql/categories';
import { AppSpinner } from '@components/global';

interface Props extends AddProductFromErrorsAndTouched {
  values: AddProductFormValuesType;
}

const SubCategoryCheckbox: FC<Props> = ({ values, errors, touched }) => {
  const { data, loading } = useQuery(GET_SUB_CATEGORIES_BY_PARENT_ID, {
    variables: { parentId: values.category },
  });

  if (loading) return <AppSpinner />;
  return (
    <FormControl isInvalid={!!errors.subCategories && touched.subCategories}>
      {/* <CheckboxGroup
        id="subCategories"
        name="subCategories"
        colorScheme="brand.tertiary"
      > */}
      <FormLabel>Select Subcategories</FormLabel>
      <Wrap>
        {data?.getSubCategoriesByParentId.map((s: any) => (
          <Field
            as={Checkbox}
            id="subCategories"
            name="subCategories"
            value={s._id}
            colorScheme="brand.primary"
          >
            {s.name}
          </Field>
        ))}
      </Wrap>
      {/* </CheckboxGroup> */}
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.subCategories}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SubCategoryCheckbox;
