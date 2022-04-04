//utils
import { useEffect, FC } from 'react';
import { auth } from '@firebase';
import { useAppDispatch, LOGIN, LOGOUT } from '@store';
import { useApi } from '@hooks';

const SetUser: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const [_, API] = useApi({ url: '/user', method: 'get' });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      try {
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
                  cart: data?.payload.cart,
                  role: data?.payload.role,
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
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default SetUser;
