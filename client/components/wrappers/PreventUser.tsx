//types
import { FC } from 'react';

//utils
import { selectUser, useAppSelector } from '@store';
import { useRouter } from 'next/router';

const PreventUser: FC = ({ children }) => {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  if (user && user.token) {
    router.push('/');
  }

  return <>{children}</>;
};

export default PreventUser;
