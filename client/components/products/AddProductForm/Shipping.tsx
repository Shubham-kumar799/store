//compoents
import { Checkbox } from '@chakra-ui/react';

//types
import { Field } from 'formik';

//utils
import { FC } from 'react';

const Shipping: FC = () => {
  return (
    <Field
      as={Checkbox}
      id="shipping"
      name="shipping"
      colorScheme="brand.primary"
    >
      Free Shipping
    </Field>
  );
};

export default Shipping;
