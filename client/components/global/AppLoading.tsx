//types
import { FC } from 'react';
import type { LottiePlayer } from 'lottie-web';
//utils
import { useEffect, useRef, useState } from 'react';
import { VStack } from '@chakra-ui/react';

export const AppLoading: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import('lottie-web').then(Lottie => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: '/animation/loading.json',
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <VStack>
      {' '}
      <div ref={ref} />
    </VStack>
  );
};

export default AppLoading;
