//compoents
import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Input,
} from '@chakra-ui/react';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { Field } from 'formik';
import { AddProductFromErrorsAndTouched } from '@appTypes/products';

//utils
import { FC } from 'react';

interface Props extends AddProductFromErrorsAndTouched {}

const Price: FC<Props> = ({ errors, touched }) => {
  return (
    <FormControl isInvalid={!!errors.price && touched.price}>
      <InputGroup>
        <InputLeftAddon pointerEvents="none" children={<BiRupee />} />
        <Field
          type="number"
          placeholder="Price"
          id="price"
          name="price"
          as={Input}
        />
        <InputRightAddon pointerEvents={'none'} children="Price" />
      </InputGroup>
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.price}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Price;
