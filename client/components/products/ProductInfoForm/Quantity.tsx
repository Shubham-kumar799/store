//compoents
import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightAddon,
  Input,
} from '@chakra-ui/react';

//types
import { Field } from 'formik';
import { AddProductFromErrorsAndTouched } from '@appTypes/products';

//utils
import { FC } from 'react';

interface Props extends AddProductFromErrorsAndTouched {}

const Quantity: FC<Props> = ({ errors, touched }) => {
  return (
    <FormControl isInvalid={!!errors.quantity && touched.quantity}>
      <InputGroup>
        <Field
          placeholder="Quantity"
          as={Input}
          id="quantity"
          name="quantity"
          type="number"
        />
        <InputRightAddon pointerEvents={'none'} children="Quantity" />
      </InputGroup>
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.quantity}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Quantity;
