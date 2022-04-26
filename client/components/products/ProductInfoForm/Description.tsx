//compoents
import { FormControl, FormErrorMessage, Textarea } from '@chakra-ui/react';

//types
import { Field } from 'formik';
import { AddProductFormErrorsAndTouched } from '@appTypes/products';

//utils
import { FC } from 'react';

interface Props extends AddProductFormErrorsAndTouched {}

const Description: FC<Props> = ({ errors, touched }) => {
  return (
    <FormControl isInvalid={!!errors.description && touched.description}>
      <Field
        placeholder="Description of the product"
        as={Textarea}
        id="description"
        name="description"
      />
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.description}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Description;
