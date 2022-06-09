//components
import { HomeBody, HomeCarousel } from '@components/home';
import { BaseLayout } from '@components/global';

//types
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <BaseLayout nostyles>
      <HomeCarousel />
      <HomeBody />
    </BaseLayout>
  );
};

export default Home;
