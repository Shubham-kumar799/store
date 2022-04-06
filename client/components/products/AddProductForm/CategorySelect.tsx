//compoents
import { FormControl, Select, FormErrorMessage } from '@chakra-ui/react';

//types
import { Field } from 'formik';
import { AddProductFromErrorsAndTouched } from '@appTypes/products';

//utils
import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@graphql/categories';
import { AppSpinner } from '@components/global';

interface Props extends AddProductFromErrorsAndTouched {}

const CategorySelect: FC<Props> = ({ errors, touched }) => {
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

export default CategorySelect;
