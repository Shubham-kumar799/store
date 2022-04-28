//components
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Formik, Field, FormikProps } from 'formik';

//types
import { Dispatch, FC, RefObject } from 'react';
import { AddCategoryFormValuesType } from '@appTypes/categories';

//utils
import { categorySchema } from '@utils/categorySchema';
import { useApi } from '@hooks';
import { useApolloClient } from '@apollo/client';
import { GET_CATEGORIES } from '@graphql/categories';
import slugify from 'slugify';

interface Props {
  formRef: RefObject<FormikProps<AddCategoryFormValuesType>>;
  setPositiveButtonLoading: Dispatch<boolean>;
}

const AddCategoryForm: FC<Props> = ({ formRef, setPositiveButtonLoading }) => {
  const { cache } = useApolloClient();
  const toast = useToast();
  const [_, API] = useApi({ method: 'Post', url: '/category' });

  const handleSubmit = async (values: { name: string }, resetForm: any) => {
    try {
      setPositiveButtonLoading(true);
      const body = { name: values.name };
      const data = await API({ body });
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: {
          getCategories: {
            __typename: 'Category',
            // @ts-ignore
            _id: data.payload._id,
            name: values.name,
            slug: slugify(values.name).toLowerCase(),
          },
        },
      });
      toast({
        status: 'success',
        title: 'Category added',
        position: 'top',
      });
      resetForm();
    } catch (error) {
      console.log('error adding category', error);
      toast({
        status: 'error',
        title: 'Error adding category. Try again',
        position: 'top',
      });
    } finally {
      setPositiveButtonLoading(false);
    }
  };

  return (
    <Formik
      innerRef={formRef}
      validationSchema={categorySchema}
      initialValues={{
        name: '',
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
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default AddCategoryForm;
