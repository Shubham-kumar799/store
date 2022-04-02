//components
import { Button, Text } from '@chakra-ui/react';

//icons
import { FcGoogle } from 'react-icons/fc';

//types
import { FC } from 'react';

//utils
import { googleAuthProvider } from '@firebase';
import { signInWithPopup , getAuth } from 'firebase/auth';

interface Props {
  title: string;
}

const GoogleButton: FC<Props> = ({ title }) => {
  const handleClick = () => {
    const auth = getAuth()
    signInWithPopup(auth, googleAuthProvider)
      .then(result => {
        const user = result.user;
        console.log('User from google=> ', user);
        // ...
      })
      .catch(error => {
        console.log(error.code, error.message, error.email);
      });
  };
  return (
    <Button
      _light={{ borderColor: 'gray.300' }}
      w={'full'}
      variant={'outline'}
      leftIcon={<FcGoogle />}
      onClick={() => handleClick()}
    >
      <Text>{title}</Text>
    </Button>
  );
};

export default GoogleButton;
