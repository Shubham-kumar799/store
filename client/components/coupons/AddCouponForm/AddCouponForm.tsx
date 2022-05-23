//components
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { Formik, Field, FormikProps } from 'formik';

//types
import { Dispatch, FC, RefObject } from 'react';

//utils
import { couponSchema } from '@utils/couponSchema';

interface Props {
  // formRef: RefObject<FormikProps<AddCategoryFormValuesType>>;
  // setPositiveButtonLoading: Dispatch<boolean>;
}

const AddCouponForm: FC<Props> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSubmit = async (values: { name: string }, resetForm: any) => {
    console.log('coupon values', values);
  };

  return (
    <Formik
      validationSchema={couponSchema}
      initialValues={{
        name: '',
        discount: '',
        expiryDate: '',
      }}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!errors.name && touched.name}>
              <FormLabel>Name</FormLabel>
              <Field as={Input} id="name" name="name" />
              <FormErrorMessage colorScheme={'brand.error'}>
                {errors.name}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.discount && touched.discount}>
              <FormLabel>Discount</FormLabel>
              <Field as={Input} id="discount" name="discount" />
              <FormErrorMessage colorScheme={'brand.error'}>
                {errors.discount}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.expiryDate && touched.expiryDate}>
              <FormLabel>Expiry Date</FormLabel>
              <input
                type={'date'}
                style={{
                  color: colorMode === 'light' ? 'black' : 'white',
                  borderRadius: '4px',
                  backgroundColor: colorMode === 'light' ? 'white' : '#2D3748',
                  width: '100%',
                  colorScheme: colorMode === 'light' ? 'light' : 'dark',
                }}
                id="expiryDate"
                name="expiryDate"
              />
              <FormErrorMessage colorScheme={'brand.error'}>
                {errors.expiryDate}
              </FormErrorMessage>
            </FormControl>
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default AddCouponForm;
