//types
import { FC } from 'react';

//utils
import { selectUser, useAppSelector } from '@store';
import { useRouter } from 'next/router';

const PreventUnsighnedUser: FC = ({ children }) => {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  if (!user._id) {
    console.log('inside if');
    router.push('/');
    return null;
  }

  return <>{children}</>;
};

export default PreventUnsighnedUser;
