import { FC } from 'react';

//comopnents
import { Button } from '@chakra-ui/react';

//utils
import { useRouter } from 'next/router';

const LogInAndSignUpButton: FC = () => {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push('/login')} colorScheme={'brand.link'}>
        Log In
      </Button>
      <Button
        onClick={() => router.push('/register')}
        colorScheme={'brand.secondary'}
      >
        Sign Up
      </Button>
    </>
  );
};

export default LogInAndSignUpButton;
