//components
import { HomeCarousel } from '@components/home';

//utils
import { useAppSelector, selectUser } from '@store';

//types
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <HomeCarousel />
      <div>Shubham The Great</div>
      <div>{JSON.stringify(user)}</div>
    </>
  );
};

export default Home;
