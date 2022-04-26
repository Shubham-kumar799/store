//compoents
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { AddProductFormErrorsAndTouched } from '@appTypes/products';

//types
import { Field } from 'formik';

//utils
import { FC } from 'react';

interface Props extends AddProductFormErrorsAndTouched {}

const Brand: FC<Props> = ({ errors, touched }) => {
  return (
    <FormControl isInvalid={!!errors.brand && touched.brand}>
      <Field placeholder="Brand" as={Input} id="brand" name="brand" />
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.brand}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Brand;
