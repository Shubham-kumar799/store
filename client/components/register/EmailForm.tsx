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
import { sendSignInLinkToEmail, sendEmailVerification } from 'firebase/auth';

const EmailFrom: FC = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: { email: string }, resetForm: any) => {
    const config = {
      url: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL as string,
      handleCodeInApp: true,
    };
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
                Send Link
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default EmailFrom;

// const handleSubmit = async (values: { email: string }, resetForm: any) => {
//   const config = {
//     url: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL as string,
//     handleCodeInApp: true,
//   };

//   try {
//     setIsLoading(true);
//     //sending request to firebase
//     await sendSignInLinkToEmail(auth, values.email, config);
//     toast({
//       title: `Email send to ${values.email}. Check your email`,
//       position: 'top',
//       isClosable: false,
//       duration: 10000,
//       status: 'info',
//     });
//     //save user email in localStore
//     await window.localStorage.setItem('userEmail', values.email);
//     setIsLoading(false);
//   } catch (error) {
//     toast({
//       status: 'error',
//       isClosable: true,
//       title: 'Some unknown error occured. Please try again',
//     });
//     console.log(
//       'Error sending request to firebase for registration email',
//       error
//     );
//     setIsLoading(false);
//   }
// };
