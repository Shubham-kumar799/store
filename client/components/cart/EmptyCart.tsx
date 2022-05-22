//components
import { Box, Center, Text, Heading } from '@chakra-ui/react';
import Image from 'next/image';

//types
import { FC } from 'react';

const EmptyCart: FC = () => {
  return (
    <Box>
      <Center flexDirection={'column'}>
        <Image
          src="/images/empty-cart.png"
          height="500"
          width="500"
          objectFit="contain"
        />
        <Heading>Your cart is empty</Heading>
      </Center>
    </Box>
  );
};

export default EmptyCart;
