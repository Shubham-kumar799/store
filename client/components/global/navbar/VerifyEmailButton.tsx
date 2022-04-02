import { FC, useState } from 'react';

//comopnents
import { Button, useToast } from '@chakra-ui/react';

//utils
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@firebase';

const VerifyEmailButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const config = {
        url: process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_REDIRECT_URL as string,
        handleCodeInApp: true,
      };
      await sendEmailVerification(auth.currentUser!, config);
      toast({
        status: 'info',
        title: 'Email verification link sent. Check your email',
        position: 'top-right',
      });
    } catch (error) {
      console.log('Error verifying user email =>', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      onClick={() => handleClick()}
      colorScheme={'brand.link'}
    >
      Verify Your Email
    </Button>
  );
};

export default VerifyEmailButton;
