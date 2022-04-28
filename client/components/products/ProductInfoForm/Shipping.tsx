//compoents
import { Checkbox, FormControl } from '@chakra-ui/react';

//types
import { Field } from 'formik';
import { AddProductFormErrorsAndTouched } from '@appTypes/products';

//utils
import { FC } from 'react';

interface Props {
  isChecked: boolean;
}

const Shipping: FC<Props> = ({ isChecked }) => {
  return (
    <Field
      isChecked={isChecked}
      as={Checkbox}
      name="shipping"
      colorScheme="brand.primary"
    >
      Free Shipping
    </Field>
    // <Checkbox
    //   id="shipping"
    //   name="shipping"
    //   // onChange={formik.handleChange}
    //   // isChecked={formik.values.rememberMe}
    //   colorScheme="purple"
    // >
    //   Free Shipping
    // </Checkbox>
  );
};

export default Shipping;
