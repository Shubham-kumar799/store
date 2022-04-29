//compopnents
import { Button } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';

//types
import { FC } from 'react';

const CardFooter: FC = () => {
  return (
    <HStack m={2} flex={1} justifyContent={'space-evenly'}>
      <Button variant={'solid'} colorScheme={'brand.primary'}>
        Buy Now
      </Button>

      <Button variant={'ghost'} colorScheme={'brand.tertiary'}>
        Add to cart
      </Button>
    </HStack>
  );
};

export default CardFooter;
