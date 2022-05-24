//components
import { useToast, VStack } from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';

//types
import { FC, RefObject, Dispatch } from 'react';
import { AddCouponFormValuesType } from '@appTypes/coupon';

//utils
import { couponSchema } from '@utils/couponSchema';
import DiscountField from './DiscountField';
import NameField from './NameField';
import ExpiryDateField from './ExpiryDateField';
import { useApi } from '@hooks';
import { GET_COUPONS } from '@graphql/coupon';
import { useApolloClient } from '@apollo/client';

interface Props {
  formRef: RefObject<FormikProps<AddCouponFormValuesType>>;
  setPositiveButtonLoading: Dispatch<boolean>;
}

const AddCouponForm: FC<Props> = ({ formRef, setPositiveButtonLoading }) => {
  const [_, API] = useApi({ method: 'post', url: '/coupon' });
  const toast = useToast();
  const { cache } = useApolloClient();

  const handleSubmit = async (
    values: { name: string; discount: number; expiryDate: string },
    resetForm: any
  ) => {
    try {
      setPositiveButtonLoading(true);
      const data = await API({
        body: {
          name: values.name,
          expiryDate: new Date(values.expiryDate),
          discount: values.discount,
        },
      });
      cache.writeQuery({
        query: GET_COUPONS,
        data: {
          getCoupons: {
            __typename: 'Coupon',
            // @ts-ignore
            _id: data.payload._id,
            name: values.name,
            discount: values.discount,
            expiryDate: values.expiryDate,
          },
        },
      });
    } catch (error) {
      console.log('Error adding coupon', error);
      toast({
        status: 'error',
        title: 'Error adding coupon',
      });
    } finally {
      setPositiveButtonLoading(false);
    }
  };

  return (
    <Formik
      innerRef={formRef}
      validationSchema={couponSchema}
      initialValues={{
        name: '',
        discount: 0,
        expiryDate: '',
      }}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <NameField errors={errors} touched={touched} />
            <DiscountField errors={errors} touched={touched} />
            <ExpiryDateField errors={errors} touched={touched} />
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default AddCouponForm;
