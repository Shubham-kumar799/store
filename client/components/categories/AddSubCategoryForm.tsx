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
import { GET_SUB_CATEGORIES_BY_PARENT_ID } from '@graphql/categories';
import slugify from 'slugify';

interface Props {
  formRef: RefObject<FormikProps<AddCategoryFormValuesType>>;
  setPositiveButtonLoading: Dispatch<boolean>;
  parentId: string;
}

const AddSubCategoryForm: FC<Props> = ({
  formRef,
  setPositiveButtonLoading,
  parentId,
}) => {
  const { cache } = useApolloClient();
  const toast = useToast();
  const [_, API] = useApi({ method: 'Post', url: '/subCategory' });

  const handleSubmit = async (values: { name: string }, resetForm: any) => {
    try {
      setPositiveButtonLoading(true);
      const body = { name: values.name, parent: parentId };
      const data = await API({ body });
      cache.writeQuery({
        query: GET_SUB_CATEGORIES_BY_PARENT_ID,
        data: {
          getSubCategoriesByParentId: {
            __typename: 'SubCategory',
            // @ts-ignore
            _id: data.payload._id,
            name: values.name,
            parent: parentId,
            slug: slugify(values.name).toLowerCase(),
          },
        },
        variables: { parentId },
      });
      resetForm();
    } catch (error) {
      console.log('error adding sub category', error);
      toast({
        status: 'error',
        title: 'Error adding sub-category. Try again',
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
              <Field
                placeholder="Enter sub-category name to create new sub-category"
                as={Input}
                id="name"
                name="name"
              />
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

export default AddSubCategoryForm;
