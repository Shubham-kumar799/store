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
import { UpdateCategoryFormValuesType } from '@appTypes/categories';

//utils
import { categorySchema } from '@utils/categorySchema';
import { useApi } from '@hooks';
import { useApolloClient } from '@apollo/client';
import slugify from 'slugify';

interface Props {
  formRef: RefObject<FormikProps<UpdateCategoryFormValuesType>>;
  setPositiveButtonLoading: Dispatch<boolean>;
  categorySlug: string;
  categoryName: string;
  closeModal: () => void;
  categoryId: string;
}

const UpdateCategoryForm: FC<Props> = ({
  formRef,
  setPositiveButtonLoading,
  categorySlug,
  categoryName,
  closeModal,
  categoryId,
}) => {
  const { cache } = useApolloClient();
  const toast = useToast();
  const [_, API] = useApi({ method: 'Put', url: `/category/${categorySlug}` });

  const handleSubmit = async (values: { name: string }, resetForm: any) => {
    try {
      setPositiveButtonLoading(true);
      const body = { name: values.name };
      await API({ body });
      cache.modify({
        id: cache.identify({
          __typename: 'Category',
          name: categoryName,
          slug: categorySlug,
          _id: categoryId,
        }),
        fields: {
          name() {
            return values.name;
          },
          slug() {
            return slugify(values.name);
          },
        },
      });
      closeModal();
    } catch (error) {
      console.log('error updating category', error);
      toast({
        status: 'error',
        title: 'Error updating category. Try again',
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
        name: categoryName,
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

export default UpdateCategoryForm;
