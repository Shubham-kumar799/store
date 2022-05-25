//components
import { AppLoading } from '@components/global';

//utils
import { useEffect, FC, useState } from 'react';
import { auth } from '@firebase';
import { useAppDispatch, LOGIN, LOGOUT } from '@store';
import { useApi } from '@hooks';

const SetUser: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [_, API] = useApi({ url: '/user', method: 'get' });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      try {
        setIsLoading(true);
        if (user) {
          const token = await user.getIdToken();

          const headers = { auth_token: token };
          API({ headers }).then((data: any) => {
            if (data && data.success) {
              dispatch(
                LOGIN({
                  email: user.email!,
                  token,
                  emailVerified: user.emailVerified,
                  _id: data?.payload._id,
                  role: data?.payload.role,
                  cartCount: data?.payload?.cartCount,
                  address: data?.payload?.address,
                })
              );
            } else {
              dispatch(LOGOUT());
            }
          });
        } else {
          dispatch(LOGOUT());
        }
      } catch (error) {
        console.log('error in setting user', error);
        dispatch(LOGOUT());
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return <>{children}</>;
};

export default SetUser;
