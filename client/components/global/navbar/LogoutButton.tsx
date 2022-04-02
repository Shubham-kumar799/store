import { FC } from 'react';

//comopnents
import { Button } from '@chakra-ui/react';

//utils
import { auth } from '@firebase';
import { signOut } from 'firebase/auth';
import { useAppDispatch, LOGOUT } from '@store';

const LogoutButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    await signOut(auth);
    dispatch(LOGOUT());
  };

  return (
    <Button onClick={() => handleClick()} colorScheme={'brand.secondary'}>
      Logout
    </Button>
  );
};

export default LogoutButton;
