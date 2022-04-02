//types
import type { NextPage } from 'next';

//utils
import { useAppSelector, selectUser } from '@store';

const Home: NextPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <div>Shubham The Great</div>
      <div>{user?.email}</div>
    </>
  );
};

export default Home;
