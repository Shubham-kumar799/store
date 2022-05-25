//types
import { FC } from 'react';
import type { LottiePlayer } from 'lottie-web';
//utils
import { useEffect, useRef, useState } from 'react';

interface Props {
  path: string;
  autoplay?: boolean;
  loop?: boolean;
}

export const RunLottieAnimation: FC<Props> = ({
  autoplay = true,
  loop = true,
  path,
}) => {
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
        loop,
        autoplay,
        path,
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return <div ref={ref} />;
};

export default RunLottieAnimation;
