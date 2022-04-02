import { FC, useState } from 'react';

//components
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { FormWrapper } from '@components/global';

//utils
import { signUpValidationSchema } from '@utils/signUpValidationSchema';
import { auth } from '@firebase';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signOut,
} from 'firebase/auth';
import { useApi } from '@hooks';

const RegistrationForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { API } = useApi({ url: '/create-user', method: 'Post' });

  const handleSubmit = async (
    values: { password: string; email: string },
    resetForm: any
  ) => {
    try {
      setIsLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const token = await user.getIdToken();
      const headers = { auth_token: token };
      await API({ headers })
        .then(() => {
          toast({
            status: 'success',
            title: 'Registration Successful',
            position: 'top-right',
          });
        })
        .catch(async () => {
          await deleteUser(auth.currentUser!);
          await signOut(auth);
          toast({
            status: 'error',
            title: 'Some Unknown Error Occured. Try Again',
          });
        });
    } catch (error) {
      console.log('Error creating user  => ', error);
      toast({
        status: 'error',
        title: 'Some Unknown Error Occured. Try Again',
      });
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  return (
    <FormWrapper>
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          password: '',
          email: '',
        }}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Field as={Input} id="email" name="email" type="email" />
                <FormErrorMessage colorScheme={'brand.error'}>
                  {errors.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel>Password</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                />
                <FormErrorMessage colorScheme={'brand.error'}>
                  {errors.password}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isLoading}
                colorScheme={'brand.primary'}
                type="submit"
                isFullWidth
              >
                Sign Up
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default RegistrationForm;
