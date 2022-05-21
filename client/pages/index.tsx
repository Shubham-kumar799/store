//components
import { HomeBody, HomeCarousel } from '@components/home';

//types
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <HomeCarousel />
      <HomeBody />
    </>
  );
};

export default Home;
