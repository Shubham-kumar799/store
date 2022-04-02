import { useState } from 'react';
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

//types
import { FC } from 'react';

//utils
import { loginValidationSchema } from '@utils/loginValidationSchema';
import { auth } from '@firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = async (
    values: { email: string; password: string },
    resetForm: any
  ) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error: any) {
      console.log('Error logging in user => ', error);
      toast({
        status: 'error',
        title: `Error. ${error.message}`,
        isClosable: true,
      });
    } finally {
      resetForm();
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          email: '',
          password: '',
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
                <FormLabel htmlFor="password">Password</FormLabel>
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
                Login
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default LoginForm;
