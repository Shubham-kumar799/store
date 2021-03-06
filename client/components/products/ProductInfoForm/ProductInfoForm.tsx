//components
import { VStack } from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';
import Price from '../ProductInfoForm/Price';
import Quantity from '../ProductInfoForm/Quantity';
import Shipping from '../ProductInfoForm/Shipping';
import Brand from '../ProductInfoForm/Brand';
import Color from '../ProductInfoForm/Color';
import Name from '../ProductInfoForm/Name';
import Description from '../ProductInfoForm/Description';

//types
import { FC, RefObject, Dispatch, SetStateAction } from 'react';
import { ProductInfoFormValuesType } from '@appTypes/products';

//utils
import { productInfoSchema } from '@utils/productSchema';

interface Props {
  formRef: RefObject<FormikProps<ProductInfoFormValuesType>>;
  nextStep: () => void;
  setNewProduct: Dispatch<SetStateAction<{}>>;
  newProduct: any;
}

const ProductInfoForm: FC<Props> = ({
  formRef,
  nextStep,
  setNewProduct,
  newProduct,
}) => {
  const initialValues = {
    ...newProduct,
    // name: 'Name',
    // description: 'description',
    // price: 100,
    // color: 'black',
    // brand: 'bRandk',
    // quantity: 100,
  };
  const handleSubmit = async (
    values: ProductInfoFormValuesType,
    resetForm: any
  ) => {
    setNewProduct({
      ...newProduct,
      ...values,
    });
    nextStep();
  };

  return (
    <Formik
      validationSchema={productInfoSchema}
      innerRef={formRef}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ values, handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="flex-start">
            <Name errors={errors} touched={touched} />
            <Description errors={errors} touched={touched} />
            <Price errors={errors} touched={touched} />
            <Quantity errors={errors} touched={touched} />
            <Color errors={errors} touched={touched} />
            <Brand errors={errors} touched={touched} />
            <Shipping isChecked={values.shipping} />
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default ProductInfoForm;
