//components
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useColorMode,
} from '@chakra-ui/react';
import { FormikErrors, Field, FormikTouched } from 'formik';

//types
import { FC } from 'react';
import { AddCouponFormValuesType } from '@appTypes/coupon';

interface Props {
  errors: FormikErrors<AddCouponFormValuesType>;
  touched: FormikTouched<AddCouponFormValuesType>;
}

const ExpiryDateField: FC<Props> = ({ errors, touched }) => {
  const { colorMode } = useColorMode();
  return (
    <FormControl isInvalid={!!errors.expiryDate && touched.expiryDate}>
      <FormLabel>Expiry Date</FormLabel>
      <Field
        type="date"
        as={Input}
        id="expiryDate"
        name="expiryDate"
        style={{
          color: colorMode === 'light' ? 'black' : 'white',
          borderRadius: '4px',
          backgroundColor: colorMode === 'light' ? 'white' : '#2D3748',
          width: '100%',
          colorScheme: colorMode === 'light' ? 'light' : 'dark',
        }}
      />
      <FormErrorMessage colorScheme={'brand.error'}>
        {errors.expiryDate}
      </FormErrorMessage>
    </FormControl>
  );
};

export default ExpiryDateField;
