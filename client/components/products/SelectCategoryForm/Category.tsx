//compoents
import { FormControl, Select, FormErrorMessage } from '@chakra-ui/react';
import { AppSpinner } from '@components/global';
import { Field } from 'formik';

//types
import { SelectCategoryFormErrorsAndTouched } from '@appTypes/products';
import { FC } from 'react';

//utils
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@graphql/categories';

interface Props extends SelectCategoryFormErrorsAndTouched {}

const Category: FC<Props> = ({ errors, touched }) => {
  const { loading, data } = useQuery(GET_CATEGORIES);

  if (loading) return <AppSpinner />;
  return (
    <FormControl isInvalid={!!errors.category && touched.category}>
      <Field
        as={Select}
        placeholder="Select Category"
        name="category"
        id="cagetory"
      >
        {data?.getCategories.map((c: any) => (
          <option value={c._id} key={c._id} id="category">
            {c.name}
          </option>
        ))}
      </Field>
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.category}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Category;
