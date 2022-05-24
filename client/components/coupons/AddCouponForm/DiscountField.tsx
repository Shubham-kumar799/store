//components
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { FormikErrors, Field, FormikTouched } from 'formik';

//types
import { FC } from 'react';
import { AddCouponFormValuesType } from '@appTypes/coupon';

interface Props {
  errors: FormikErrors<AddCouponFormValuesType>;
  touched: FormikTouched<AddCouponFormValuesType>;
}

const DiscountField: FC<Props> = ({ errors, touched }) => {
  return (
    <FormControl isInvalid={!!errors.discount && touched.discount}>
      <FormLabel>Discount</FormLabel>
      <InputGroup>
        <Field placeholder="0" as={Input} id="discount" name="discount" />
        <InputRightAddon children="%" />
      </InputGroup>
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.discount}
      </FormErrorMessage>
    </FormControl>
  );
};

export default DiscountField;
