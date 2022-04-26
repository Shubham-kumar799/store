//compoents
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

//types
import { Field } from 'formik';
import { AddProductFormErrorsAndTouched } from '@appTypes/products';

//utils
import { FC } from 'react';

interface Props extends AddProductFormErrorsAndTouched {}

const Color: FC<Props> = ({ errors, touched }) => {
  return (
    <FormControl isInvalid={!!errors.color && touched.color}>
      <Field placeholder="Color" as={Input} id="color" name="color" />
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.color}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Color;
