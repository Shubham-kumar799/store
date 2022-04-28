//components
import { HomeBody, HomeCarousel } from '@components/home';

//utils
import { useAppSelector, selectUser } from '@store';

//types
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <HomeCarousel />
      <HomeBody />
    </>
  );
};

export default Home;
