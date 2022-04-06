//components
import {
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Textarea,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { Formik, Field, FormikProps } from 'formik';
import Price from './Price';

//types
import { Dispatch, FC, RefObject } from 'react';

//utils
import { useApi } from '@hooks';
import { productSchema } from '@utils/productSchema';
import { AddProductFormValuesType } from '@appTypes/products';
import CategorySelect from './CategorySelect';
import Quantity from './Quantity';
import Shipping from './Shipping';
import Brand from './Brand';
import Color from './Color';
import Name from './Name';
import SubCategoryCheckbox from './SubCategoryCheckbox';
import Description from './Description';

interface Props {
  formRef: RefObject<FormikProps<AddProductFormValuesType>>;
  setIsPositiveButtonLoading: Dispatch<boolean>;
}

const initialValues = {
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  color: '',
  brand: '',
  shipping: false,
  category: '',
  subCategories: [],
};

const AddProductForm: FC<Props> = ({ formRef, setIsPositiveButtonLoading }) => {
  const toast = useToast();
  const [_, API] = useApi({ method: 'Post', url: '/product' });
  const handleSubmit = async (values: { name: string }, resetForm: any) => {
    console.log('values => ', values);
    // try {
    //   setIsPositiveButtonLoading(true);
    //   const data = await API({ body: { ...values } });
    //   console.log('respsnedata', data);
    //   toast({
    //     status: 'success',
    //     title: 'Product Added',
    //     position: 'top-left',
    //   });
    //   resetForm();
    // } catch (error) {
    //   console.log('error creating product', error);
    //   toast({
    //     status: 'error',
    //     title: 'Failed to add product. Try Again',
    //     position: 'top-left',
    //   });
    // } finally {
    //   setIsPositiveButtonLoading(false);
    // }
  };

  return (
    <Formik
      validationSchema={productSchema}
      innerRef={formRef}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ values, handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <Name errors={errors} touched={touched} />
            <Description errors={errors} touched={touched} />
            <Price errors={errors} touched={touched} />
            <Quantity errors={errors} touched={touched} />
            <Color errors={errors} touched={touched} />
            <Brand errors={errors} touched={touched} />
            <Shipping />
            {/* saves category's _id instead of name */}
            <CategorySelect errors={errors} touched={touched} />

            {values.category && (
              <SubCategoryCheckbox
                errors={errors}
                touched={touched}
                values={values}
              />
            )}
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default AddProductForm;
