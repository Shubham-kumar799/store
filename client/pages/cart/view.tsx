//utils
import { useAppSelector, selectCart, selectUser } from '@store';

//types
import { NextPage } from 'next';

const View: NextPage = () => {
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  return (
    <>
      {JSON.stringify(cart)}
      <br />
      {JSON.stringify(user)}
    </>
  );
};

export default View;
