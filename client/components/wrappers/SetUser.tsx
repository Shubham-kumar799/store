//utils
import { useEffect, FC } from 'react';
import { auth } from '@firebase';
import { useAppDispatch, LOGIN, LOGOUT } from '@store';

const SetUser: FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdToken();

        dispatch(
          LOGIN({
            email: user.email!,
            token: idTokenResult,
            emailVerified: user.emailVerified,
          })
        );
      } else {
        dispatch(LOGOUT());
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default SetUser;
