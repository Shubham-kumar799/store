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
import { emailValidationSchema } from '@utils/signUpValidationSchema';
import { auth } from '@firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPasswordEmailFrom: FC = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: { email: string }, resetForm: any) => {
    const config = {
      url: process.env.NEXT_PUBLIC_FORGOT_PASSWORD_REDIRECT_URL as string,
      handleCodeInApp: true,
    };

    try {
      setIsLoading(true);
      //sending request to firebase
      await sendPasswordResetEmail(auth, values.email, config);
      toast({
        title: `Email send to ${values.email}. Check your email to reset your password`,
        position: 'top',
        isClosable: true,
        duration: 10000,
        status: 'info',
      });
    } catch (error) {
      toast({
        status: 'error',
        isClosable: true,
        title: 'Some unknown error occured. Please try again',
      });
      console.log('Error in forgot password', error);
    } finally {
      resetForm();
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper>
      <Formik
        validationSchema={emailValidationSchema}
        initialValues={{
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
              <Button
                isLoading={isLoading}
                colorScheme={'brand.primary'}
                type="submit"
                isFullWidth
              >
                Continue
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default ForgotPasswordEmailFrom;
