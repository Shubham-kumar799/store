//compoents
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { Field } from 'formik';

//types
import { AddProductFormErrorsAndTouched } from '@appTypes/products';

//utils
import { FC } from 'react';

interface Props extends AddProductFormErrorsAndTouched {}

const Name: FC<Props> = ({ errors, touched }) => {
  return (
    <FormControl isInvalid={!!errors.name && touched.name}>
      <Field
        placeholder="Name of the product"
        as={Input}
        id="name"
        name="name"
      />
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.name}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Name;
