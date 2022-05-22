//components
import { Button } from '@chakra-ui/react';

//icons
import { ArrowForwardIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

const BuyNowButton: FC = () => {
  return (
    <Button
      bottom={5}
      right={5}
      aria-label="delete"
      position="absolute"
      colorScheme="brand.primary"
      variant="outline"
      rightIcon={<ArrowForwardIcon />}
    >
      Buy Now
    </Button>
  );
};

export default BuyNowButton;
