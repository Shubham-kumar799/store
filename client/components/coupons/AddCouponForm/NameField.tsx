//components
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { FormikErrors, Field, FormikTouched } from 'formik';

//types
import { FC } from 'react';
import { AddCouponFormValuesType } from '@appTypes/coupon';

interface Props {
  errors: FormikErrors<AddCouponFormValuesType>;
  touched: FormikTouched<AddCouponFormValuesType>;
}

const NameField: FC<Props> = ({ errors, touched }) => {
  return (
    <FormControl isInvalid={!!errors.name && touched.name}>
      <FormLabel>Name</FormLabel>
      <Field as={Input} id="name" name="name" />
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.name}
      </FormErrorMessage>
    </FormControl>
  );
};

export default NameField;
